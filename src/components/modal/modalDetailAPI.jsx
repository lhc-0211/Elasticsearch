import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import client from "../../connection.js";

const ModalDetaiAPI = (props) => {
  const [dataDetailIP, setDataDetailIP] = useState([]);
  const { id, setModalShow } = props;

  useEffect(() => {
    if (!id) return;
    getElasticSearchData(id);
  }, [id]);

  const getElasticSearchData = (id) => {
    console.log(id);
    client
      .search({
        index: "loginfor",
        body: {
          query: {
            match: {
              _id: id,
            },
          },
        },
      })
      .then((response) => {
        // Xử lý dữ liệu ở đây
        const hits = response.hits.hits;
        setDataDetailIP(hits);
      })
      .catch((error) => {
        console.error("Error while searching:", error);
      });
  };

  const handleClose = () => {
    setDataDetailIP([]);
    setModalShow(false);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Chi tiết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <div className="form-group d-flex col-md-12 w-100">
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Project</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.client.ip || ""}
                disabled
              />
            </div>
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Group</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.api.group || ""}
                disabled
              />
            </div>
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Cmd</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.api.group || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2 col-md-12 ">
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Path</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.api.group || ""}
                disabled
              />
            </div>
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Method</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.api.status || ""}
                disabled
              />
            </div>
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Status</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.api.status || ""}
                disabled
              />
            </div>
          </div>
          <div className="form-group d-flex mt-2">
            <div className="d-flex flex-column w-75 m-1">
              <label htmlFor="">Time</label>
              <input
                type="text"
                value={dataDetailIP[0]?._source?.api.path || ""}
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
