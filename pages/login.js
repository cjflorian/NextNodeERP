import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/layout'
import { useEffect, useState, useMemo  } from 'react'
import Table from "../components/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import actions from "../components/Actions";
import  { SwalertOk, SwalertError, SwalertConfirmDelete }  from "../components/utils/Utils";
import _axios from '../components/AxiosInstance';
const endPoint = '/api/auth'
const Login = require('../components/models/login');

export default function Users() {

    
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [form, SetForm] = useState({
    name: '',
    password: ''
});

  const handleSubmit = (event) => {
    event.preventDefault();
    
    Login.user = event.target[0].value;
    Login.password = event.target[1].value;
  
      if(validatedata(Login))
      {
        LoginUser(Login)
      }
      else
        SwalertError('Error in credentials')
    }

    const validatedata = (model) => {
      console.log(model)
        if(model.name !== '' && model.password !==''){
         return true;
        }
        else
         return false;
     }

     const LoginUser = (model) => {
      console.log(model)
      console.log(endPoint)
        _axios.post(endPoint, model).then((result) => {
          setShow(false);
          setId(0);
          SwalertOk('Validating credentials')
        })
     }
 
    
    
    return(
        <div className="m-0 vh-100 row justify-content-center align-items-center">
            <div className="co-auto bt-danger p-5 text-center border border-primary rounded">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input 
                  type="text" 
                  value={username} 
                  className='form-control' 
                  onChange={(e) => setUserName(e.target.value)} 
                />
            </label>
            <br></br>
            <label>
                <p>Password</p>
                <input 
                  type="password" 
                  value={password} 
                  className='form-control' 
                  onChange={(e) => setPassword(e.target.value)} 
                />
            </label>
            <div>
                <button type="submit" className='btn btn-success'>Submit</button>
            </div>
            </form>
            <h5>
              <Link href="/">← Back to home</Link>
            </h5>
        </div>
        </div>
      
    )
  }