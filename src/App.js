import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RequestTime from "./components/requestTime";
import DetailIP from "./components/detailIP";
import DetailAPI from "./components/detailAPI";
import { ReactiveBase } from "@appbaseio/reactivesearch";

function App() {
  return (
    <div className="App">
      {" "}
      <div className="d-flex col-md-12">
        <div
          className="container-left col-md-8"
          style={{
            marginRight: "5px",
          }}
        >
          <span
            style={{
              textAlign: "left",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "12px",
            }}
          >
            Dasboard
          </span>
          <div
            className="table-group mt-2"
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
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "12px",
              }}
            >
              Chi tiết API
            </span>
            <DetailAPI />
          </div>
        </div>
        <div className="container-right col-md-4">
          <span
            style={{
              textAlign: "left",
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "12px",
            }}
          >
            Dữ liệu thống kê khác
          </span>
          <div
            className="mt-2"
            style={{
              border: "1px solid #D9D9D9",
              display: "block",
              height: "93%",
              backgroundColor: "white",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default App;
