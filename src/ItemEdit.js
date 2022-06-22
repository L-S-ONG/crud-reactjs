import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function ItemEdit() {
  let history = useNavigate(); //The useHistory hook gives you access to the history instance
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    price: ""
  });

  //  Object Destructuring 
  const { name, price } = item;
  const onInputChange = e => {
      setItem({ ...item, [e.target.name]: e.target.value });
  };

  const updateItem = async e => {
    e.preventDefault();
    // Issues with Backend logic retrieving based on ID
    // Supposed to use http://localhost:7000/api/menu/items/${id}, item}
    await axios.put(`http://localhost:7000/api/menu/items/2`, item);
    history("/");
  };

  // On Page load display all records 
  const loadItemDetail = async () => 
  {
    // Issues with Backend logic retrieving based on ID
    // Supposed to use http://localhost:7000/api/menu/items/${id}
    fetch(`http://localhost:7000/api/menu/items/2`)
      .then((response) => response.json())
      .then((result) => {
          console.log(result);
          setItem({
              id: id,
              update: true,
              name: result.name,
              price: result.price
          });
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    loadItemDetail();
  }, []);

return (
  <div className="container">
   <div className="row mt-4"> 
    <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
      <h4 className="text-center mb-4">Edit item</h4>
     
        <h5 className="text-success">Item ID : {id} </h5>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Product Name"
            name="name"
            value={item.name}
            onChange={e => onInputChange(e)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Enter Product Price"
            name="price"
            value={price}
            onChange={e => onInputChange(e)}
          />
        </div>
        <button onClick={updateItem} className="btn btn-secondary btn-block">Update Item</button>
     
     </div>
    </div> 
  </div>
);
};
     
export default ItemEdit;