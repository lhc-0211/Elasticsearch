import React, { useState, useEffect, memo } from "react";
import { Button, Table } from "react-bootstrap";
import client from "../connection.js";
import ModalDetaiIP from "./modal/modalDetailIP.jsx";

const DetailIP = () => {
  const [dataListIP, setDataListIP] = useState([]);
  const [id, setId] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getElasticSearchData();
  }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://192.168.100.64:2001/apis/viewlog?search="
  //       );
  //       const result = await response.json();
  //       setDataList(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const getElasticSearchData = () => {
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
  };

  const handleDetail = (id) => {
    setModalShow(true);
    setId(id);
  };

  return (
    <div className=" p-2">
      <div className="">
        <div className="form-search">
          <div className="form-search-children">
            <label htmlFor="">Project</label>
            <input type="text" />
          </div>
          <div className="form-search-children">
            <label htmlFor="">User</label>
            <input type="text" />
          </div>
          <div className="form-search-children">
            <label htmlFor="">Group</label>
            <input type="text" />
          </div>
          <div className="form-search-children">
            <label htmlFor="">Mã nghiệp vụ</label>
            <input type="text" />
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
          <Table striped="columns">
            <thead>
              <tr
                className="sticky-top"
                style={{
                  borderBottom: "1px #D9D9D9",
                }}
              >
                <th>IPAddress</th>
                <th>Nhóm</th>
                <th>Mã nghiệp vụ</th>
                <th>Status</th>
                <th colSpan={2}>Path</th>
              </tr>
            </thead>
            <tbody>
              {dataListIP.map((item, index) => {
                return (
                  <tr key={index}>
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
