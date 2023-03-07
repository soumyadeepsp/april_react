import { useState } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';

function SignupForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeEmail = (e) => {
        setEmail(e.target.value);
    }
    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    const changeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const signup = async (e) => {
        var res = await axios.post('http://localhost:8000/users/create', {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        console.log(res);
        if (res.data.success==true) {
            window.location = 'http://localhost:3006/users/signin';
        } else {
            // show notification that signup failed
        }
    }
    return (
        <form onSubmit={(event) => event.preventDefault()}>
            <input onChange={changeName} type='text' name='name' placeholder='Your name'></input>
            <input onChange={changeEmail} type='email' name='email' placeholder='Your email'></input>
            <input onChange={changePassword} type='password' name='password' placeholder='Your password'></input>
            <input onChange={changeConfirmPassword} type='password' name='confirm_password' placeholder='Confirm your password'></input>
            <button onClick={signup}>Submit</button>
        </form>
    );
}

export default SignupForm;