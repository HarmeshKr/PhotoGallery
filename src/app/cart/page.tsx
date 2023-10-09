"use client";
import { ReactReduxContext, useDispatch, useSelector } from "react-redux";
import { fetchCartPhotos, photoStatus } from "../ServerCommunication/Communicator";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Cart(){
    const router=useRouter();
    var [photos,setPhotos]=useState([{id:'',photo:'',price:0,quantity:0}]);
    const status=useSelector(photoStatus);
    const dispatch=useDispatch();
    const context=useContext(ReactReduxContext);
    useEffect(()=>{
        dispatch(fetchCartPhotos(status.cart)).then(ph=>{
            let temp=ph;
            temp.map(c=>{ return {id:c._id,photo:c.photo,price:c.photoPrice,quantity:0}});
            setPhotos(temp);
        })},[]);

    const remove=(id)=>{ 
        dispatch({type:'photo/removeFromCart',payload:id});
        
        dispatch(fetchCartPhotos(context.store.getState().PhotoManager.cart)).then(ph=> {
            let temp=ph;
            temp.map(c=>{ return {id:c._id,photo:c.photo,price:c.photoPrice,quantity:0}});
            setPhotos(temp);
        });

    }
    const setQuantity=(e,id)=>{
            let temp=photos;
            let index=temp.findIndex(f=>f._id==id);
            if(index!=-1)
            {
                temp[index].quantity=e.target.value;
                setPhotos(temp);
                alert(JSON.stringify(photos));
            }
            
    }
    const placeOrder=(e)=>{
        dispatch({type:'photo/finalizedOrder',payload:photos});
        router.push('/orders');
    }

    return(<div className="container">
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-7"></div>
        <div className="col-md-2">
            <button onClick={placeOrder} className="btn btn-success mt-2">Place Order</button>
        </div>    
        </div>
        <div className="row">
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
                        <div className="row">
                        <div className="col-md-9"></div> 
                            <div className="col-md-3">
                                <h5>Quantity</h5>
                                <select className="form-select" onChange={e=>setQuantity(e,p._id)}>
                                    {
                                        [1,2,3,4,5,6,7,8,9,10].map(i=><option key={i}>{i}</option>)
                                    }
                                </select>
                            </div>
                            
                        </div>

                </div>
                <div className="card-footer">
                        <button onClick={e=>remove(p._id)}
                            className="btn btn-primary float-end">Remove</button>
                </div>
            </div>)
        }
        </div>
        <div className="col-md-3"></div>
    </div>
    
    </div>);
}