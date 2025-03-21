import logo from './logo.svg';
import './App.css';
import './style.css'
import CrudClinic from './components/CrudClinic';
import GetClinics from './components/GetClinics';


function App() {


  return (
    <div className='main-container'>
        {/* <CrudClinic/> */}
        <GetClinics />
        </div>
      
  );
}

export default App;
