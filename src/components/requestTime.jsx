import React, { useState, useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import client from "../connection.js";

const RequestTime = () => {
  const [dataListAPI, setDataListAPI] = useState([]);

  useEffect(() => {
    getElasticSearchData();
    // fetchData();
  }, []);

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://192.168.100.64:2001/apis/viewlog?search="
  //       );
  //       const result = await response.json();
  //       setDataListAPI(result);
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
        const groupedData = groupDataByAPI(hits);
        setDataListAPI(groupedData);
      })
      .catch((error) => {
        console.error("Error while searching:", error);
      });
  };

  const groupDataByAPI = (data) => {
    const grouped = data.reduce((accumulator, currentItem) => {
      const apiCmd = currentItem._source.api.cmd;
      if (!accumulator[apiCmd]) {
        accumulator[apiCmd] = {
          count: 0,
          errors: 0,
          avgTime: 0,
        };
      } else {
        accumulator[apiCmd].count += 1;
        accumulator[apiCmd].errors += 1;
        accumulator[apiCmd].avgTime += 1;
      }
      return accumulator;
    }, {});

    return Object.entries(grouped).map(([apiCmd, values]) => ({
      api: { cmd: apiCmd },
      ...values,
    }));
  };

  return (
    <>
      <div className="form-search">
        <div className="form-search-children">
          <label htmlFor="">Project</label>
          <input type="text" />
        </div>
        <div className="form-search-children">
          <label htmlFor="">Thời gian</label>
          <input type="text" />
        </div>
      </div>
      <div className="d-flex col-md-12 p-2">
        <div className="col-md-5 mx-1">
          <div
            style={{
              height: "150px",
              alignItems: "center",
              paddingTop: "30px",
              border: "1px solid",
            }}
          >
            Biểu đồ số lượng request/ 5 phút
          </div>
        </div>
        <div className="col-md-7">
          <div
            className="table-container"
            style={{
              maxHeight: "150px",
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
                  <th>API</th>
                  <th>Count</th>
                  <th>Errors</th>
                  <th>AVG Time</th>
                </tr>
              </thead>
              <tbody>
                {dataListAPI.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.api.cmd}</td>
                      <td>{item.count}</td>
                      <td>{item.errors}</td>
                      <td>{item.avgTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(RequestTime);
