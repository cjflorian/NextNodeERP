


import Swal from "sweetalert2"
import "bootstrap/dist/css/bootstrap.min.css"


export const getIdusuario = () => {
    return sessionStorage.getItem('idusuario') || null
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
