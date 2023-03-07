import {button, useEffect, useState} from 'react';
import '../assets/css/Note.css';
import Likes from './Likes';
import Views from './Views';

function Note(props) {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState("");
  useEffect(() => {
    console.log("hello world!");
  }, [description]);
  function changeTitle() {
    // title = "Hello World";
    setTitle("Hello World");
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