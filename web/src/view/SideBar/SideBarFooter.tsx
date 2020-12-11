import React, {useState} from "react";
import {useHistory} from "react-router";

export function SideBarFooter () {

    const history = useHistory();
    const[settingsClick,setSettingsClick] = useState(false);

    return (
        <div className="sidebar-footer">
            <div className="row no-gutters">
                <div className="col-sm-8">
                </div>
                <div className="col-sm-4 text-right d-sm-block d-none">
                    <div className="dropup">
                        <a className="nav-link dropdown-toggle" href="#" id="user-dropdown" data-toggle="dropdown"

                           onClick={()=> {
                               if(!settingsClick) setSettingsClick(true)
                               else setSettingsClick(false)
                           }}

                           aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-cog fa-lg"></i>
                        </a>
                        <div className={settingsClick ? "dropdown-menu show" : "dropdown-menu"} aria-labelledby="user-dropdown">
                            <a className="dropdown-item"><i
                                className="fas fa-sign-out-alt"
                            onClick={()=> {
                                localStorage.clear();
                                history.push("/login")
                            }}
                            ></i> Log Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
