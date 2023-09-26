import { configureStore, createSlice } from "@reduxjs/toolkit";

export class CartInfo{
    constructor(public customerId:number,public cart:number[]){}
}
const photoSlicer=createSlice({
    name:'photo',
    initialState:new CartInfo(0,[]),
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
        }
    }
});

export const photoStore=configureStore({reducer:{PhotoManager:photoSlicer.reducer}})

export const photoStatus=(state:CartInfo)=>{ return {id:state.customerId,cart:state.cart}};