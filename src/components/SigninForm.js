import { useState } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';

function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    const signin = async (e) => {
        var res = await axios.post('http://localhost:8000/users/create_session', {
            email: email,
            password: password,
            withCredentials: true
        });
        console.log(res);
        // if (res.data.success==true) {
        //     window.localStorage.setItem('sahinotes_user_id', res.data.id);
        //     window.location = `http://localhost:3006/users/profile`;
        // }
    }
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <input onChange={changeEmail} type='email' name='email' placeholder='Your email'></input>
            <input onChange={changePassword} type='password' name='password' placeholder='Your password'></input>
            <button onClick={signin}>Sign In</button>
        </form>
    );
}

export default SigninForm;