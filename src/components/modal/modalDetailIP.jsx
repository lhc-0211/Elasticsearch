import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ModalDetaiIP = (props) => {
  const [dataDetailIP, setDataDetailIP] = useState([]);
  const { id, modalShow, onClose } = props;

  useEffect(() => {
    if (id && modalShow) {
      fetchData();
    }
  }, [id, modalShow]);

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
    onClose();
  };

  return (
    <Modal size="lg" centered show={modalShow}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Chi tiết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="form-group d-flex col-md-12">
            <div className="form-group-child col-md-4">
              <label htmlFor="">IPAddress</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.client?.ip || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Nhóm</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.api?.group || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Mã nghiệp vụ</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.api?.cmd || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2 col-md-12 ">
            <div className="form-group-child col-md-4">
              <label htmlFor="">Status</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.api?.status || ""}
                disabled
              />
            </div>
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
              <label htmlFor="">User</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.client?.user || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2 col-md-12 ">
            <div className="form-group-child col-md-4">
              <label htmlFor="">User id</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.client?.id || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">User ip</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.client?.ip || ""}
                disabled
              />
            </div>
            <div className="form-group-child col-md-4">
              <label htmlFor="">Browser</label>
              <input
                className="w-75"
                type="text"
                value={dataDetailIP?.client?.browser || ""}
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

export default ModalDetaiIP;
