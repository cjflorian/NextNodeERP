


import Swal from "sweetalert2"
import "bootstrap/dist/css/bootstrap.min.css"
import Router from 'next/router';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_KEY;

export const setUserSession = ( iduser, user,  email, token) => {
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('email', email)
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('iduser', iduser)
    
}

export const removeUserSession = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('iduser')
}


export const getIdUser = () => {
    return sessionStorage.getItem('iduser') || null
}
export const getToken = () => {
    return sessionStorage.getItem('token')
}

// sweet
export const SwalertOk = (message = '') => {
    Swal.fire({
        title: "Success",
        text: message,
        icon: "success",
        confirmButtonText: "OK",
    });
}

export const SwalertError = (message = '') => {
Swal.fire({
    title: "Oops...",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
});
}

export const SwalertOkDialog = (message = '') => {
Swal.fire({
    title: "Success",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
    position: 'down-end',
    showConfirmButton: false,
    timer: 3000
    });
}


export const SwalertConfirmDelete = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            return result.isConfirmed;
        }
      })
}


/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export const verifyToken = (jwtToken) => {
    try {
      return jwt.verify(jwtToken, SECRET_KEY);
    } catch (e) {
      console.log('e:', e);
      return null;
    }
  }
  
  /*
   * @params {request} extracted from request response
   * @return {object} object of parse jwt cookie decode object
   */
  export const getAppCookies = (req) => {
    const parsedItems = {};
    if (req.headers.cookie) {
      const cookiesItems = req.headers.cookie.split('; ');
      cookiesItems.forEach(cookies => {
        const parsedItem = cookies.split('=');
        parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
      });
    }
    return parsedItems;
  }
  
  /*
   * @params {request} extracted from request response, {setLocalhost} your localhost address
   * @return {object} objects of protocol, host and origin
   */
  export const absoluteUrl = (req, setLocalhost) => {
    var protocol = 'https:';
    var host = req
      ? req.headers['x-forwarded-host'] || req.headers['host']
      : window.location.host;
    if (host.indexOf('localhost') > -1) {
      if (setLocalhost) host = setLocalhost;
      protocol = 'http:';
    }
    return {
      protocol: protocol,
      host: host,
      origin: protocol + '//' + host,
      url: req,
    };
  }
  
  /*
   * @params {none} set action for logout and remove cookie
   * @return {function} router function to redirect
   */
  export const setLogout = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    Router.push('/');
  }
