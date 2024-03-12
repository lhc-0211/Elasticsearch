import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import client from "../../connection.js";

const Page = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [timeRes, setTimeRes] = useState([]);
  const [dataRes, setDataRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // viewLog();
  }, [dataRes]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.64:2001/apis/dashboard?date=2024-03-08`
      );
      const time = [];
      const result = await response.json();
      result.forEach((element) => {
        time.push(element.startTime);
      });
      setDashboardData(time);
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
  //       setDataRes(hits);
  //     })
  //     .catch((error) => {
  //       console.error("Error while searching:", error);
  //     });
  // };

  const options = {
    grid: { top: 8, right: 18, bottom: 25, left: 19 },
    title: [
      {
        left: "center",
        text: "Count request/ time",
        bottom: "0%",
        textStyle: {
          fontSize: 12,
        },
      },
    ],
    xAxis: {
      type: "category",
      data: timeRes,
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#4E4D62",
          dashOffset: 10,
          opacity: 0.3,
        },
      },
      axisLabel: {
        color: "#83817C",
        fontSize: 8,
        borderColor: "#ECECEC",
        // formatter: function (value) {
        //   const arr = value?.split(":");
        //   return arr[0] + ":" + arr[1];
        // },
        interval: 6,
      },
    },
    yAxis: {
      type: "value",
      show: true,
      alignTicks: true,
      splitNumber: 4,
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#4E4D62",
          dashOffset: 10,
          opacity: 0.3,
        },
      },
      axisLabel: {
        color: "#83817C",
        fontSize: 8,
        showMinLabel: false,
        showMaxLabel: false,
      },
    },
    series: [
      {
        data: Object.values(dashboardData),
        type: "line",
        smooth: false,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return (
    <ReactECharts
      option={options}
      style={{
        height: "150px",
        width: "100%",
      }}
    />
  );
};

export default Page;
