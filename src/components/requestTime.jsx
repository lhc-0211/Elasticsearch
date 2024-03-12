import React, { useState, useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import client from "../connection.js";
import DashBoardRes from "./echart/dasboardRes.js";

const RequestTime = () => {
  const [dataListAPI, setDataListAPI] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    getElasticSearchData();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.64:2001/apis/viewlog?search="
      );
      const result = await response.json();
      setTest(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
          count: 1,
          errors: 1,
          avgTime: 1,
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
          <input type="date" />
        </div>
      </div>
      <div className="d-flex col-md-12 p-2">
        <div className="col-md-5 mx-1">
          <DashBoardRes />
        </div>
        <div className="col-md-7">
          <div
            className="table-container"
            style={{
              maxHeight: "150px",
              overflowY: "scroll",
              border: "1px solid #D9D9D9",
              marginRight: "4px",
            }}
          >
            <Table>
              <thead>
                <tr className="sticky-top row_table_title">
                  <th>API</th>
                  <th>Count</th>
                  <th>Errors</th>
                  <th>AVG Time</th>
                </tr>
              </thead>
              <tbody>
                {dataListAPI.map((item, index) => {
                  return (
                    <tr key={index} className="row_table_detail">
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
