import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";

const Page = (props) => {
  const [dashboardData, setDashboardData] = useState([]);
  const [timeRes, setTimeRes] = useState([]);
  const [dataRes, setDataRes] = useState([]);

  const { dataChart } = props;

  const valueList =
    Array.isArray(dataChart) && dataChart.map((item) => item.countLog);

  const timeList =
    Array.isArray(dataChart) && dataChart.map((item) => item.startTime);

  useEffect(() => {
    // fetchData();
  }, []);

  useEffect(() => {
    // viewLog();
  }, [dataRes]);

  const options = {
    type: "continuous",
    grid: { top: 8, right: 18, bottom: 35, left: 19 },
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
      data: timeList,
      boundaryGap: false,
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "#3F3E4F",
          dashOffset: 10,
          opacity: 0.3,
        },
      },
      axisTick: {
        alignWithLabel: true,
        length: 3,
      },
      axisLabel: {
        color: "#83817C",
        fontSize: 8,
        borderColor: "#ECECEC",
        formatter: function (value) {
          const arr = value?.split(" ");
          return arr[1];
        },
        interval: 30,
        borderColor: "#ECECEC",
        showMinLabel: true,
        showMaxLabel: true,
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
        data: valueList,
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
