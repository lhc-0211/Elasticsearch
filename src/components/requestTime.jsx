import React, { useState, useEffect, memo } from "react";
import { Table } from "react-bootstrap";
import DashBoardRes from "./echart/dasboardRes.js";
import * as _ from "lodash";

function usePrevious(value) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const RequestTime = () => {
  const [dataCountAPI, setDataCountAPI] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [project, setProject] = useState(null);
  const [group, setGroup] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState("5");

  const preGroup = usePrevious(group);
  const preProject = usePrevious(project);
  const preDate = usePrevious(date);
  const preTime = usePrevious(time);

  useEffect(() => {
    if (
      !_.isEqual(time, preTime) ||
      !_.isEqual(project, preProject) ||
      !_.isEqual(date, preDate)
    ) {
      fetchDataChart(time, date, project);
    }
  }, [time, project, date]);

  useEffect(() => {
    if (
      (project && !_.isEqual(project, preProject)) ||
      (group && !_.isEqual(group, preGroup)) ||
      (date && !_.isEqual(date, preDate))
    ) {
      fetchDataCount(group, date, project);
    }
  }, [project, group, date]);

  const fetchDataChart = async (time, date, project) => {
    const pro = project || "";
    try {
      const controller = new AbortController();
      const { signal } = controller;

      // Set timeout, for example, 10 seconds
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(
        `http://10.64.103.135:2001/apis/dashboard?project=${pro}&date=${date}&time=${time}`,
        { signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setDataChart(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataCount = async (group, date, project) => {
    const pro = project || "";
    const gro = group || "";
    try {
      const response = await fetch(
        `http://10.64.103.135:2001/apis/average?project=${pro}&date=${date}&group=${gro}`
      );
      const result = await response.json();
      setDataCountAPI(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="d-flex col-md-12 p-2">
        <div className="col-md-7 mx-1">
          <div className="form-search">
            <div className="form-search-children">
              <label htmlFor="">Time</label>
              <select onChange={(e) => setTime(e.target.value)}>
                <option value="5">5m</option>
                <option value="30">30m</option>
                <option value="60">1h</option>
                {/* <option value="360">6h</option> */}
                {/* <option value="720">12h</option> */}
                {/* <option value="1440">1D</option> */}
              </select>
            </div>
          </div>
          <DashBoardRes dataChart={dataChart} />
        </div>
        <div className="col-md-5">
          <div className="form-search">
            <div className="form-search-children">
              <label htmlFor="">Project</label>
              <input type="text" onBlur={(e) => setProject(e.target.value)} />
            </div>
            <div className="form-search-children">
              <label htmlFor="">Group</label>
              <input type="text" onBlur={(e) => setGroup(e.target.value)} />
            </div>
            <div className="form-search-children">
              <label htmlFor="">Thời gian</label>
              <input
                type="date"
                defaultValue={date}
                onBlur={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
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
                {dataCountAPI.length > 0 ? (
                  dataCountAPI.map((item, index) => {
                    return (
                      <tr key={index} className="row_table_detail">
                        <td>{item.api}</td>
                        <td>{item.count}</td>
                        <td>{item.errors}</td>
                        <td>{item.average}</td>
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
      </div>
    </>
  );
};

export default memo(RequestTime);
