import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RequestTime from "./components/requestTime";
import DetailIP from "./components/detailIP";
import DetailAPI from "./components/detailAPI";

function App() {
  return (
    <div className="App">
      {" "}
      <div className="d-flex col-md-12 h-100">
        <div
          className="container-left col-md-9"
          style={{
            marginRight: "5px",
            height: "calc(100% - 40px)",
          }}
        >
          <span
            style={{
              textAlign: "left",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
            }}
          >
            Dasboard
          </span>
          <div
            className="table-group mt-2 w-20"
            style={{
              border: "1px solid #D9D9D9",
              backgroundColor: "white",
            }}
          >
            <RequestTime />
          </div>
          <div
            className="table-group mt-2"
            style={{
              border: "1px solid #D9D9D9",
              backgroundColor: "white",
            }}
          >
            <DetailIP />
          </div>
          <div
            className="table-group mt-2"
            style={{
              border: "1px solid #D9D9D9",
              backgroundColor: "white",
            }}
          >
            <span
              className="m-2"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
            >
              Chi tiết API
            </span>
            <DetailAPI />
          </div>
        </div>
        <div className="container-right col-md-3">
          <span
            style={{
              textAlign: "left",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
            }}
          >
            Dữ liệu thống kê khác
          </span>
          <div
            className="mt-2 "
            style={{
              border: "1px solid #D9D9D9 ",
              display: "block",
              backgroundColor: "white",
              height: "calc(100% - 40px)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
