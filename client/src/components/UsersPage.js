import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersPage.scss";
import UserList from "./UserList";
import { Link } from "react-router-dom";




export default function UsersPage(props) {
    const [name, setName] = useState({
        firstname:"",
        lastname:""
    });
    const [users, setUsers] = useState([])
   
    //tracker is for mananging the useEffect so we don't end up on infinite loops
    const [tracker, setTracker] = useState(0)

    function update() {
      axios
        .get(`http://localhost:3000/users`)
        .then(res => {
            setUsers(res.data)
        });
    }
    
    function onDelete(ev,user) {
        ev.preventDefault();
        axios
        .delete(`http://localhost:3000/users`, { data: { user_id: user } }).then(response => {
            setTracker(tracker+1)
        })
    }
    
    const createUser = function(user) {
        return axios.post(`http://localhost:3000/users`, user).then(res =>{
            setTracker(tracker+1)
        });
    };

    const modify = function (modifiedName) {
        return axios.put(`http://localhost:3000/users`, modifiedName).then(res =>{
            setTracker(tracker+1)
        })

    }
    
    function onSave(ev) {
        ev.preventDefault();
        createUser(name)
        setName({...name,
            firstname:"",
            lastname:""})
    
    }

    useEffect(() => {
        update()
        },[tracker])


    return (
        <div className="wrapper">
        <div className="container">
          <div className="nav">
          <Link to="/">
          <button className="home-button">Home</button>
          </Link>
          <Link to="/groups">
          <button className="small-groups-button">Groups</button>
          </Link>
          </div>
          <div className="user-form">
            <form autoComplete ="off" onSubmit={event => onSave(event)}>
                <input
                type="text"
                className="input-field"
                placeholder="first name"
                value={name.firstname}
                onChange={event =>
                    setName({ ...name, firstname: event.target.value})
                }
                />
                <input
                type="text"
                className="input-field"
                placeholder="last name"
                value={name.lastname}
                onChange={event =>
                    setName({ ...name, lastname: event.target.value})
                }
                />
                <button className="create-user">Add User</button>
            </form>
          </div>
        <div className="user-list">
            <UserList onsave={onSave} ondelete={onDelete} modify={modify} users={users}/>
        </div>
        </div>
        </div>
    )
}
