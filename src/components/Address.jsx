import React, { useState } from "react";
import {
  FaPlus,
  FaHome,
  FaBuilding,
  FaMapMarkerAlt,
  FaTrash,
} from "react-icons/fa";
import "./Address.css";

function Address() {
  const [showForm, setShowForm] = useState(false);

  const [addressType, setAddressType] = useState("Home");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [state, setState] = useState("");

  const [pincode, setPincode] = useState("");

  const [addresses, setAddresses] = useState(
    JSON.parse(localStorage.getItem("addresses")) || []
  );

  const saveAddress = () => {
    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = {
      id: Date.now(),
      addressType,
      name,
      phone,
      address,
      city,
      state,
      pincode,
    };

    const updatedAddresses = [...addresses, newAddress];

    setAddresses(updatedAddresses);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updatedAddresses)
    );

    alert("Address Saved Successfully ✅");

    setShowForm(false);

    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setAddressType("Home");
  };

  const deleteAddress = (id) => {
    const updatedAddresses = addresses.filter(
      (item) => item.id !== id
    );

    setAddresses(updatedAddresses);

    localStorage.setItem(
      "addresses",
      JSON.stringify(updatedAddresses)
    );
  };

  return (
    <div className="address-page">

      <h2>My Addresses</h2>

      <div
        className="add-address-card"
        onClick={() => setShowForm(true)}
      >
        <FaPlus className="plus-icon" />

        <span>ADD NEW ADDRESS</span>
      </div>

      {showForm && (
        <div className="address-form">

          <h3>Add New Address</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <div className="address-type">

            <button
              className={addressType === "Home" ? "active" : ""}
              onClick={() => setAddressType("Home")}
            >
              Home
            </button>

            <button
              className={addressType === "Office" ? "active" : ""}
              onClick={() => setAddressType("Office")}
            >
              Office
            </button>

            <button
              className={addressType === "Other" ? "active" : ""}
              onClick={() => setAddressType("Other")}
            >
              Other
            </button>

          </div>

          <button
            className="save-btn"
            onClick={saveAddress}
          >
            Save Address
          </button>

        </div>
      )}

      {addresses.length === 0 ? (
        <h3 style={{ textAlign: "center", marginTop: "40px" }}>
          No Address Saved
        </h3>
      ) : (
        addresses.map((item) => (
          <div
            key={item.id}
            className="saved-address"
          >

            <h3>

              {item.addressType === "Home" && (
                <FaHome />
              )}

              {item.addressType === "Office" && (
                <FaBuilding />
              )}

              {item.addressType === "Other" && (
                <FaMapMarkerAlt />
              )}

              {item.addressType}

            </h3>

            <h4>{item.name}</h4>

            <p>{item.phone}</p>

            <p>
              {item.address}
            </p>

            <p>
              {item.city}, {item.state}
            </p>

            <p>{item.pincode}</p>

            <div className="address-buttons">

              <button
                className="delete-btn"
                onClick={() =>
                  deleteAddress(item.id)
                }
              >
                <FaTrash />
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Address;