import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";


import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { createPage } from "../redux/actions/pageAction";


function PageDetail({ page }) {
  const [show, setShow] = useReducer((show) => !show, false);
  const [namee, setNamee] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    } else {
      createPage(name)(dispatch);
      closeModal();
    }
  };
  const closeModal = () => {
    setNamee("");
    setError("");
    setShow();
  };



  const { name } = page;
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary">
      <Link className="text-decoration-none text-white" to={`/editor/${page._id}`}>
        {name}
      </Link>
      {/* <div>
        <button className="btn btn-sm btn-outline-info">
          <i className="fa fa-paper-plane btn-save"></i>
        </button>
      </div> */}





          <div className="my-2 d-flex flex-column">
          <button
            type="button"
            onClick={() => setShow(!show)}
          >
            <i className="fa fa-paper-plane btn-save"></i>
          </button>



                <form id="create-page">
                <Modal
                  show={show}
                  onHide={setShow}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                    <Modal.Header closeButton>
                      <Modal.Title>Share Published Form</Modal.Title>
                    </Modal.Header>
                      <Modal.Body> 
                        <div className="col-auto">
                            <QRCode value={`192.168.0.110:8080/${page._id}`} />
                        </div>

                        <div className="col-auto">
                          <label htmlFor="name" className="form-label">
                          <a target="_blank" href={`http://192.168.0.110:8080/${page._id}`}>Go to published form</a>
                          </label>
                        </div>
                      </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={closeModal}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </form>
              </div>




    </li>
  );
}

export default PageDetail;
