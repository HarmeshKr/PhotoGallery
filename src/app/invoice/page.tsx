"use client";
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";

export default function InvoiceComponent(){
   
   const dispatch=useDispatch(); 
   var [obj,setCart]=useState({cart:[],total:0,invoiceId:'',orderId:'',orderDate:null,customer:{name:'',email:'',contactNo:''}} );

   useEffect(()=>{
        let str=sessionStorage.getItem('invoice')?? '';
        let temp=JSON.parse(str);
        
        let st={...obj};
        temp.cart.map(a=>st.total+=parseInt(a.photoPrice)*parseInt(a.quantity));
        st.cart=temp.cart;
        st.customer=temp.customer[0],
        st.orderId=temp.orderId;
        st.invoiceId=temp.invoiceId;
        st.orderDate=new Date(temp.orderDate);
        setCart(st);
        dispatch({type:'photo/clean',payload:null});
   },[]);
    return(<div className="container">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 text-center">
                <h2>Invoice</h2>
            </div>
            <div className="col-md-4"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
            <div className="col-md-3"><h5>Customer Name</h5> </div>
            <div className="col-md-3">{obj.customer.name}</div>
            <div className="col-md-3"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
            <div className="col-md-3"><h5>Customer Email</h5> </div>
            <div className="col-md-3">{obj.customer.email}</div>
            <div className="col-md-3"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
            <div className="col-md-3"><h5>Customer Contact No</h5> </div>
            <div className="col-md-3">{obj.customer.contactNo}</div>
            <div className="col-md-3"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
            <div className="col-md-3"><h5>order Id</h5> </div>
            <div className="col-md-3">{obj.orderId}</div>
            <div className="col-md-3"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
            <div className="col-md-3"><h5>Invoice Id</h5> </div>
            <div className="col-md-3">{obj.invoiceId}</div>
            <div className="col-md-3"></div>
        </div>
        <div className="row">
        <div className="col-md-3"></div>
            <div className="col-md-3"><h5>Order Date</h5> </div>
            <div className="col-md-3">{obj.orderDate?.toLocaleDateString('en-in') }</div>
            <div className="col-md-3"></div>
        </div>
        
        <div className="row">
            <div className="col-md-3"></div>
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
                        obj.cart.map(c=><tr key={c._id}>
                            <td className="tdstyle"><img src={`http://localhost:3031/Images/${c.photo}`} width="120" height="70" alt={c.photo} /></td>
                            <td className="tdstyle">{c.name}</td>
                            <td className="tdstyle">{c.photoPrice}</td>
                            <td className="tdstyle">{c.quantity}</td>
                            <td className="tdstyle">{c.photoPrice * c.quantity}</td>
                        </tr>)
                    }   
                    <tr>
                        <td style={{textAlign:'right',fontWeight:'bold',color:'red'}} colSpan={4}>Total</td>    
                        <td  className="tdstyle" style={{fontWeight:'bold',color:'red'}}>{obj.total}</td>
                    </tr>  
                </tbody>
            </table>
            </div>
            <div className="col-md-3"></div>
        </div>
    </div>)
}