import React,{useState,useEffect} from 'react'


export default function CrudClinic(){

const [data,setData]=useState([])
const [clinic,setClinic]=useState({clinicName: "",  email: "", address:"",contactNumber:"",website:""})
//const [selectedClinic,setSelectedClinic]=useState([])


/// getting the data  ----Start
const getClinic=async()=>{

    const response= await fetch("https://localhost:7098/api/Clinic",{method:"GET"})

    return await response.json()

}

useEffect(()=>{
  getClinic().then(resp=> {
    setData(resp)
  })

},[])

const clinics = data?.map((e)=>(  
        <tr key={e.clinicID}>
        <td>{e.clinicID}</td>
        <td>{e.clinicName}</td>
        <td>{e.address}</td>
        <td>{e.contactNumber}</td>
        <td>{e.email}</td>   
        <td>
            <button onClick={()=>handleDelete(e.clinicID)}>Delete</button>
            <button onClick={()=>handleEdit(e)}>Edit</button>
        </td>    
        
        </tr>    
)
    
)

///End getting Data


///Start adding Data
const handleChange=(e)=>
    {
    const {name,value}=e.target;

    console.log(`Changing the text: ${name} : ${value}`)
setClinic((prevState)=>({
        ...prevState,[name]:value,

}))
}
//submit method
const handleSubmit= async (e)=>{

e.preventDefault();

try
{
        const postdata= await fetch("https://localhost:7098/api/Clinic",{
            method:"POST",
            headers:{"Content-Type" : "application/json"},
            body: JSON.stringify(clinic)

        });
        if(postdata.ok){
            alert("clinic added sucessfully");            
            setClinic({ clinicName: "", email: "",address:"",contactNumber:"",website:"" });

        }else{
            alert("error adding clinic")
        }


}
catch(error)
{
    console.error("Fetch error:", error);
    alert("Error connecting to the server.");

}


}


///End Adding Data


///Delete clinic start

const handleDelete=async(id)=>{


    try{
    const deleteclinic= await fetch(`https://localhost:7098/api/Clinic/${id}`,{method:"DELETE"})

        if(deleteclinic.ok){

            alert("clinic deleted sucessfully")
            setData(data.filter(clinic=> clinic.clinicID!==id))
        }
        else{
            alert("error deleting clinic")
        }


    }
    catch(error)
    {
        console.log(error)

    }



}

//End Delete Clinic


//update clinic Start

const handleEdit=(clinic)=>{
    
    setClinic(clinic)

}

const handleUpdate= async(e)=>{
    e.preventDefault();
    console.log("Updating Data:", JSON.stringify(clinic, null, 2));

try{

 const updateclinic= await fetch(`https://localhost:7098/api/Clinic/${clinic.clinicID}`,
    {
    method:"PUT",
    headers:{"Content-Type": "application/json"},
    body: JSON.stringify(clinic),

    })

    if(updateclinic.ok){
        alert("Clinic updated sucessfully")
        setClinic({clinicName: "",  email: "", address:"",contactNumber:"",website:""})
        setData(data.map(c => (c.clinicID === clinic.clinicID ? clinic : c))); // Update UI
    }
    else{
        alert("error while updateing clinic")
    }

}
catch(error)
{
    alert(console.log(error))
}

}





//End Update Clinic





return(
    <main>
    <div className="table-container">
             <table>
             <thead>
                 <tr>
                     <th>Clinic ID</th>
                     <th>Clinic Name</th>
                     <th>Address</th>
                     <th>Contact Number</th>
                     <th>Email</th>
                 </tr>
             </thead>
           <tbody>
           
         {
           clinics
          //data?data.map(e=><li>{e.clinicName} email={e.email}</li>):<p>No Data Found</p>
     
         }

        </tbody>
        </table>
     </div>
     <div className='form-container'>

    <form onSubmit={clinic.clinicID ? handleUpdate:handleSubmit}>
    <input type="text" name="clinicName"  value={clinic.clinicName} onChange={handleChange} placeholder="Clinic Name" required />
    <input type="text" name="email" value={clinic.email} onChange={handleChange} placeholder='email'/>
    <input type="text" name="address" value={clinic.address} onChange={handleChange} placeholder="Address" required />          
    <input type="text" name="contactNumber" value={clinic.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
    <input type="text" name="website" value={clinic.website} onChange={handleChange} placeholder="Website" />

    <button type='submit'>{clinic.clinicID? "Update Clinic" : "Add Clinic"}</button>


        </form>


     </div>
     </main>

)

}