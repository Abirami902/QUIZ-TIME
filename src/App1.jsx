
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App1() {
  // State variables
  const [url, seturl] = useState("");
  const [Product_Name, setProduct_Name] = useState("");
  const [Description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offers, setOffers] = useState("");
  const [qty, setqty] = useState("");


  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState([]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVisible(true);
    setForm([...form, { url, Product_Name, Description, price, offers,qty }]);
    // Clear input
    seturl("");
    setProduct_Name("");
    setDescription("");
    setPrice("");
    setOffers("");
    setqty("");
  };

  const handleDeleteUser = (indexOf) => {
    const status = window.confirm("Delete?");

    if (status) {
      const result = form.filter((item, index) => index !== indexOf);
      setForm(result);
    }
  };

  return (
    <>
    <div className="A">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Product</h1>
        <div className="form-div">
          <input
            value={url}
            onChange={(e) => seturl(e.target.value)}
            className="form-control "
            type="text"
            placeholder="url"
          />
        </div>
        <div className="form-div">
          <input
            value={Product_Name}
            onChange={(e) => setProduct_Name(e.target.value)}
            className="form-control mt-3"
            type="text"
            placeholder="Product Name"
          />
        </div>
        <div className="form-div">
          <input
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control mt-3"
            type="text"
            placeholder="Description"
          />
        </div>
        <div className="form-div">
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control mt-3"
            type="text"
            placeholder="Price"
          />
        </div>
        <div className="form-div">
          <input
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            className="form-control mt-3"
            type="text"
            placeholder="Offers"
          />
        </div>
        <div className="form-div">
          <input
            value={qty}
            onChange={(e) => setqty(e.target.value)}
            className="form-control mt-3"
            type="text"
            placeholder="Quantity"
          />
        </div>
        <div className="form-div">
          <input
            className="submit-btn form-filed btn btn-primary mt-3"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
      </div>
      {/* Display products */}
      {isVisible && (
        <div className="card-group">
          {form.map((item, index) => (
            <div className="card" key={index}>
              <img src={item.url} alt={item.Product_Name} className="img-fluid h-2  w-5 mb-3" />
              {/* <img src={item.url} className="card-img-top" alt={item.Product_Name} /> */}
              <div className="card-body">
                <h5 className="card-title">{item.Product_Name}</h5>
                <p className="card-text">{item.Description}</p>
                <p className="card-text">{item.price}</p>
                <p className="card-text">{item.offers}</p>
                <p className="card-text">{item.qty}</p>
                <button className="form-control btn btn-danger ms-2" onClick={() => handleDeleteUser(index)}>
                          Delete </button>

              </div>
            </div>
          ))}
        </div>
      )}
   
    </>
  );
}

export default App1;
