import React,{useState,useEffect} from 'react'


export default function GetClinics(){

    const [clinics,setClinics]=useState({clinicName: "",  email: "", address:"",contactNumber:"",website:""})
    const [data,SetData]=useState([])   
   
    //fetch the clinics
    
    const getClinic=async()=>{

        const token = localStorage.getItem("token");
       const response= await fetch("https://localhost:7098/api/Clinic",{
        method:"GET",
        headers: {
            "Authorization": `Bearer ${token}`, // Add the token to the header
            "Content-Type": "application/json"
        }
           
    })

        return response.json();

    }

    useEffect(()=>{
        getClinic().then(clinic=> SetData(clinic))
    },[clinics])

    const allclinics=data?.map(row=>(
            
            <tr key={row.clinicID}>
            <td>{row.clinicName}</td>
            <td>{row.email}</td>
            <td>{row.address}</td>
            <td>{row.contactNumber}</td>            
            <td>{row.website}</td>
            <td>
                <button onClick={()=>handleDelete(row.clinicID)}> Delete</button>
                            
            </td>
            <td> <button onClick={()=>handleEdit(row)}>Edit</button></td>

            </tr>
    ))
// fetch end


// create clinic

const handleChange=(e)=>{

    const {name,value}=e.target;
    console.log(name,value)
    setClinics(prev=>({

        ...prev,[name]:value
    }))

}

const handleSubmit=async(e)=>
{
    e.preventDefault()
    
try{
    const token = localStorage.getItem("token");
    const response= await fetch("https://localhost:7098/api/Clinic",{
        method:"POST",
        headers: {
            "Authorization": `Bearer ${token}`, // Add the token to the header
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clinics)    
    
    })
    if(response.ok){
        alert("Clinic inserted sucessfully")
        setClinics({clinicName: "",  email: "", address:"",contactNumber:"",website:""})
    }
    else
    {
        alert("clinic not saved")
    }
}catch(error){
    alert("Server Error")
    console.log(error)
}

}

// End Create clinic
    
//Delete Clinic
const handleDelete = async(id)=>{


try{
const token = localStorage.getItem("token");
const response= await fetch(`https://localhost:7098/api/Clinic/${id}`,{method:"DELETE",
    headers: {
        "Authorization": `Bearer ${token}`, // Add the token to the header
        "Content-Type": "application/json"
    },
})

if(response.ok){
    alert("clinic deleted sucessfully")
    SetData(data.filter(c=>c.clinicID !==id))
}
else{
    alert("clinic not deleted")
}
}
catch(error)
{
    alert("error")
    console.log(error)
}


}

//End Delete Clinic

//Update clinic

const handleEdit=(clinic)=>{

    setClinics(clinic)


}


const handleUpdate=async(e)=>{

e.preventDefault()

try{
    const response= await fetch(`https://localhost:7098/api/Clinic/${clinics.clinicID}`,
        {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(clinics)

        }
    )
    if(response.ok){
        alert("Clinic updated sucessfully")
        setClinics({clinicName: "",  email: "", address:"",contactNumber:"",website:""})
        SetData(data.map(clinic=> (clinic.clinicID===clinics.clinicID)?clinics:clinic))
    }
    else{

        alert("clinic not updated")
    }

}
catch(error){
    alert(error)
}




}


//End Update Clinic


    return(
        <>

<div className="form-container">
<h3>Add Clinic</h3>
<form onSubmit={clinics.clinicID? handleUpdate:handleSubmit}>

<input type="text" name="clinicName"  value={clinics.clinicName} onChange={handleChange} placeholder="Clinic Name" required />
<input type="email" name="email" value={clinics.email} onChange={handleChange} placeholder='email' required/>
<input type="text" name="address" value={clinics.address} onChange={handleChange} placeholder="Address" required />          
<input type="number"   min="1000000000"  max="9999999999"  maxlength="10"  name="contactNumber" value={clinics.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
<input type="text" name="website" value={clinics.website} onChange={handleChange} placeholder="Website" />

<button type='submit'>{clinics.clinicID? "Update Clinic":"Add Clinic"}</button>


</form>

</div>

        <div className="table-container">
        <h3>Clinic Details</h3>
            <table>
              <thead>
                  <tr>                     
                      <th>Clinic Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Contact Number</th>
                      <th>Website</th>
                      <th>Delete</th>
                      <th>Edit</th>
                 
                  </tr>
              </thead>
            <tbody>
        {
            allclinics?allclinics:<p>No Data Found</p>
        }
                </tbody>
                </table>
        </div>

      


        </>     
    )

}