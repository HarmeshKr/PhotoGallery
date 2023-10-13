import { configureStore, createSlice } from "@reduxjs/toolkit";

const photoSlicer=createSlice({
    name:'photo',
    initialState:{categories:[],customerId:'0',cart:[]},
    reducers:{
        addToCart:(state,action)=>{
            state.cart.push(action.payload);
        },
        removeFromCart:(state,action)=>{
            const index=state.cart.findIndex((v,i)=>v._id==action.payload)
            state.cart.splice(index,1);
        },
        setQuantity:(state,action)=>{ 
            
            let obj=state.cart.find(p=>p._id==action.payload.id)
            obj.quantity=action.payload.qty;
        },
        addCustomerId:(state,action)=>{
            state.customerId=action.payload._id;
        },
        addCategories:(state,action)=>{
            state.categories=action.payload;
        },
        clean:(state,action)=>{
            state.cart=[];
            state.customerId='0';
            sessionStorage.clear();
        }
    }
});

export const photoStore=configureStore({reducer:{PhotoManager:photoSlicer.reducer}})

export const photoStatus=(state)=>{ 
    let cid=state.PhotoManager.customerId;
    let photoIds=state.PhotoManager.cart.map(c=>c._id);
    return photoIds;
};
export const isUserLoggedIn=(state)=>state.PhotoManager.customerId;
export const cartDetails=(state)=>state.PhotoManager.cart;
export const categorySelector=(state)=>state.PhotoManager.categories;

export const fetchCategories=()=>async(dispatch,getState)=>{
    const response=await window.fetch('http://localhost:3031/categories',{method:'GET'});
    const json=await response.json();
    dispatch({type:'photo/addCategories',payload:json});
}
export const fetchPhotosByCategory=(id)=>async(dispatch,getState)=>{
    const response=await window.fetch(`http://localhost:3031/photos/${id}`,{method:'GET'});
    const json=await response.json();
    return json;
}
export const fetchCartPhotos=(photoid)=>async(dispatch,getState)=>{
   try{
    const response=await window.fetch(`http://localhost:3031/cart`,{headers:{'Content-Type':'application/json'},method:'POST',body:JSON.stringify(photoid)});
    let json=await response.json();
    return json;
   }
   catch(e){
           console.log(e.message);
   }
}

export const placeOrder=(data)=>async(dispatch,getState)=>{
 try{
    let cart=getState().PhotoManager.cart;
    let d={...data,cart};
    const response=await window.fetch('http://localhost:3031/order',{headers:{'Content-Type':'application/json'},method:'POST',body:JSON.stringify(d)});
    let json=await response.json();
    return {...json,cart};
 }
 catch(e){console.log(e.message);}
}


export const userValidation=(userData)=>async(dispatch,getState)=>{
    try{
        
       const response=await window.fetch('http://localhost:3031/login',{headers:{'Content-Type':'application/json'},method:'POST',body:JSON.stringify(userData)});
       let json=await response.json();
       return json;
    }
    catch(e){return e.message;}
   }