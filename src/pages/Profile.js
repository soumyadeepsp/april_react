import { useEffect, useState, useContext } from 'react';
import '../assets/css/Likes.css';
import axios from 'axios';
import AuthContext from '../context/authContext/authContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const {user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(async () => {
        if (user.id===undefined) {
            console.log(user);
            navigate('/users/signin');
        }
    }, []);
    const logout = async (e) => {
        try {
            var res = await axios.get('http://localhost:8000/users/logout');
            if (res.data.success==true) {
                setUser({id: undefined, name: undefined});
                navigate('/users/signin');
            }
        } catch(err) {
            console.log("error: ", err);
        }
    }
    const showNotes = () => {
        navigate('/notes/showNotes');
    }
    return (
        <div className='Profile'>
            <h1>profile</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={showNotes}>Show all notes</button>
        </div>
    );
}

export default Profile;