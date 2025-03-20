// import logo from './logo.svg';
// import './App.css';
// import Header from './components/Header';
// import TodoItem from './components/TodoItem';
// import Button from './components/Button';
// import './style.css'
// import {getClinic} from './api/index';
// import{useState,useEffect} from 'react'
// import Counter from './components/Counter';
// import ClinicTable from './components/ClinicTable';
// import AddClinic from './components/AddClinic';

// function App() {

// const [data, setData]=useState(null)
// const [selectedClinic, setSelectedClinic] = useState(null);
// const [isVisible,setIsVisi]=useState(true)



// useEffect(()=>{
//   getClinic().then(clinic=> {
//     setData(clinic)
//   })

// },[])


// // const Clinics = data?.map(e => (
// //   <>
// //       <p>{e.clinicName} {e.clinicId}</p>
// //   </>
// // )) ;
// const Clinics = data?.map((e) => (
//   <tr key={e.clinicID}>
//       <td>{e.clinicID}</td>
//       <td>{e.clinicName}</td>
//       <td>{e.address}</td>
//       <td>{e.contactNumber}</td>
//       <td>{e.email}</td>
//       <td>
//           <button onClick={() => handleEdit(e)}>Edit</button>
//           <button onClick={() => handleDelete(e.clinicID)}>Delete</button>
//       </td>
     
//   </tr>
// ))

// useEffect(()=>{
//   getClinic().then(clinic=> {
//     setData(clinic)
//   })

// },[Clinics])

// const handleDelete = async (id) => {
//   if (!window.confirm("Are you sure you want to delete this clinic?")) return;

//   try {
//       const response = await fetch(`https://localhost:7098/api/Clinic/${id}`, {
//           method: "DELETE",
//       });

//       if (response.ok) {
//           alert("Clinic deleted successfully!");
//           setData(data.filter(clinic => clinic.clinicID !== id)); // Update UI
//       } else {
//           alert("Error deleting clinic");
//       }
//   } catch (error) {
//       console.error("Delete error:", error);
//       alert("Error connecting to the server.");
//   }
// };
// // Edit clinic (send data to form)
// const handleEdit = (clinic) => {
//   setSelectedClinic(clinic); // Pass clinic data to form
// };


//   return (
  

//       <div className='main-container'>
//          <AddClinic selectedClinic={selectedClinic} setData={setData} data={data}/>
//        <div className="table-container">
//         <table>
//         <thead>
//             <tr>
//                 <th>Clinic ID</th>
//                 <th>Clinic Name</th>
//                 <th>Address</th>
//                 <th>Contact Number</th>
//                 <th>Email</th>
//             </tr>
//         </thead>
//         <tbody>
       
//     {
//       Clinics
//      //data?data.map(e=><ClinicTable name={e.clinicName} email={e.email}/>):<p>No Data Found</p>
   
//     }
//     </tbody>
//     </table>
//     </div>
//     </div>
//   );
// }

// export default App;
