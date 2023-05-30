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
const endPoint = '/api/user'
const Login = require('../components/models/login');

export default function Users() {

    
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    Login.user = event.target[1].value;
    Login.password = event.target[2].value;
  
    console.log(Login)
      if(validatedata(User))
      {
        LoginUser(login)
      }
      else
      SwalertError('Error in credentials')
    }

    const validatedata = (model) => {
        if(model.name !== '' && model.password !==''){
         return true;
        }
        else
         return false;
     }

     const LoginUser = (model) => {
        SwalertOk('Validating credentials')
     }
 
    
    
    return(
        <div className="m-0 vh-100 row justify-content-center align-items-center">
            <div className="co-auto bt-danger p-5 text-center border border-primary rounded">
            <h1>Log In</h1>
            <form>
            <label>
                <p>Username</p>
                <input className='form-control' type="text" onChange={e => setUserName(e.target.value)} />
            </label>
            <br></br>
            <label>
                <p>Password</p>
                <input className='form-control' type="password" onChange={e => setPassword(e.target.value)} />
            </label>
            <div>
                <button type="submit" className='btn btn-success'>Submit</button>
            </div>
            </form>
        </div>
        </div>
      
    )
  }