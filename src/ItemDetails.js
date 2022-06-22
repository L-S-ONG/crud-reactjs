/* eslint-disable jsx-a11y/anchor-is-valid */
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
 
function ItemDetails()
{
    // const [search, setSearch] = useState('');
    const [record, setRecord] = useState([]);
 
    const [item, setItem] = useState({
        name: "",
        price: ""
    });
  
    //  Object Destructuring 
    const { name, price } = item;
    const onInputChange = e => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };
     
    // On Page load display all records 
    const loadItemDetails = async () =>  
    {
      var response = fetch('http://localhost:7000/api/menu/items')
         .then(function(response){
            return response.json();
          })
         .then(function(myJson) {
            setRecord(myJson);
          });
    }
    useEffect(() => {
        loadItemDetails();
    }, []);
    
    // Insert Item Records 
    const submitItemDetail = async (e) => {
        e.preventDefault();
        e.target.reset();
        await axios.post('http://localhost:7000/api/menu/items' , item);
        alert('Data Inserted');
            
        loadItemDetails();
    };

    // Delete Item Record
    const deleteRecord = (productId) =>
    {
        axios.delete(`http://localhost:7000/api/menu/items/${productId}`)
        .then((result)=>{
            loadItemDetails();
        })
        .catch(()=>{
            alert('Error in the Code');
        });
    };

  return(
    <section>  
     <nav className="navbar navbar-expand-lg navbar-light bg-dark">
     <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
       <li className="nav-item active ">
          sssssssss
        </li>
        <li className="nav-item active">
          <a className="nav-link text-white" href="#">Hunkle</a>
        </li>
      </ul>
     </div>
    </nav>   
   
    <div className="container">  
    <h4 className="mb-3 text-center mt-4">Item Lists</h4>
      <div className="row mt-3">
       <div className="col-sm-4">
          <div className="box p-3 mb-3" style={{border:"1px solid #d0d0d0"}}>
            <form onSubmit={ submitItemDetail }> 
            <h5 className="mb-3 ">Add new item</h5>
                <div className="form-group">
                   <input type="text" className="form-control  mb-4" name="name" value={name} onChange={e => onInputChange(e)}  placeholder="Name of product" required=""/>
                </div>
     
                <div className="form-group">
                   <input type="text" className="form-control mb-4" name="price" value={price} onChange={e => onInputChange(e)}  placeholder="Price" required=""/>
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">Insert Record</button>
             </form>
        </div>
      </div>
      <div className="col-sm-8">
        {/* <div className="input-group mb-4 mt-3">
          <div className="form-outline">
           <input type="text" id="form1" onChange={(e)=>setSearch(e.target.value)} className="form-control" placeholder="Search Employee Here" style={{backgroundColor:"#ececec"}}/>
        </div>
        <button type="button" onClick={searchRecords}  className="btn btn-success">
            <i className="fa fa-search" aria-hidden="true"></i>
        </button>
        </div>   */}
        <table className="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
     
            {record.map((item)=>
                <tr>
                    <td key={item}>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <a className="text-danger mr-2"
                            onClick={() => {
                            const confirmBox = window.confirm(
                                "Do you really want to delete "+ item.name
                            )
                            if (confirmBox === true) {
                                deleteRecord(item.id)
                            }
                            }}>
                            <Icon.Trash style={{fontSize:"18px", marginRight:"10px", cursor:"pointer"}} />
                        </a>
                        <Link className=" mr-2" to={`/ItemEdit/editID/${item.id}`}>
                            <Icon.Pencil style={{fontSize:"18px", cursor:"pointer"}} aria-hidden="true" /> 
                        </Link>
                    </td>
                </tr>
                )} 
            </tbody>
        </table>
      </div>
      </div>
    </div>
   </section>
  )
}
 
export default ItemDetails;