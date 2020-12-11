import React from "react";


export function SideBarNavigation () {
    return (
        <ul className="sidebar-list">
            <li className="sidebar-list__item">
                <a href={"statistics"} className="sidebar-list__item-link">
                    <span className="sidebar-list__item-link--text">Statistics</span>
                </a>
            </li>
            {
                localStorage.getItem("role") === "ADMIN" && 
                <li className="sidebar-list__item">
                    <a href={"management"} className="sidebar-list__item-link">
                        <span className="sidebar-list__item-link--text">Management</span>
                    </a>
                </li>
            }
        </ul>
    );
}
