import axios from 'axios'
import { SwalertOk, SwalertError, getToken, getIdUser }  from "./utils/Utils"
const _axios = axios.create({
})


// Add a request interceptor for customs headers
_axios.interceptors.request.use(
    config => {
        config.headers['Access-Control-Allow-Origin'] = '*'
        // config.headers['Access-Control-Allow-Headers'] = '*';
        config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        // config.headers['mimeType'] = 'multipart/form-data;';
        config.headers.Authorization = `Bearer ${getToken()}`
        config.headers.IdUsuario = `${getIdUser()}`
        return config
    },
    error => Promise.reject(error)
)


_axios.interceptors.response.use(
    response => response,
    (error) => {
        window.scrollTo(0, 0)

        if (error.code === 'ERR_NETWORK' && !ValidateExpiracion()) {
            SwalertError('Sesión expirada', `Código de error ${401}`)
            setTimeout(() => {
                sessionStorage.clear()
                window.location = './'
            }, 1500)
            return
        }

        if (!error.response?.status) {
            SwalertError('Error al consultar datos al servidor', `Código de error ${500}`)
        }

        switch (error.response?.status) {
            case 400:
                SwalertError(error.response.data.message, error.response.data.details)
                break
            case 401:
                SwalertError('No tiene permisos para esta opción, la sessión ha expirado.', 'Inicie sessión nuevamente.')
                setTimeout(() => { window.location = './' }, 3000)
                break
            case 404:
                SwalertError('Recurso no encontrado')
                break
            case 500:
                alertError('Lo sentimos, algo salió mal, por favor intentelo nuevamente',
                    'Si el error persiste envíe un correo a soporte@coporaciontak.com')
                break
            default:
                try {
                    SwalertError(error.response.data.message, `Código de error ${error.request.status}`)
                } catch {
                    SwalertError('Error al consultar datos al servidor', `Código de error ${500}`)
                }
                break
        }
        return Promise.reject(error)
    }
)

export default _axios