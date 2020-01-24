import React from "react";
import "./MemberList.scss";
import MemberListItem from "./MemberListItem";


export default function MemberList(props) {

    console.log("props", props)
    
    const list = props.members.map((members,index) => {
        return (
            <MemberListItem
              key={index}
              id={members.id}
              memberfirstname={members.first_name}
              memberlastname={members.last_name}
              ondeletegroupmember={props.ondeletegroupmember}
            />
        );
    });
        return (

        <div>
            <h1>List of members</h1>
            <div className="members-list">{list}</div>
        </div>
        )
}