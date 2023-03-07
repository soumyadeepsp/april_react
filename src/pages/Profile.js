import { useEffect, useState } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';

function Profile() {
    useEffect(async () => {
        console.log("use effect is getting called");
        var res = await axios.get('http://localhost:8000/users/check_authentication');
        console.log(res);
        // if (res.data.success==false) {
        //     window.location = 'http://localhost:3006/users/signin';
        // }
    }, []);
    const logout = async (e) => {
        console.log("user is going to log out");
        try {
            var res = await axios.get('http://localhost:8000/users/logout');
            console.log("response => "+res);
            if (res.data.success==true) {
                window.location = 'http://localhost:3006/users/signin';
            }
        } catch(err) {
            console.log("error: ", err);
        }
    }
    return (
        <div className='Profile'>
            <h1>profile</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Profile;