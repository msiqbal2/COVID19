import React, {useState} from 'react';
import {useHistory} from "react-router";
import axios from "axios";
import {fetch, save} from "../../urls";

export function FetchModal({success,failure} : {success : any,failure: any}) {

    const history  = useHistory();
    const[onClose,setOnClose] = useState(false);
    const[fetching,setFetching] = useState(false);
    const[saving,setSaving] = useState(false);
    const[countryName,setCountryName] = useState<string>("Italy");
    const[date,setDate] = useState<string>();
    const[deaths,setDeaths] = useState<number>(0);
    const[cases,setCases] = useState<number>(0);
    const[recovered,setRecovered] = useState<number>(0);
    const[username,setUsername] = useState<string>("");

    function onFetching() {
        if(!!countryName && !!date) {
            setFetching(true);
            axios.post(fetch(),{
                date : date,
                countryName : countryName
            })
                .then((res) => {
                    if(res.status === 200 && !!res && !!res.data) {
                        setCases(res.data?.totalCases);
                        setDeaths(res.data?.totalDeathCases);
                        setRecovered(res.data?.totalRecovered);
                    } else {
                        failure("Failed to fetched!")
                    }
                    setFetching(false);
                })
                .catch((error) => {
                    console.log("Error",error)
                    setFetching(false);
                    failure("Failed to fetched!")
                })
        } else {
            failure("Please provide country name and date!")
        }
    }

    function onSave() {
        if(!!countryName && !!date) {
            let us = localStorage.getItem("username");
            setUsername(us || "");
            setSaving(true);
            axios.post(save(),{
                date : date,
                countryName : countryName,
                totalDeathCases : deaths,
                totalCases : cases,
                totalRecovered : recovered,
                user : {
                    username : username
                }
            })
            .then((res) => {
                    if(res.status === 200 && !!res && !!res.data) {
                        if(res.data) {
                            success("Saved snapshot!")
                        } else {
                            failure("Failed to save Snapshot!")
                        }
                    } else {
                        failure("Failed to save Snapshot!")
                    }
                    setSaving(false);
                })
                .catch((error) => {
                    console.log("Error",error)
                    setSaving(false);
                    failure("Failed to save Snapshot!")
                })
        } else {
            failure("Please provide country name and date!")
        }
    }

    return (
        <>
            <div className={!onClose ? "modal fade show d-block animated slideInDown" : "modal fade show d-block animated fadeOutUp"} id="add-new-notification-modal" tabIndex={-1}
                 aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel1">Fetching</h5>
                            <button onClick={()=> {
                                setOnClose(true)
                                history.goBack()
                            } } type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                                <div className="row">
                                    <div className="col-lg-6 mb-6 bold-font">Select Country </div>
                                    <div className="col-lg-6 mb-6 bold-font">Date</div>
                                </div>
                                <div className="row mb-6">
                                    <div className="col-sm-6">
                                        <select className="form-control"
                                        onChange={(e)=> {setCountryName(e.target.value)}}
                                        >
                                            <option value="Italy">ITALY</option>
                                            <option value="India">INDIA</option>
                                            <option value="USA">USA</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="date" 
                                            onChange={(e)=> setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <br/>
                                <div className="row">
                                    <div className="col-lg-4 mb-6 bold-font">Total Deaths </div>
                                    <div className="col-lg-4 mb-6 bold-font">Total Cases</div>
                                    <div className="col-lg-4 mb-6 bold-font">Total Recovered</div>
                                </div>
                                <div className="row mb-6">
                                    <div className="col-sm-4">
                                        <input className="form-control" type="number"
                                            onChange={(e)=> setDeaths(Number(e.target.value))}
                                            value={deaths}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <input className="form-control" type="number"
                                        onChange={(e)=> setCases(Number(e.target.value))}
                                        value={cases}
                                        />
                                    </div>
                                    <div className="col-sm-4">
                                        <input className="form-control" type="number"
                                        onChange={(e)=> setRecovered(Number(e.target.value))}
                                        value={recovered}
                                        />
                                    </div>
                                </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={()=> {
                                        setOnClose(true);
                                        history.goBack()}}
                            >Close</button>
                             <button type="button" className={!saving ? "btn btn-primary modal-footer__save-btn" : "btn btn-primary modal-footer__save-btn d-none"}
                                    onClick={()=> onSave()}>Save
                            </button>
                            <button type="button" className={!saving ? "btn btn-primary modal-footer__saving-btn d-none" : "btn btn-primary modal-footer__saving-btn"}><i
                                className="fas fa-spin fa-spinner"></i>&nbsp;Saving...
                            </button>
                            <button type="button" className={!fetching ? "btn btn-primary modal-footer__save-btn" : "btn btn-primary modal-footer__save-btn d-none"}
                                    onClick={()=> onFetching()}>Fetch
                            </button>
                            <button type="button" className={!fetching ? "btn btn-primary modal-footer__saving-btn d-none" : "btn btn-primary modal-footer__saving-btn"}><i
                                className="fas fa-spin fa-spinner"></i>&nbsp;Fetching...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}