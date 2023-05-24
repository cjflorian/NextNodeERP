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
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [activo, setActivo] = useState(true);
    const [error, setError] = useState(null);
    const [dataEdit, setDataEdit] = useState([]);

    const [form, SetForm] = useState({
      id:0,
      email: '',
      name: '',
      password: '',
      activo: true
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
      setEdit("")
      SetForm()
      setId("")
    }

    
    useEffect(() => {
      axios.get(endPoint, {}).then((result) => {
        console.log(result.data);
        setData(result.data);
    })
    }, [id])


    
    const handleEdit = (event) => {
      console.log(event.id);
      setShow(true);
      setAction(actions.find(x => x.type === 'U'));
      setEdit(true);
      setId(event.id);
      editByID(event.id);
    };

    const editByID = (idE) => {
      debugger;
      let endPointEdit = endPoint + '?id='+idE
      axios.get(endPointEdit, {}).then((result) => {
        console.log(result.data);
        setDataEdit(result.data);
        setEmail(result.data[0].email);
        setActivo(result.data[0].activo);
        setName(result.data[0].name);
        setPassword(result.data[0].password);

    })
    }

    const handleSave =() => {
      console.log(form)
    }

    

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
                 <Button className="warning" onClick={e=> handleEdit(row.row.original)}>Edit</Button>
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
        <Modal.Body>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Id</Form.Label>
          <Form.Control type="text" placeholder="name@example.com" readOnly={true} disabled={true} size="sm" name='id' value={id} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="name@example.com"  size="sm" name='email'  onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="example" size="sm" name='name' onChange={handleChange} value={name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"  size="sm" name='password' onChange={handleChange}  value={password}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Activo</Form.Label>
          <Form.Check type="switch"  size="sm" name='activo' onChange={handleChange} value={id} />
        </Form.Group>
        <Button className="success"></Button>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="success" onClick={handleShow}>
        New
      </Button>
      <br></br>
      <>
      <Table columns={columns} data={data}  />
      </>
      </Layout>
  );
}