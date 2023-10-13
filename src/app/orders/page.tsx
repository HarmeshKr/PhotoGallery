"use client";
import { useEffect, useState } from "react";
import { cartDetails,isUserLoggedIn,placeOrder } from "../ServerCommunication/Communicator";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"
export default function Ordering(){

    const loggedInUser=useSelector(isUserLoggedIn);

    const cart=useSelector(cartDetails)||[];
    var [total,setTotal]=useState(0);
    var [_user,setUser]=useState({cardHolderName:'',cardNumber:'',cvv:'',month:'',year:''});
    const router=useRouter();
    const dispatch=useDispatch();

    const userDetails=(e,flag)=>{
        var temp=_user;
        if(flag==1){
            temp.cardHolderName=e.target.value;
        }else if(flag==2){
            temp.cardNumber=e.target.value;
        }else if(flag==3){
            temp.month=e.target.value;
        }else if(flag==4){
            temp.year=e.target.value;
        }else if(flag==5){
            temp.cvv=e.target.value;
        }
        setUser(temp);
    }
    const PlaceOrder=(e)=>{
        //alert(JSON.stringify(user));
        let userData={
            customerId:loggedInUser,
            user:_user
        };
        dispatch(placeOrder(userData)).then(c=>{
            let json=JSON.stringify(c);
            sessionStorage.setItem('invoice',json);
            router.push('/invoice');
        });
    }

    
    useEffect(()=>{
       let result=0;
        for(let c of cart){
            result+=c.photoPrice*c.quantity;
        };
        setTotal(result);
    },[]);

    return(<div className="container">
        <div className="row mt-3">
        <div className="col-md-6">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="tdheader">Photo</th>
                        <th className="tdheader">Name</th>
                        <th  className="tdheader">Price</th>
                        <th  className="tdheader">Quantity</th>
                        <th className="tdheader">Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(c=><tr key={c._id}>
                            <td className="tdstyle"><img src={`http://localhost:3031/Images/${c.photo}`} width="120" height="70" alt={c.photo} /></td>
                            <td className="tdstyle">{c.name}</td>
                            <td className="tdstyle">{c.photoPrice}</td>
                            <td className="tdstyle">{c.quantity}</td>
                            <td className="tdstyle">{c.photoPrice * c.quantity}</td>
                        </tr>)
                        
                    }   
                    <tr>
                        <td style={{textAlign:'right',fontWeight:'bold',color:'red'}} colSpan={4}>Total</td>    
                        <td  className="tdstyle" style={{fontWeight:'bold',color:'red'}}>{total}</td>
                    </tr>  
                </tbody>
            </table>
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-5">
        <div className="form-group mt-3">
                <h3 className="form-label text-primary">Payment Details</h3>
                
            </div>
            <div className="form-group mt-3">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-control" onBlur={e=>userDetails(e,2)}/>
            </div>
            <div className="form-group mt-3">
                <label className="form-label">Card Holder Name</label>
                <input type="text"  className="form-control"  onBlur={e=>userDetails(e,1)}/>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <select className="form-select"  onChange={e=>userDetails(e,3)}>
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
                <select className="form-select"   onChange={e=>userDetails(e,4)}>
                        <option key='91' selected disabled value=''>Vaid Upto Year</option>
                        <option  key='81'>2023</option>
                        <option  key='19'>2024</option>
                        <option  key='13'>2025</option>
                        <option  key='16'>2026</option>
                        <option  key='34'>2027</option>
                        <option  key='10'>2028</option>
                        <option  key='11'>2029</option>
                        <option  key='21'>2030</option>
                </select>
                </div>
                
            </div>
            <div className="row mt-3">
                <div className="col-md-4">
                <div className="form-group">
                <label className="form-label">CVV</label>
                <input type="password"  className="form-control"   onBlur={e=>userDetails(e,5)}/>
            </div>    
                </div>
                <div className="col-md-6"></div>
            </div>
            <div className="row mt-3">
                <div className="col-md-8"></div>
                <div className="col-md">
                <button className="btn btn-primary" onClick={e=>PlaceOrder(e)}>Place Order</button>
                </div>
            </div>
        </div>
        <div className="col-md-3"></div>
        </div>
    </div>);
}