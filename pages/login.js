import Link from 'next/link';
import { useEffect, useState, useMemo  } from 'react'
import  { SwalertOk, SwalertError, SwalertConfirmDelete, getToken, setUserSession }  from "../components/utils/Utils";
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
    
    const obj = {
      name: event.target[0].value,
      password: event.target[1].value
    };
    console.log(obj)
      if(validatedata(obj))
      {
        LoginUser(obj)
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
        _axios.post(endPoint, model).then((result) => {
          //setUserSession()
          console.log(result)
          setUserSession(result.data.payload.id, model.name, result.data.payload.email,  result.data.token)
          SwalertOk('Validating credentials')
          if (!(getToken === null)) {
            window.location = './main'
        } else {
            setError(
                'Token no inicializado'
            )
        }
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