import React from "react";
import "./LandingPage.scss";
import { BrowserRouter as Link } from "react-router-dom";


export default function HomePage(props) {
    return (
        <div className="container">
            <div className="links-container">
            <Link to="users">
              <button className="users-button">
                Users
              </button>
            </Link>
            <Link to="groups">
            <button className="groups-button">
                Groups
              </button>
            </Link>
            </div>
        </div>
    )
}