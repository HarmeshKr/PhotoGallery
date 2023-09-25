"use client";

import { useEffect, useState } from "react";

export function Login(props){
    return(<div>
        <label>User Id</label>
        <br/>
        <input type="text"  onChange={e=>props.changeuid(e.target.value)}/>
        <br/>
        <label>Password</label>
        <br/>
        <input type="password" onChange={e=>props.changepwd(e.target.value)}/>
        <br/>
        <button onClick={props.login}>Login</button>
        <br/>
        <span style={{color:'red'}}>{props.message}</span>
    </div>);
}

export default function Validation(){
    var [msg,setMessage]=useState('');   
    var config={uid:'',pwd:'',changeuid:null,changepwd:null,login:null,message:msg};
    
    config.changeuid=(e:string)=>{ config.uid=e; };
    config.changepwd=(e:string)=>{config.pwd=e;};
    config.login=(e:any)=>{
        if(config.uid=='john' && config.pwd=='123')
            config.message='Success..'
        else
            config.message='Login Failed..';
            
            setMessage(config.message);
    };
    return(<div>
        <h3>Type John &nbsp; &nbsp; &nbsp; 123</h3>
        <Login {...config}></Login>
    </div>);
}