import {button, useEffect, useState, useContext} from 'react';
import '../assets/css/Note.css';
import Likes from './Likes';
import Views from './Views';
import authContext from '../context/authContext/authContext';

function Note(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState("");
  const obj = useContext(authContext);
  useEffect(() => {
    console.log("hello world!");
  }, [description]);
  function changeTitle() {
    // title = "Hello World";
    console.log(obj.a);
    setTitle(obj.a);
    console.log(title);
  }
  return (
    <div className="Note">
        <h1>{title}</h1>
        {/* <Likes/> */}
        <Likes likes={props.likes}/>
        <Views views={props.views}/>
        <button onClick={changeTitle}>changetitle</button>
      {/* entire Note component elements lie here inside Note div */}
    </div>
  );
}

export default Note;