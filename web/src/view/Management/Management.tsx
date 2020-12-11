import React, {useEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router';
import { Toast, TOAST_FAILURE, TOAST_SUCCESS } from '../Common/Toasts/Toast';
import { FetchModal } from '../FetchModal/FetchModal';
import axios from "axios";
import {all} from "../../urls";

interface Data {
    date : string,
    countryName : string,
    totalDeathCases : number,
    totalCases : number,
    totalRecovered : number,
    user : {
        username : string
    }
}

export function Management() {

   const history = useHistory();
   const location = useLocation();
   const [success,setSuccess] = useState(false);
   const [failure,setFailure] = useState(false);
   const [userMessage,setUserMessage] = useState("");
   const [data,setData] = useState<Data[]>();

   function fetch() {
        axios.get(all())
        .then((res) => {
            if(!!res.data) {
                setData(res.data as Data[]);
            }
        })
        .catch((error)=> {

        })
   }

   useEffect(()=> {
    fetch();
   },[])

    return (
        <>
        <div className="flex-shrink-0">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 col-md-7">
                        <h5 className="font-weight-bold mt-1 mb-1">Fecth Latest Updates</h5>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-lg-8 col-sm-6 mb-2">
                        <input type="text" className="form-control" placeholder="Search"/>
                    </div>
                    <div className="col-lg-4 col-sm-6">
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary w-100 bold-font" data-toggle="modal" data-target="#fetch-modal" onClick={()=>history.push("#fetch")}>
                                    <i className="fas fa-search-plus"></i>  Fetch Latest Updates</button>
                            </div>
                        </div>
                    </div>
                </div>
        <div className="row mt-3">
            <div className="col">
                <div className="card">
                    <div className="card-body p-2">
                        <div className="table-responsive border-0 p-0 shadow-none">
                            <table className="table table-borderless">
                                <thead>
                                <tr>
                                    <th className="width: 20%">Date</th>
                                    <th className="width: 20%">Country Name</th>
                                    <th className="width: 15%">Total Cases</th>
                                    <th className="width: 15%">Total Deaths</th>
                                    <th className="width: 15%">Recovered</th>
                                    <th className="width: 15%">Fetched By</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    !!data && 
                                        data.map((d : Data)=> {
                                            return (  
                                                <tr>
                                            <td><span className="responsive-mobile-heading">Date</span>{d.date.split('T')[0]}</td>
                                    <td><span className="responsive-mobile-heading">Country Name</span>{d.countryName}</td>
                                    <td><span className="responsive-mobile-heading">Total Cases</span>{d.totalCases}</td>
                                    <td><span className="responsive-mobile-heading">Total Deaths</span>{d.totalDeathCases}</td>
                                    <td><span className="responsive-mobile-heading">Total Recovered</span>{d.totalRecovered}</td>
                                    <td><span className="responsive-mobile-heading">Fetched By</span>{d.user?.username}</td> 
                                    </tr>);
                                        })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            !!location.hash && location.hash === "#fetch" &&
            <FetchModal
                success={(msg : any)=> {
                    setUserMessage(msg)
                    setSuccess(true)
                    fetch()
                }
                }
                failure={(msg:any)=> {
                    setUserMessage(msg)
                    setFailure(true)}}
             />
        }
        {
                success && <Toast type={TOAST_SUCCESS} message={userMessage}
                                  timeout={3000}/>
        }
        {
                failure && <Toast type={TOAST_FAILURE} message={userMessage}
                                  timeout={3000}/>
        }
    </div>
</div>
        </>
    );
}