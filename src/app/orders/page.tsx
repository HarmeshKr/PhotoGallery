"use client";
import { useEffect } from "react";
import { photoStore } from "../ServerCommunication/Communicator";

export default function order(){

    useEffect(()=>{
        alert(JSON.stringify(photoStore.getState().PhotoManager.finalOrder));
    },[]);
    return(<div className="container">
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
            <div className="form-group mt-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control"/>
            </div>
            <div className="form-group mt-3">
                <label className="form-label">Card Holder Name</label>
                <input type="text"  className="form-control"/>
            </div>
            <div className="row mt-3">
                <div className="col-md-6">
                    <select className="form-select">
                        <option selected disabled value=''>Vaid Upto Month</option>
                        <option>January</option>
                        <option>February</option>
                        <option>March</option>
                        <option>April</option>
                        <option>May</option>
                        <option>June</option>
                        <option>July</option>
                        <option>August</option>
                        <option>September</option>
                        <option>October</option>
                        <option>November</option>
                        <option>December</option>
                    </select>
                </div>
                <div className="col-md-6">
                <select className="form-select">
                        <option key='91' selected disabled value=''>Vaid Upto Year</option>
                        <option  key='81'>2023</option>
                        <option  key='19'>2024</option>
                        <option  key='13'>2025</option>
                        <option  key='16'>2026</option>
                        <option  key='34'>2027</option>
                        <option  key='13'>2028</option>
                        <option  key='11'>2029</option>
                        <option  key='21'>2030</option>
                </select>
                </div>
                
            </div>
        </div>
        <div className="col-md-3"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-2">
            <div className="form-group mt-3">
                <label className="form-label">CVV</label>
                <input type="number"  className="form-control"/>
            </div>    
        </div>
        <div className="col-md-7"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-2">
            <div className="form-group mt-3">
                <button className="btn btn-primary">Place Order</button>
            </div>    
        </div>
        <div className="col-md-7"></div>
        </div>
    </div>);
}