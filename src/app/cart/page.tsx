"use client";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { fetchCartPhotos, photoStatus } from "../ServerCommunication/Communicator";
import { useContext, useEffect, useState } from "react";

export default function Cart(){
    var [photos,setPhotos]=useState([]);
    const status=useSelector(photoStatus);
    const dispatch=useDispatch();
    const context=useContext(ReactReduxContext);
    useEffect(()=>{
        dispatch(fetchCartPhotos(status.cart)).then(ph=>setPhotos(ph));
    },[]);

    const remove=(id)=>{ 
        dispatch({type:'photo/removeFromCart',payload:id});
        
        dispatch(fetchCartPhotos(context.store.getState().PhotoManager.cart)).then(ph=>setPhotos(ph));

    }

    return(<div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        {
            photos.map(p=> <div key={p._id} className="card mb-3" style={{maxWidth: '540px'}}>
                <div className="card-header">
                        <img src={`http://localhost:3031/Images/${p.photo}`} className="card-img" alt={`${p.photo}`}/>
                </div>
                <div className="card-body">
                        <h2 className="card-title">{p.name}</h2>
                        <h3 className="card-text text-danger">{p.photoPrice}</h3>
                </div>
                <div className="card-footer">
                        <button onClick={e=>remove(p._id)}
                            className="btn btn-primary float-end">Remove</button>
                </div>
            </div>)
        }
        </div>
        <div className="col-md-3"></div>
    </div>);
}