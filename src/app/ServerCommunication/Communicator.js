import { configureStore, createSlice } from "@reduxjs/toolkit";

const photoSlicer=createSlice({
    name:'photo',
    initialState:{categories:[],customerId:0,cart:[]},
    reducers:{
        addToCart:(state,action)=>{
            state.cart.push(parseInt(action.payload))
        },
        removeFromCart:(state,action)=>{
            const index=state.cart.indexOf(parseInt(action.payload));
            state.cart.splice(index,1);
        },
        addCustomerId:(state,action)=>{
            state.customerId=parseInt(action.payload);
        },
        addCategories:(state,action)=>{
            state.categories=action.payload;
        }
    }
});

export const photoStore=configureStore({reducer:{PhotoManager:photoSlicer.reducer}})

export const photoStatus=(state)=>{ return {id:state.customerId,cart:state.cart}};

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