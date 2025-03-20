

import React,{useState,useEffect} from 'react'



export default function AddClinic({ selectedClinic, setData, data }){

    const [clinic,setClinic]=useState({clinicName: "",  email: "", address:"",contactNumber:"",website:""})


     // Populate form when editing
  useEffect(() => {
    if (selectedClinic) {
      setClinic(selectedClinic);
    }
  }, [selectedClinic]);
   
    const handleChange=(e)=>
    {
        const { name, value } = e.target;
        console.log(`Updating ${name} to:`, value); // Debugging log
        setClinic((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log("Submiting Data")
    console.log("Sending Data:", JSON.stringify(clinic, null, 2)); // Debugging
    try {
    const response =await fetch("https://localhost:7098/api/Clinic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clinic),
    });
    if (response.ok) {
        alert("Clinic added successfully!");
        setClinic({ clinicName: "", email: "",address:"",contactNumber:"",website:"" }); // Clear form
    } else {
        alert("Error adding Clinic");
    }
}catch (error) {
    console.error("Fetch error:", error);
    alert("Error connecting to the server.");
}
}



// 

const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating Data:", JSON.stringify(clinic, null, 2));

    try {
        const response = await fetch(`https://localhost:7098/api/Clinic/${clinic.clinicID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(clinic),
        });

        if (response.ok) {
            alert("Clinic updated successfully!");
            setClinic({ clinicName: "", email: "", address: "", contactNumber: "", website: "" });
            setData(data.map(c => (c.clinicID === clinic.clinicID ? clinic : c))); // Update UI
        } else {
            alert("Error updating clinic");
        }
    } catch (error) {
        console.error("Update error:", error);
        alert("Error connecting to the server.");
    }
};





return(
    <div className="form-container">
<form onSubmit={clinic.clinicID ? handleUpdate : handleSubmit}>
    <input type="text" name="clinicName"  value={clinic.clinicName} onChange={handleChange} placeholder="Clinic Name" required />
    <input type="text" name="email" value={clinic.email} onChange={handleChange} placeholder='email'/>
    <input type="text" name="address" value={clinic.address} onChange={handleChange} placeholder="Address" required />          
    <input type="text" name="contactNumber" value={clinic.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
    <input type="text" name="website" value={clinic.website} onChange={handleChange} placeholder="Website" />

    <button type='submit'>{clinic.clinicID ? "Update Clinic" : "Add Clinic"}</button>

</form>
</div>


)



}