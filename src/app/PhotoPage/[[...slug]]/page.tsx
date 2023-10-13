"use client";
import { fetchPhotosByCategory } from "@/app/ServerCommunication/Communicator";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DialogBox} from '@/app/DialogBox'
import { useParams } from 'next/navigation';
const {Modal} = require('bootstrap/dist/js/bootstrap.bundle.min.js');
export default function Photos({ params }: { params: { slug: string } }){
   
    var dialogue={
        message:'Add to Cart?',
        title:'Add To Cart Confirmation',
        yesText:'Yes',
        noText:'No',
        response:(k)=>{}
    };
    var [dialogData,setData]=useState(dialogue);
    const options={backdrop:'static',focus:true,keyboard:true}
    var myModal='';
    let id=0;
    const dispatch=useDispatch();
    const pr=useParams();
    var [photos,setPhotos]=useState([]);
    useEffect(()=>{  
     dispatch(fetchPhotosByCategory(parseInt(pr.slug))).then(r=>setPhotos(r));
    },[pr.slug]);
  
    
    const addToCart=(e,p)=>{
        /* 
          //if bootstrap js cdn link is used, use the following line. No import required.
             myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), options);
        */
         myModal = new Modal(document.getElementById('staticBackdrop'), options);
        dialogue.response=(a)=>{
            let load={...p,quantity:1};
            dispatch({type:'photo/addToCart',payload:load});
            myModal.hide();
        };
        setData(dialogue);
        myModal.show();
    };

    return(<div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {
                   photos.map(p=> <div key={p.name} className="col"> 
                        <div className="card border-dark mt-2">
                            <img src={`http://localhost:3031/Images/${p.photo}`} className="card-img-top" alt={p.photo} />
                        <div className="card-body">
                            <h3 className="card-title">{p.name}</h3>
                            <h4 className="card-text">{p.photoPrice}</h4>
                        </div>
                        <div className="card-footer">
                           
                            <button onClick={e=>addToCart(e,p)}
                            className="btn btn-primary float-end">Add To Cart</button>
                            <DialogBox {...dialogData}/>
                        </div>
                        </div>
                    </div>
                )}
                </div>
        </div>        
        <div className="col-md-2"></div>
    </div>);
}