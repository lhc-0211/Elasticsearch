import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ModalDetaiAPI = (props) => {
  const [dataDetailIP, setDataDetailIP] = useState([]);
  const { id, show, setmodalshow } = props;

  useEffect(() => {
    if (show && id) fetchData();
  }, [id, show]);

  const fetchData = async () => {
    try {
      const controller = new AbortController();
      const { signal } = controller;

      // Set timeout, for example, 10 seconds
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(
        `http://10.64.103.135:2001/apis/viewlog/${id}`,
        { signal }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setDataDetailIP(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClose = () => {
    setDataDetailIP([]);
    setmodalshow(false);
  };

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      show={show}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Chi tiết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group d-flex col-md-12">
          <div className="form-group-child col-md-4">
            <label htmlFor="">Project</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.project || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Group</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.group || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Cmd</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.cmd || ""}
              disabled
            />
          </div>
        </div>
        <div className="form-group d-flex mt-2 col-md-12">
          <div className="form-group-child col-md-4">
            <label htmlFor="">Path</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.path || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Method</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.method || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Status</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.status || ""}
              disabled
            />
          </div>
        </div>
        <div className="form-group d-flex mt-2 col-md-12">
          <div className="form-group-child col-md-4">
            <label htmlFor="">Time</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.time || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Marketing ID</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.data?.marketing_id || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Trading date</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.data?.trading_date || ""}
              disabled
            />
          </div>
        </div>
        <div className="form-group d-flex mt-2">
          <div className="form-group-child col-md-4">
            <label htmlFor="">Account code</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.data?.account_code || ""}
              disabled
            />
          </div>
          <div className="form-group-child col-md-4">
            <label htmlFor="">Account name</label>
            <input
              className="w-75"
              type="text"
              value={dataDetailIP?.api?.data?.account_name || ""}
              disabled
            />
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
