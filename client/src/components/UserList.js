import React from "react";
import "./UserList.scss";
import UserListItem from "./UserListItem";


export default function UserList(props) {


    

    const list = props.users.map((users,index) => {
        return (
            <UserListItem
              key={index}
              id={users.id}
              firstname={users.first_name}
              lastname={users.last_name}
              ondelete={props.ondelete}
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