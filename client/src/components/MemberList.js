import React from "react";
import "./MemberList.scss";
import MemberListItem from "./MemberListItem";
import unselectedUserListItem from "./UnselectedUserListItem";
import Popup from "reactjs-popup";
import UnslectedUserListItem from "./UnselectedUserListItem";
import UsersPage from "./UsersPage";



export default function MemberList(props) {
    console.log("props", props)
    
    const list = props.members.map((members,index) => {
        return (
            <MemberListItem
              key={index}
              groupmembersid={members.groupmembers_id}
              id={members.id}
              memberfirstname={members.first_name}
              memberlastname={members.last_name}
              ondeletegroupmember={props.ondeletegroupmember}
            />
        );
    });

    const unselectedUsersList = props.unselectedUsers.map((users,index) => {
        return (
            <UnslectedUserListItem
                key={index}
                id = {users.id}
                firstname={users.first_name}
                lastname={users.last_name}
                addmember={props.addmember}
                selectedgroup={props.selectedgroup}
            />

        )
    });
        return (
    

        <div>
            <h1>List of {props.selectedgroup} members</h1>
            <div className="members-list">{list}</div>
            <Popup trigger={<button className="add-member"> Add Member</button>} position="right">
            <div className="unselected-users-list">{unselectedUsersList}</div>
            </Popup>
        </div>
        )
}