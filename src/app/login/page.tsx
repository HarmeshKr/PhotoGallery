"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userValidation } from "../ServerCommunication/Communicator";
import { useRouter } from "next/navigation";

export function Login(props){
    return(<div className="container">
        <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
            <img src="http://localhost:3031/Images/Login.jpg" alt="login" />
        </div>
        <div className="col-md-4"></div>
        </div>
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
            <label  className="form-label">User Email ID</label>
                <br/>
                <input type="text"  className="form-control"  onBlur={e=>props.changeuid(e.target.value)}/>
                <br/>
                <label className="form-label">Password</label>
                <br/>
                <input type="password"  className="form-control" onBlur={e=>props.changepwd(e.target.value)}/>
                <br/>
                <button className="btn btn-primary" onClick={props.login}>Login</button>
                <br/>
                <span style={{color:'red'}}>{props.message}</span>
                    </div>
            <div className="col-md-4"></div>
        </div>
        
    </div>);
}

export default function Validation(){
    const dispatch=useDispatch();
    const router=useRouter();
    var [msg,setMessage]=useState('');   
    var [{em,pass},setCred]=useState({em:'',pass:''}); 
    var config={uid:'',pwd:'',changeuid:()=>{},changepwd:()=>{},login:()=>{},message:msg};
    
    config.changeuid=(e:string)=>{ 
        config.uid=e; 
        em=e;
        setCred({em,pass});
    };
    config.changepwd=(e:string)=>{
        config.pwd=e;
        pass=e;
        setCred({em,pass});
    };
    config.login=(e:any)=>{
        let user={email:em,password:pass};
        dispatch(userValidation(user)).then(r=>{
            if(r.length==0){
                setMessage('Invalid UserName or Password..');
            }
            else
            {
                let id=r[0];
                dispatch({type:'photo/addCustomerId',payload:id})
                router.push("/orders");
            }

        });
    };

    return(<Login {...config}></Login>);
}