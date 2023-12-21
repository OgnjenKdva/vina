import AutobuskaAxios from '../apis/AutobuskaAxios'
import jwt_decode from "jwt-decode"

export const login = async function(username, password){
    const cred = {
        username: username,
        password: password
    }

    try{
        const ret = await AutobuskaAxios.post('korisnici/auth',cred);
        const jwt_decoded = jwt_decode(ret.data);
        window.localStorage.setItem('jwt',ret.data);
        window.localStorage.setItem('role',jwt_decoded.role.authority);
        window.location.replace('/');
    }catch(err){
        alert("Neuspesan login");
        console.log(err);
    }
}

export const logout = function(){
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('role');
    window.location.replace('/');
}