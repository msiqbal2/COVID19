import React from "react";
import {SideBarHeader} from "./SideBarHeader";
import {SideBarNavigation} from "./SideBarNavigation";
import {SideBarFooter} from "./SideBarFooter";
import {useHistory} from "react-router";

export function SideBar () {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const history = useHistory();
    if(username === undefined || username === '' || username === null || role === undefined || role === '' || role === null) {
        history.push("/login");
    }

    return (
        <nav className="sidebar">
            <SideBarHeader/>
            <SideBarNavigation/>
            <SideBarFooter/>
        </nav>
    );
}
