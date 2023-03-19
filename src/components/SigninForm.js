import { useState, useContext, withRouter, useEffect } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';
import AuthContext from '../context/authContext/authContext';
import { useNavigate } from "react-router-dom";
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
const clientId = '1011703805644-0bd3gm5uo9unqsvk3aaepqehr8nntunk.apps.googleusercontent.com';
const clientSecret = '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';

function SigninForm() {
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        gapi.load('client:auth2', start);
    })
    const {user, setUser} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    const navigate = useNavigate();
    const signin = async (e) => {
        var res = await axios.post('http://localhost:8000/users/create_session', {
            email: email,
            password: password,
            withCredentials: true
        });
        console.log(res);
        if (res.data.success===false) {
            alert("Login failed");
        }
        if (res.data.success===true) {
            var userDetails = res.data.user;
            setUser(userDetails);
            window.localStorage.setItem("user", JSON.stringify(userDetails));
            console.log(userDetails);
            navigate('/users/profile');
            // window.location = `http://localhost:3006/users/profile`;
        }
    }
    const google_signin = async (e) => {
        var res = await axios.get('http://localhost:8000/users/auth/google', {
            crossdomain: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        console.log(res);
    }
    const onSuccess = (res) => {
        console.log("login successful: "+res.profileObj);
    }
    const onFailure = (res) => {
        console.log("login failed: "+res);
    }
    return (
        <div>
            <form onSubmit={(event) => event.preventDefault()}>
                <input id='email' onChange={changeEmail} type='email' name='email' placeholder='Your email'></input>
                <input id='password' onChange={changePassword} type='password' name='password' placeholder='Your password'></input>
                <button onClick={signin}>Sign In</button>
            </form>
            <GoogleLogin
                clientId={clientId}
                buttonText="Google Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

export default SigninForm;