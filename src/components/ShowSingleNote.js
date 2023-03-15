import { useContext, useEffect, useReducer } from "react";
import axios from 'axios';
import AuthContext from "../context/authContext/authContext";

function ShowSingleNote() {
    var file = "Guidelines for Investment Proof Submission - FY 2022-231677420625017.pdf";
    useEffect(async () => {
        try {
            
                var res = await axios.get(`http://localhost:8000/users/show_single_notes/${file}`);
                if (res.data.success==true) {
                    console.log(res.data.name+" "+res.data.about);
                }
            
        } catch(err) {
            console.log("error: ", err);
        }
    }, []);
    return (
        <div className="ShowSingleNote">
            <p>this is a note</p>
        </div>
    );
}

export default ShowSingleNote;