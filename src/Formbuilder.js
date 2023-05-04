import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { createPage } from "./redux/actions/pageAction";
import "./styles.css";


import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from "react";

 


const Formbuilder = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  // const { pageStore } = useSelector((state) => state); 
  // const { pages } = pageStore;

  const [pages,setPages] = useState([])

  

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false); 
      return;
    }
    createPage(name)(dispatch);
  };

  useEffect(()=>{
    console.log(pages)

    fetch('http://192.168.0.138:8080/api/pages',{
      method: 'GET'
    }).then(res => {
      res.json().then(resp =>{
        console.log(resp)
        setPages(resp)
      })
    }) 
    // eslint-disable-next-line
  },[])


  function deletePageHandler(id) {

    fetch(`http://192.168.0.138:8080/api/pages/${id}`, {
      method: 'DELETE'
    }).then((result)=>{
      result.json().then((resp) => {
        console.warn(resp);
        window.location.reload();
      })
    })
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          <form id="create-page">
            <div className="modal-header">
              <h5 className="modal-title" id="addPageModalLabel" style={{marginBottom: '5px'}}>
                Welcome to the Web Builder!
              </h5>
            </div>
            <div className="modal-body">
              <div className="col-auto">
                {/* <label htmlFor="name" className="form-label">
                  Name
                </label> */}
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    isValid ? "" : "is-invalid"
                  }`}
                  id="name"
                  name="name"
                  placeholder="Name of Page"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn rounded btn-dark border border-light"
                onClick={handleSubmit}

                style={{  
                  borderRadius: '20px',
                  margin: '15px',
                  marginRight: '0px',
                  paddingLeft: '40px', 
                  paddingRight: '40px',
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 my-2">
          <table className="table table-hover table-dark" 
          style={{
            color: '#fff',
            opacity: '.7',  
            borderRadius: '5px',
          }}
          >
            <thead>
              <tr>
                <td>Name</td>
                <td>ID</td>
                <td>Slug</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {pages
                ?  pages.map((page) => (
                    
                    <tr key={page._id}>
                      <td>{page.name}</td>
                      <td>{page._id}</td>                     
                      <td>{page.slug}</td>
                      <td>

                        <Button variant="outlined" href={`/editor/${page._id}`} endIcon={<EditIcon />} 
                        style={{
                          backgroundColor: '#495151',
                          color: 'white',
                          borderColor: 'white',
                          marginRight: '5px',
                          textDecoration: 'none',
                        }}
                        >
                          Edit
                        </Button>


                        <Button variant="outlined" href={`http://192.168.0.138:8080/${page._id}`} target="_blank" endIcon={<RemoveRedEyeIcon />} 
                        style={{
                          backgroundColor: '#495151',
                          color: 'white',
                          borderColor: 'white',
                          marginRight: '5px',
                          textDecoration: 'none',
                        }}
                        >
                          Preview
                        </Button>

                        
                        <Button variant="outlined" target="_blank" endIcon={<DeleteIcon />} onClick={()=>deletePageHandler(page._id)}
                        style={{
                          backgroundColor: '#495151',
                          color: 'white',
                          borderColor: 'white',
                          textDecoration: 'none',
                          marginRight: '0',
                        }}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                : "No Page"}
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
};

export default Formbuilder;
