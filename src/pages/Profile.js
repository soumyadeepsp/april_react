import { useEffect, useState, useContext } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';
import AuthContext from '../context/authContext/authContext';
import { useNavigate } from 'react-router-dom';
import {GoogleLogout} from 'react-google-login';
const clientId = '1011703805644-0bd3gm5uo9unqsvk3aaepqehr8nntunk.apps.googleusercontent.com';
const clientSecret = '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';

function Profile() {
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(async () => {
        if (user.id===undefined && JSON.parse(window.localStorage.getItem('user')).id===undefined) {
            console.log(user);
            navigate('/users/signin');
        } else {
            var user_id = user.id ? user.id : JSON.parse(window.localStorage.getItem('user')).id;
            var res = await axios.get(`http://localhost:8000/users/check_authentication/${user_id}`);
            if (res.data.success===true) {
                var userDetails = res.data.user;
                setUser(userDetails);
                console.log("inside if=>"+userDetails.id);
                window.localStorage.setItem('user', JSON.stringify(userDetails));
            }
        }
    }, []);
    const logout = async (e) => {
        try {
            var user_id = user.id ? user.id : JSON.parse(window.localStorage.getItem('user')).id;
            var res = await axios.get(`http://localhost:8000/users/logout/${user_id}`);
            if (res.data.success===true) {
                setUser({id: undefined, name: undefined});
                window.localStorage.removeItem('user');
                navigate('/users/signin');
            }
        } catch(err) {
            console.log("error: ", err);
        }
    }
    const showNotes = () => {
        navigate('/notes/showNotes');
    }
    const onLogoutSuccess = () => {
        console.log("logout successful");
    }
    return (
        <div className='Profile'>
            <h1>profile</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={showNotes}>Show all notes</button>
            <GoogleLogout
                clientId={clientId}
                buttonText="Google Logout"
                onLogoutSuccess={onLogoutSuccess}
            />
        </div>
    );
}

export default Profile;