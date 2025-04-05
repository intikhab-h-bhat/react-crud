export const getClinicName=async()=>{

    const response= await fetch("https://localhost:7098/api/Clinic",{method:"GET"})

    return await response.json()

}
