import React, { useState, useEffect, useContext } from "react";
import "./UserList.scss";
import axios from "axios";
import UserListItem from "./UserListItem";


export default function UserList(props) {

    const [state, setState] = useState([])


    useEffect(() => {
        axios
          .get(`http://localhost:3000/users`)
          .then(response => {
            return setState(response.data);
          });
    
      },[state]);
    

    const list = state.map(user => {
        return (
            <UserListItem
              id={user.id}
              firstname={user.first_name}
              lastname={user.last_name}
            />
        );
    });
        return (

        <div>
            <h1>List of Users</h1>
            <div className="user-list">{list}</div>
        </div>
        )
}