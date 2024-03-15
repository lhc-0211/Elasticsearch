import React, { useState, useEffect, memo } from "react";
import { Button, Table } from "react-bootstrap";
import client from "../connection.js";
import ModalDetaiIP from "./modal/modalDetailIP.jsx";
import * as _ from "lodash";

function usePrevious(value) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const DetailIP = () => {
  const [dataListIP, setDataListIP] = useState([]);
  const [id, setId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [project, setProject] = useState(null);
  const [user, setUser] = useState(null);
  const [group, setGroup] = useState(null);
  const [maNV, setMaNV] = useState(null);

  const preProject = usePrevious(project);
  const preUser = usePrevious(user);
  const preGroup = usePrevious(group);
  const preMaNV = usePrevious(maNV);

  useEffect(() => {
    if (
      !_.isEqual(project, preProject) ||
      !_.isEqual(user, preUser) ||
      !_.isEqual(group, preGroup) ||
      !_.isEqual(maNV, preMaNV)
    ) {
      fetchData(project, user, maNV, group);
    }
  }, [project, user, maNV, group]);

  const fetchData = async (project, user, maNV, group) => {
    const pro = project || "";
    const us = user || "";
    const ma = maNV || "";
    const gro = group || "";

    try {
      const controller = new AbortController();
      const { signal } = controller;

      // Set timeout, for example, 10 seconds
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(
        `http://10.64.103.135:2001/apis/viewlog?project=${pro}&group=${gro}&user=${us}&major=${ma}`,
        { signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setDataListIP(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDetail = (id) => {
    setModalShow(true);
    setId(id);
  };

  function onClose() {
    setModalShow(false);
  }

  return (
    <div className="p-2 w-100">
      <div className="w-100">
        <div className="form-search w-100">
          <div className="form-search-children">
            <label htmlFor="">Project</label>
            <input type="text" onBlur={(e) => setProject(e.target.value)} />
          </div>
          <div className="form-search-children">
            <label htmlFor="">User</label>
            <input type="text" onBlur={(e) => setUser(e.target.value)} />
          </div>
          <div className="form-search-children">
            <label htmlFor="">Group</label>
            <input type="text" onBlur={(e) => setGroup(e.target.value)} />
          </div>
          <div className="form-search-children">
            <label htmlFor="">Mã nghiệp vụ</label>
            <input type="text" onBlur={(e) => setMaNV(e.target.value)} />
          </div>
        </div>
        <div
          className="table-container"
          style={{
            maxHeight: "250px",
            overflowY: "scroll",
            border: "1px solid #D9D9D9",
          }}
        >
          <Table>
            <thead>
              <tr className="sticky-top row_table_title row_table_title-bg">
                <th>IPAddress</th>
                <th>Nhóm</th>
                <th>Mã nghiệp vụ</th>
                <th>Status</th>
                <th>Path</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataListIP.length > 0 ? (
                dataListIP.map((item, index) => {
                  return (
                    <tr key={index} className="row_table_detail">
                      <td>{item.client.ip}</td>
                      <td>{item.api.group}</td>
                      <td>{item.api.cmd}</td>
                      <td>{item.api.status}</td>
                      <td>{item.api.path}</td>
                      <td>
                        <Button
                          variant="warning"
                          onClick={() => handleDetail(item.id)}
                        >
                          Xem
                        </Button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr
                  className=""
                  style={{
                    textAlign: "center",
                  }}
                >
                  <td colSpan="10">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      {modalShow && (
        <ModalDetaiIP
          modalShow={modalShow}
          setmodalshow={setModalShow}
          id={id}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default memo(DetailIP);
