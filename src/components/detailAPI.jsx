import React, { useState, useEffect, memo } from "react";
import { Button, Table } from "react-bootstrap";
import client from "../connection.js";
import ModalDetaiAPI from "./modal/modalDetailAPI.jsx";

const DetailAPI = () => {
  const [dataListAPI, setdataListAPI] = useState([]);
  const [id, setId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;

      // Set timeout, for example, 10 seconds
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        "http://192.168.100.64:2001/apis/viewlog?project=&group=&user=&major=",
        { signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setdataListAPI(result);
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
    <div className=" p-2">
      <div className="">
        <div
          className="table-container"
          style={{
            maxHeight: "285px",
            overflowY: "scroll",
            border: "1px solid #D9D9D9",
          }}
        >
          <Table>
            <thead>
              <tr className="sticky-top row_table_title row_table_title-bg">
                <th>Project</th>
                <th>Group</th>
                <th>Cmd</th>
                <th>Path</th>
                <th>Method</th>
                <th>Data</th>
                <th>Status</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataListAPI.length > 0 ? (
                dataListAPI.map((item, index) => {
                  return (
                    <tr key={index} className="row_table_detail">
                      <td>{item.api.project}</td>
                      <td>{item.api.group}</td>
                      <td>{item.api.cmd}</td>
                      <td>{item.api.path}</td>
                      <td>{item.api.method}</td>
                      <td>{JSON.stringify(item.api.data)}</td>
                      <td>{item.api.status}</td>
                      <td>{item.requestTime}</td>
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
        <ModalDetaiAPI
          onClose={onClose}
          show={modalShow}
          setmodalshow={setModalShow}
          id={id}
        />
      )}
    </div>
  );
};

export default memo(DetailAPI);
