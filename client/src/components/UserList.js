import React, { useState, useEffect, useContext } from "react";
import "./UserList.scss";
import axios from "axios";
import UserListItem from "./UserListItem";


export default function UserList(props) {

    const [state, setState] = useState([])


    useEffect(() => {
        console.log("this is state before the call", state)
        axios
          .get(`http://localhost:3000/users`)
          .then(response => {
              console.log("this is the state", state)
            return setState(response.data);
          });
    
      });
    

    const list = state.map(user => {
        return (
            <UserListItem
              key={user.id}
              firstname={user.first_name}
              lastname={user.last_name}
            />
        );
    });
        return <div className="user-list">{list}</div>;
}