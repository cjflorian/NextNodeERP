


import Swal from "sweetalert2"
import "bootstrap/dist/css/bootstrap.min.css"



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


export const SwalertConfirmDelete = async (message = '') => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            return true
        }
        else
            return false
      })
}
