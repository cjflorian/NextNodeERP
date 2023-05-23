import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout'
import { useEffect, useState, useMemo  } from 'react'
import axios from 'axios'
const endPoint = '/api/user'
import Table from "../../components/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import actions from "../../components/Actions"
import Form from 'react-bootstrap/Form';

export default function Users() {
    const [action, setAction] = useState(actions.find(x => x.type === 'R'))
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [edit, setEdit] = useState(false);    
    const [id, setId] = useState("")
    const [form, SetForm] = useState({
      id:0,
      email: '',
      name: '',
      password: ''
  });

  
  const handleChange = (e) => {
    setError(null)
    const { name, value } = e.target

    SetForm({
        ...form,
        [name]: value
    })
}

    const handleShow = () => {
      setShow(true);
      setAction(actions.find(x => x.type === 'N'))
      setEdit(false)
    }

    
    useEffect(() => {
      axios.get(endPoint, {}).then((result) => {
        console.log(result.data);
        setData(result.data);
    })
      console.log(data);
    }, [])


    
    const handleEdit = (event) => {
      console.log(event.id);
      setShow(true);
      setAction(actions.find(x => x.type === 'U'))
      setEdit(true)
      setId(event.id);
    };

    

    const columns = useMemo(
      () => [
        {
          // first group - TV Show
          Header: "Users",
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
                 <Button onClick={e=> handleEdit(row.row.original)}>Edit</Button>
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
      <h1>users</h1>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{ formTitle } </Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!
          <Form.Control 
            size="sm" 
            type="text"
            name='id'
            value={id}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        New item
      </Button>
      <br></br>
      <>
      <Table columns={columns} data={data} endpoint={endPoint} />
      </>
      </Layout>
  );
}