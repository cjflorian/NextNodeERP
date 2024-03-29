import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout'
import {  react, useEffect, useState, useMemo  } from 'react'
import ReactDOM from 'react-dom';
import Table from "../../components/table/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import actions from "../../components/Actions";
import  { SwalertOk, SwalertError, SwalertConfirmDelete }  from "../../components/utils/Utils";
import _axios from '../../components/AxiosInstance';
const endPoint = '/api/user'
const User = require('../../components/models/user');
import generatePDF from "./reportGenerator"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPrint, faUser, faEdit, faClose } from '@fortawesome/free-solid-svg-icons'



export default function Users() {
    const [action, setAction] = useState(actions.find(x => x.type === 'R'));
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [edit, setEdit] = useState(false);    
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordc, setPasswordC] = useState("");
    const [name, setName] = useState("");
    const [active, setActive] = useState(false);
    const [dataEdit, setDataEdit] = useState([]);
    const value = useMemo(() => ({ a: id }), [id]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [numPages, setNumPages] = useState()
    const [arrPages, setArrPage] = useState([]);
    const valuePage = useMemo(() => ({ b: page }), [page]);
    const [isActive, setIsActive] = useState(false);

    const [form, SetForm] = useState({
      id:0,
      email: '',
      name: '',
      password: '',
      active: true
  });


    const handleShow = () => {
      setShow(true);
      setAction(actions.find(x => x.type === 'N'));
      setEdit(false);
      SetForm();
      setId("");
      cleanForm();
    }

    
    useEffect(() => {
      let endPointPaginate = endPoint + `?page=${page}?&limit=${limit}`
      _axios.get(endPointPaginate, {}).then((result) => {
        //console.log(result.data)
        setData(result.data.data);
        setNumPages(result.data.paging.pages)
        setArrPage( Array.from(Array(result.data.paging.pages).keys()) )
    })
    }, [id, page])

    const cleanForm = () => {
        setEmail("");
        setActive(false);
        setName("");
        setPassword("");
        setPasswordC("");
    }


    
    const handleEdit = (event) => {
      setShow(true);
      setAction(actions.find(x => x.type === 'U'));
      setEdit(true);
      setId(event.id);
      editByID(event.id);
    };

    const handleDelete =  async (event) => {
     // let result = await resp()
        setId(event.id)
        let result = false
        result = await SwalertConfirmDelete()
        if(result===true)
          deleteData()
    };

  

    const editByID = (idE) => {
      let endPointEdit = endPoint + '?id='+idE;
      _axios.get(endPointEdit, {}).then((result) => {
      setName(result.data[0].name);
      setEmail(result.data[0].email);
      setPassword(result.data[0].password);
      setPasswordC(result.data[0].password);
      setActive(result.data[0].active);
      setDataEdit(result.data);
    })
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      
      User.name = event.target[1].value;
      User.email = event.target[2].value;
      User.password = event.target[3].value;
      User.active = event.target[5].value;
      
      if(User.password === event.target[4].value){
        if(validatedata(User))
        {
          if(edit===false){
            saveData(User)
          }
          else{
            User.id = event.target[0].value;
            updateData(User)
          }
        }
        else
        SwalertError('DatosRequeridos')
      }
      else
        SwalertError('Contraseñas no coinciden')
    }

    const validatedata = (model) => {
       if(model.name !== '' && model.email !==''){
        return true;
       }
       else
        return false;
    }



    const saveData = (model) =>{
      _axios.post(endPoint, model).then((result) => {
        setShow(false);
        setId(0);
        SwalertOk('New item created succesfully!')
      })
    }

    const updateData = (model) =>{
      _axios.put(endPoint, model).then((result) => {
        setShow(false);
        setId(0);
        SwalertOk('New item updated succesfully!')
      })
    }

    const deleteData = () =>{
      
      let endPointEdit = endPoint + '?id='+id;
      _axios.delete(endPointEdit, '').then((result) => {
        setShow(false);
        setId(0);
        SwalertOk('New item delete succesfully!')
      })
    }

    const onPageSelect = (page, idName) => {
      setPage(page)
      setNumPages(page)
      const el = document.getElementById(idName);
      el.className = "btn btn-success";
    }

    

    const columns = useMemo(
      () => [
        {
          Header: "List of Users",
          // First group columns
          columns: [
            {
              Header: "Id",
              accessor: "id",
            },
            {
              Header: "Email",
              accessor: "email",
            },
            {
              Header: "User",
              accessor: "name",
            },
            {
              Header: "Options",
              accessor: 'action',
              Cell: row => (
              <div>
                 <Button variant="warning"  onClick={e=> handleEdit(row.row.original)}><FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} />Edit</Button>
                 <Button variant="danger"  onClick={e=> handleDelete(row.row.original)}><FontAwesomeIcon icon={faClose} style={{ height: "20px" }} />Delete</Button>
              </div>
              )
            }
          ],
        }
      ],
      []
    );

    var formTitle = edit ? "Edit" : "Create";
  
    

    if (!data) return <div>loading...</div>;
  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>
      <h1> <FontAwesomeIcon icon={faUser} style={{ height: "20px" }} /> users</h1>
      <button className="btn btn-primary"  onClick={() => generatePDF(data)}>
          <FontAwesomeIcon icon={faPrint} style={{ height: "20px" }} />
              Report
          </button>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{ formTitle } </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
        <label>ID: </label>
            <input 
              type="number" 
              value={id}
              className='form-control'
              readOnly={true}
            />
          <label>Name: </label>
            <input 
              type="text" 
              value={name}
              className='form-control'
              onChange={(e) => setName(e.target.value)}
            />
             <label>Email: </label>
            <input 
              type="email" 
              value={email}
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
            />
             <label>Password: </label>
            <input 
              type="password" 
              value={password}
              className='form-control'
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password: </label>
            <input 
              type="password" 
              value = {passwordc}
              className='form-control'
              onChange={(e) => setPasswordC(e.target.value)}
            />
             <label>Active: </label>
            <input 
              value={active}
              className="form-check-input" 
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.value)}
            />
            <br></br>
          <input type="submit" text="Save changes" className='btn btn-success' />
        </form>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <Button variant="success" onClick={handleShow}>
      <FontAwesomeIcon icon={faPlus} style={{ height: "20px" }} />
        New
      </Button>
      <br></br>
      <>
      <Table columns={columns} data={data}  />
      {arrPages.map((num, index) => (
              <button
               className='btn btn-light'
               id = { 'btn'+ (index + 1)}
                onClick={() => onPageSelect(index + 1, 'btn'+ (index + 1) )}
              >
                {index + 1}
              </button>
            ))}
      </>
      </Layout>
  );
}