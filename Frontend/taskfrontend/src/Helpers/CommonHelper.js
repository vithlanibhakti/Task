import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from "axios";

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const Confirm =   MySwal.mixin({
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
    })
    

const baseUrl = "http://localhost:4000/";

const axiosPost = (reqUrl, reqBody) => {

    return new Promise((resolve, reject) => {

        axios.post(baseUrl + reqUrl, reqBody)

            .then(function (response) {

                if (response.status === 200) {
                    resolve(response);
                }
                else {
                    reject(response)
                }
            }).catch(function (error) {

                reject(error)
            })

    })
}

const axiosGet = (reqUrl, reqBody) => {

    if (!reqBody) {
        reqBody = {}
    }
    return new Promise((resolve, reject) => {

        axios.get(baseUrl + reqUrl, { params: reqBody })

            .then(function (response) {

                if (response.status === 200) {
                    resolve(response);
                }
                else {
                    reject(response)
                }
            }).catch(function (error) {

                reject(error)
            })

    })
}

export { Toast, MySwal, axiosGet, axiosPost, Confirm }
