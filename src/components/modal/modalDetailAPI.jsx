import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import client from "../../connection.js";

const ModalDetaiAPI = (props) => {
  const [dataDetailIP, setDataDetailIP] = useState([]);
  const { id, setModalShow } = props;

  useEffect(() => {
    if (!id) return;
    fetchData(id);
  }, [id]);

  // const getElasticSearchData = (id) => {
  //   console.log(id);
  //   client
  //     .search({
  //       index: "loginfor",
  //       body: {
  //         query: {
  //           match: {
  //             _id: id,
  //           },
  //         },
  //       },
  //     })
  //     .then((response) => {
  //       // Xử lý dữ liệu ở đây
  //       const hits = response.hits.hits;
  //       setDataDetailIP(hits);
  //     })
  //     .catch((error) => {
  //       console.error("Error while searching:", error);
  //     });
  // };

  const fetchData = async (id) => {
    try {
      const response = await fetch(
        `http://192.168.100.64:2001/apis/viewlog/${id}`
      );
      const result = await response.json();
      setDataDetailIP(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setDataDetailIP([]);
    setModalShow(false);
  };

  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Chi tiết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="form-group d-flex col-md-12 w-100">
            <div className="form-group-child col-md-4">
              <label htmlFor="">Project</label>
              <input
                type="text"
                value={dataDetailIP?.api?.project || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Group</label>
              <input
                type="text"
                value={dataDetailIP?.api?.group || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Cmd</label>
              <input
                type="text"
                value={dataDetailIP?.api?.cmd || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2 col-md-12 w-100">
            <div className="form-group-child col-md-4">
              <label htmlFor="">Path</label>
              <input
                type="text"
                value={dataDetailIP?.api?.path || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Method</label>
              <input
                type="text"
                value={dataDetailIP?.api?.method || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Status</label>
              <input
                type="text"
                value={dataDetailIP?.api?.status || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2 col-md-12 w-100">
            <div className="form-group-child col-md-4">
              <label htmlFor="">Time</label>
              <input
                type="text"
                value={dataDetailIP?.api?.time || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Marketing ID</label>
              <input
                type="text"
                value={dataDetailIP?.api?.data?.marketing_id || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Trading date</label>
              <input
                type="text"
                value={dataDetailIP?.api?.data?.trading_date || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2 w-100">
            <div className="form-group-child col-md-4">
              <label htmlFor="">Account code</label>
              <input
                type="text"
                value={dataDetailIP?.api?.data?.account_code || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Account name</label>
              <input
                type="text"
                value={dataDetailIP?.api?.data?.account_name || ""}
                disabled
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetaiAPI;
