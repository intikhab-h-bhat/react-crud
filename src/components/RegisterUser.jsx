import React,{useState} from "react";

export default function RegisterUser() {

    const [user,setUser]=useState({fullName:"",email:"",password:"",clinicId:""})



    const handleChange=(e)=>{
        const {name,value}=e.target
        console.log(name,value)
        setUser(prev=>({
            ...prev,[name]:value
        }))
    }

    console.log(user,"Testing")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(user)
        try{
            const response= await fetch("https://localhost:7098/api/Auth/Register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            })
           
            if(response.ok){
                alert("User registered successfully")
                setUser({fullName:"",email:"",password:"",clinicId:""})
            }else{
                alert("User registration failed")
            }

        }catch(error){
            console.log(error)
        }
    }


    return(
        <form onSubmit={handleSubmit}>
        <input type="number" name="clinicId" placeholder="Clinic Id"  onChange={handleChange} />
        <input type="text"  name="fullName" placeholder="Full Name"  onChange={handleChange} />
        <input type="email"  name="email" placeholder="Email"  onChange={handleChange} />
        <input type="password"  name="password" placeholder="Password"   onChange={handleChange} />
        <button type="submit">Register</button>
      </form>

    )
}