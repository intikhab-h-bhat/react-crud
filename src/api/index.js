export const getClinicName=async()=>{

    const token = localStorage.getItem("token");
    const response= await fetch("https://localhost:7098/api/Clinic",{method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })

    return await response.json()

}
