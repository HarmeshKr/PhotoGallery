import Link from "next/link";
import {  useDispatch, useSelector } from "react-redux";
import { categorySelector, fetchCategories } from "./ServerCommunication/Communicator";
import {  useEffect } from "react";

export default function NavigationBar(){
  const dispatch=useDispatch();
  const categories=useSelector(categorySelector)||[];
    useEffect(()=>{
      dispatch(fetchCategories());
    },[]);
    
    return(<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">PhotoGallery</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Categories
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {
                categories.map((c:any)=><li key={c.categoryId}><Link href={`/PhotoPage/${c.categoryId}`} className="dropdown-item">{c.name}</Link></li>)
              }
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
          </li>
        </ul>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-light" type="submit">Search</button>
          <Link href='/cart' className="btn btn-light ms-2 bg-warning">Cart</Link>
        </form>
        
      </div>
    </div>
  </nav>);
}