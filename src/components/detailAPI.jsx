import React, { useState, useEffect, memo } from "react";
import { Button, Table } from "react-bootstrap";
import client from "../connection.js";
import ModalDetaiAPI from "./modal/modalDetailAPI.jsx";

const DetailAPI = () => {
  const [dataListAPI, setdataListAPI] = useState([]);
  const [id, setId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    // getElasticSearchData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.64:2001/apis/viewlog?search="
      );
      const result = await response.json();
      setdataListAPI(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const getElasticSearchData = () => {
  //   client
  //     .search({
  //       index: "loginfor",
  //       body: {
  //         query: {
  //           match_all: {},
  //         },
  //       },
  //     })
  //     .then((response) => {
  //       // Xử lý dữ liệu ở đây
  //       const hits = response.hits.hits;
  //       setdataListAPI(hits);
  //     })
  //     .catch((error) => {
  //       console.error("Error while searching:", error);
  //     });
  // };

  const handleDetail = (id) => {
    setModalShow(true);
    setId(id);
  };

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
              {Array.isArray(dataListAPI?.content) &&
                dataListAPI.content.map((item, index) => {
                  return (
                    <tr key={index} className="row_table_detail">
                      <td>{item.api.project}</td>
                      <td>{item.api.group}</td>
                      <td>{item.api.cmd}</td>
                      <td>{item.api.path}</td>
                      <td>{item.api.method}</td>
                      <td>{JSON.stringify(item.api.data)}</td>
                      <td>{item.api.status}</td>
                      <td>{item.api.time}</td>
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
                })}
            </tbody>
          </Table>
        </div>
      </div>
      <ModalDetaiAPI show={modalShow} setModalShow={setModalShow} id={id} />
    </div>
  );
};

export default memo(DetailAPI);
