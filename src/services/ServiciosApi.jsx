import { useDispatch } from 'react-redux'
import { crearTransaccion } from '../features/transacciones/TransaccionesSlice'


let apiURL = 'https://crypto.develotion.com';

export const apiLogin = async ({ usuario, password }) => {
    console.log(usuario, password, "LOGIN API");

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        usuario: usuario,
        password: password,
    });

    let requestOptions = {
        method: "POST",
        headers: headers,
        body: raw,
    };

    return fetch(`${apiURL}/login.php`, requestOptions)
        .then((response) => response.json())
        .then((result) => {

            switch (result.codigo) {
                case 200:

                    return Promise.resolve(result);

                default:
                    return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Ah ocurrido un error, vuelva a intentarlo mas tarde"));
};

export const apiRegistro = async ({ usuario, password, idDepartamento, idCiudad }) => {
    console.log(usuario, password, idDepartamento, idCiudad, "REGISTRO API");

    let headers = new Headers();
    headers.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        usuario: usuario,
        password: password,
        idDepartamento: idDepartamento,
        idCiudad: idCiudad 
    });

    let requestOptions = {
        method: "POST",
        headers: headers,
        body: raw,
    };

    return fetch(`${apiURL}/usuarios.php`, requestOptions)
        .then((response) => response.json())
        .then((result) => {

            switch (result.codigo) {
                case 200:
                    return Promise.resolve(result);
                
                default:
                    return Promise.reject(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Ah ocurrido un error, vuelva a intentarlo mas tarde"));
}

export const ApiTransaccion = async ({ idUsuario, tipoDeOperacion, moneda, cantidad, valorActual }) => {
    console.log(idUsuario, tipoDeOperacion, moneda, cantidad, valorActual, "TRANSACCION API");

    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const dispatch = useDispatch();

    let headers = {
        "Content-Type": "application/json"
    }

    if (dataLog != null) {
        headers["apikey"] = `${dataLog.apiKey}`
    }

    let raw = JSON.stringify({
        idUsuario: idUsuario,
        tipoOperacion: tipoDeOperacion,
        moneda: moneda,
        cantidad: cantidad,
        valorActual: valorActual,
    });

    let requestOptions = {
        method: "POST",
        headers: headers,
        body: raw,
    };

    return fetch(`${apiURL}/transacciones.php`, requestOptions)
        .then((response) => response.json())
        .then((result) => {

            switch (result.codigo) {
                case 200:
                    raw.id = result.id;
                    dispatch(crearTransaccion(raw))
                    return Promise.resolve(result);

                default:
                    return Promise.resolve(result);
            }
        })
        .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Ah ocurrido un error, vuelva a intentarlo mas tarde"));
}