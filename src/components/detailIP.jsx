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
    getElasticSearchData();
  }, []);

  useEffect(() => {
    if (
      (project && !_.isEqual(project, preProject)) ||
      (user && !_.isEqual(user, preUser)) ||
      (group && !_.isEqual(group, preGroup)) ||
      (maNV && !_.isEqual(maNV, preMaNV))
    ) {
      getElasticSearchData();
    }
  }, [project, user, maNV, group]);

  const getElasticSearchData = () => {
    // if (user || project || group || maNV) {
    //   client
    //     .search({
    //       index: "loginfor",
    //       body: {
    //         query: {
    //           bool: {
    //             should: [
    //               { term: { api: project } },
    //               { term: { project: user } },
    //               { term: { project: group } },
    //               { term: { project: maNV } },
    //             ],
    //           },
    //         },
    //       },
    //     })
    //     .then((response) => {
    //       // Xử lý dữ liệu ở đây
    //       const hits = response.hits.hits;
    //       setDataListIP(hits);
    //     })
    //     .catch((error) => {
    //       console.error("Error while searching:", error);
    //     });
    // } else {
    client
      .search({
        index: "loginfor",
        body: {
          query: {
            match_all: {},
          },
        },
      })
      .then((response) => {
        // Xử lý dữ liệu ở đây
        const hits = response.hits.hits;
        setDataListIP(hits);
      })
      .catch((error) => {
        console.error("Error while searching:", error);
      });
    // }
  };

  const handleDetail = (id) => {
    setModalShow(true);
    setId(id);
  };

  return (
    <div className="p-2 w-100">
      <div className="w-100">
        <div className="form-search w-100">
          <div className="form-search-children">
            <label htmlFor="">Project</label>
            <input type="text" onChange={(e) => setProject(e.target.value)} />
          </div>
          <div className="form-search-children">
            <label htmlFor="">User</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} />
          </div>
          <div className="form-search-children">
            <label htmlFor="">Group</label>
            <input type="text" onChange={(e) => setGroup(e.target.value)} />
          </div>
          <div className="form-search-children">
            <label htmlFor="">Mã nghiệp vụ</label>
            <input type="text" onChange={(e) => setMaNV(e.target.value)} />
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
              {dataListIP.map((item, index) => {
                return (
                  <tr key={index} className="row_table_detail">
                    <td>{item._source.client.ip}</td>
                    <td>{item._source.api.group}</td>
                    <td>{item._source.api.group}</td>
                    <td>{item._source.api.status}</td>
                    <td>{item._source.api.path}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleDetail(item._id)}
                      >
                        Xem
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <ModalDetaiIP show={modalShow} setModalShow={setModalShow} id={id} />
    </div>
  );
};

export default memo(DetailIP);
