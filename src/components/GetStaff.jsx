import React,{useEffect,useState} from "react";
import { getClinicName } from "../api";

export default function GetStaff(){
    const [clinics, setClinics] = useState([]);
    const [staff,setStaff]=useState({staffName:"",clinicId:"",email:"",contactNumber:"",dateOfJoining:""})
    const [data,setData]=useState([])
      

  // Get Staff Start  
    const  getStaff=async()=>{

        const response= await fetch("https://localhost:7098/api/Staff",{method:"GET"})

       return await response.json()

    }

useEffect(()=>{
    getStaff().then(data=>setData(data))
    getClinicName().then(clinicData =>      
        setClinics(clinicData));

},[staff])





const allstaff = data.map(s=>(

        <tr key={s.staffID}>        
        <td>{s.clinicID}</td>
        <td>{s.clinicName}</td>
        <td>{s.staffName}</td>
        <td>{s.email}</td>
        <td>{s.contactNumber}</td>
        <td>{s.dateOfJoining}</td>
        <td><button onClick={()=>handleDelete(s.staffID)}>Delete</button></td>
        <td><button onClick={()=>handleEdit(s)}>Edit</button></td>
        
        </tr>
))
//Fetch end


const handleChange=(e)=>{

    const {name,value}=e.target
    console.log(name,value)
    setStaff(prev=>({
        ...prev,[name]:value

    }))
}

const handleSubmit=async(e)=>{

    e.preventDefault();
       
    try{

        const response= await fetch("https://localhost:7098/api/Staff",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(staff)
        })

        if(response.ok){
            alert("data saved sucessfully")
            setStaff({staffName:"",clinicId:"",email:"",contactNumber:"",dateOfJoining:""})
        }
        else{
            alert("data not saved")
        }

    }
    catch(error)
    {
        console.log(error)
    }

}

//Post End


const handleDelete =async(id)=>{
console.log(id)
try{
    const response= await fetch(`https://localhost:7098/api/Staff/${id}`,{method:"DELETE"})

    if(response.ok){
        alert("Staff deleted sucessfully")
        setData(data.filter(s=>s.staffID!=id))

    }
    else{
        alert("staff not deleted")
    }

}catch(error)
{
    console.log(error)
}


}
// Delete end


const handleEdit=(editStaff)=>{
 //setStaff(editStaff)
 setStaff({
    staffID: editStaff.staffID,
    staffName: editStaff.staffName,
    clinicId: editStaff.clinicID, 
    email: editStaff.email,
    contactNumber: editStaff.contactNumber,
    dateOfJoining: editStaff.dateOfJoining
  });


}


const handleUpdate=async(e)=>{

    e.preventDefault();

    try{

        const response= await fetch(`https://localhost:7098/api/Staff/${staff.staffID}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(staff)
        })

        if(response.ok){
            alert("staff updated sucessfully")
            setStaff({staffName:"",clinicId:"",email:"",contactNumber:"",dateOfJoining:""})
            setData(data.map(data=> (data.staffID===staff.staffIDID)?staff:data))
        }
        else{
            alert("staff not updated")
        }

    }
    catch(error)
    {
        console.log(error)
    }

}



    return(
        <>

<div className="form-container">
<h3>Add Staff</h3>
<form onSubmit={staff.staffID?handleUpdate:handleSubmit}>
{/* <input type="text" name="clinicId"  value={staff.clinicId} onChange={handleChange} placeholder="Clinic " required /> */}
<select className="dropdown" name="clinicId" value={staff.clinicId} onChange={handleChange} required>
{!staff.clinicID? <option value="">Select Clinic</option>:staff.clinicID}
    {clinics.map(clinic => (
        <option key={clinic.ID} value={clinic.clinicID}>
            {clinic.clinicName}
        </option>
    ))}
</select>


<input type="text" name="staffName"  value={staff.staffName} onChange={handleChange} placeholder="Staff Name" required />
<input type="email" name="email" value={staff.email} onChange={handleChange} placeholder='email' required/>          
<input type="number"   min="1000000000"  max="9999999999"  maxLength="10"  name="contactNumber" value={staff.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
<input type="date"     name="dateOfJoining" value={staff.dateOfJoining} onChange={handleChange}  required />

<button type='submit'>{staff.staffID?"Update Staff":"Add Staff"}</button>

</form>

</div>
       
        <div className="table-container">
        <h3>Staff Details</h3>
 <table>
   <thead>
       <tr>         
       <th>Clinic Id</th>  
       <th>Clinic Name</th>  
            
           <th>Staff Name</th>
           <th>Email</th>        
           <th>Contact Number</th>  
           <th>Joining Date</th>        
           <th>Delete</th>
           <th>Edit</th>
      
       </tr>
   </thead>
 <tbody>
{
 allstaff?allstaff:<p>No Data Found</p>
}
     </tbody>
     </table>
</div>



        </>
    )


}