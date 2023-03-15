import {useState} from 'react';
import './App.css';
import Note from './components/Note';
import axios from "axios";
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';
import AuthState from './context/authContext/authState';
import AuthContext from './context/authContext/authContext';
import ShowSingleNote from './components/ShowSingleNote';

function App() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  function changeName(e) {
    setName(e.target.value);
  }
  const changeAbout = (e) => {
    setAbout(e.target.value);
  }
  const callApi = async (e) => {
    // make api call
    //asynchronous api call
    axios({
      url: "http://localhost:8000/users/upload_notes",
      method: "POST",
      params: { 
        name: name,
        about: about,
        id: '63fb675d396732f99f4d0a2f'
      }
    })  
      .then((res) => {console.log(res);})  
      .catch((err) => {console.log(err);});
    //synchronous api call using async await
    try {
      var res = await axios.get('https://dog.ceo/api/breeds/image/random');
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }
  var arr = [{
    title:"Physics", likes:"2", views:"3"
  }, {
    title:"Chemistry", likes:"1", views:"10"
  }, {
    title:"Maths", likes:"0", views:"7"
  }, {
    title:"Biology", likes:"6", views:"7"
  }];
  return (
    <AuthState>
      <div className="App">
      {name}
      {console.log('hello world')}
      <BrowserRouter>
          <Routes>
              <Route path="/" element={
                <form onSubmit={(event) => event.preventDefault()} enctype='multipart/form-data'>
                <input onChange={changeName} id='name_input' type='text' name='name' placeholder='Your name'></input>
                <input onChange={changeAbout} type='text' name='about' placeholder='About your note'></input>
                <input type='file' name='note'></input>
                <input onClick={callApi} id='submit' type='submit' value='Upload'></input>
              </form>
              }/>
              <Route path="/users/signup" element={<SignupForm/>}/>
              <Route path="/users/signin" element={<SigninForm/>}/>
              <Route path="/users/profile" element={<Profile/>}/>
              <Route path='/notes/showNotes' element={<ShowSingleNote/>}/>
          </Routes>
      </BrowserRouter>
      {/* entire website lies here inside App div */}
      {arr.map(function(item) {
        return <Note title={item.title} likes={item.likes} views={item.views}/>
      })}
      {(6>5) ? "hello" : "world"}
      {/* <Note title="Chemistry" likes="1" views="10"/>
      <Note title="Maths" likes="0" views="7"/>
      <Note title="Biology" likes="6" views="7"/> */}
    </div>
    </AuthState>
  );
}

export default App;