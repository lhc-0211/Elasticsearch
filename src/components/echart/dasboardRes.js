import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import client from "../../connection.js";

const Page = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [timeRes, setTimeRes] = useState([]);
  const [dataRes, setDataRes] = useState([]);

  useEffect(() => {
    getElasticSearchData();
  }, []);

  useEffect(() => {
    viewLog();
  }, [dataRes]);

  const viewLog = () => {
    // Tạo một đối tượng để lưu trữ số lượng request cho từng khoảng thời gian
    const requestCounts = {};
    const timeRes = [];

    // Lặp qua mỗi mục trong mảng dữ liệu
    dataRes.forEach((item) => {
      // Chuyển đổi requestTime từ dạng chuỗi thành đối tượng Date
      const requestTime = new Date(item._source.api.time);

      timeRes.push(requestTime.toLocaleTimeString());

      // Tính toán chỉ số khoảng thời gian (5 phút)
      const timeIndex = Math.floor(requestTime.getTime() / (5 * 60 * 1000));

      // Kiểm tra xem timeIndex đã được định nghĩa trong requestCounts hay chưa
      if (!requestCounts[timeIndex]) {
        requestCounts[timeIndex] = 1;
      } else {
        requestCounts[timeIndex]++;
      }
    });

    setTimeRes(timeRes);
    setDashboardData(requestCounts);
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
        setDataRes(hits);
      })
      .catch((error) => {
        console.error("Error while searching:", error);
      });
  };

  const options = {
    grid: { top: 8, right: 18, bottom: 30, left: 19 },
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
        formatter: function (value) {
          const arr = value.split(":");
          return arr[0] + ":" + arr[1];
        },
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
