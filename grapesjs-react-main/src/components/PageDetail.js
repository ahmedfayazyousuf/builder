import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";


import React, { useState, useReducer } from "react";


function PageDetail({ page }) {
  const [show, setShow] = useReducer((show) => !show, false);
  // eslint-disable-next-line
  const [namee, setNamee] = useState("");
  // eslint-disable-next-line
  const [error, setError] = useState("");

  // const dispatch = useDispatch();

  // const handleSubmit = async () => {
  //   if (!name) {
  //     setIsValid(false);
  //     return;
  //   } else {
  //     createPage(name)(dispatch);
  //     closeModal();
  //   }
  // };
  const closeModal = () => {
    setNamee("");
    setError("");
    setShow();
  };

  const myFunction = () => {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
    
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
  }



  const { name } = page;
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center bg-secondary">
      <Link className="text-decoration-none text-white" to={`/editor/${page._id}`}>
        {name}
      </Link>
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
                <Modal.Header closeButton
                style={{
                  backgroundColor: 'black',
                  color: 'white',

                }}
                >
                  <Modal.Title>Share Published Form</Modal.Title>
                    </Modal.Header>
                      <Modal.Body 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          padding: '15px',
                        }}
                        > 
                        <div className="col-auto">
                            <QRCode value={`192.168.0.110:8080/${page._id}`} />
                        </div>

                        <div className="col-auto" style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                          padding: '5px',
                          flexDirection: "column"
                        }}>


                          <div htmlFor="name" className="form-label" style={{padding: '15px', paddingBottom: '1px'}}>
                            <input type="text" value={`http://192.168.0.110:8080/${page._id}`} id="myInput" style={{color: "black"}} ></input>
                            <button onClick={myFunction}>Copy Link</button>
                          </div>


                          <label htmlFor="name" className="form-label">
                              {/* eslint-disable-next-line */}
                              <a target="_blank" style={{color: "blue", justifySelf:"center", alignSelf:"center"}} href={`http://192.168.0.110:8080/${page._id}`}>Go To Published Form</a>
                          </label>
                          
                        </div>
                      </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={closeModal} 
                        style={{
                          backgroundColor: 'black',
                        }}
                        >
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
