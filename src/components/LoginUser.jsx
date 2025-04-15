
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function LoginUser({onLogin}) {
    const [login, setLogin] = useState({ email: "", password: "" });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // console.log(login,"Testing");
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch("https://localhost:7098/api/Auth/Login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(login)
            });

            if (response.ok) {
            const token = await response.text(); // Since you're returning a plain string
                //.setItem("token", token); // Store the token
                 //alert("Login successful");
                setLogin({ email: "", password: "" });
                onLogin(token); // ✅ update App state
                navigate('/staff'); // ✅ redirect


            } else {
                alert("Login failed");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input type="password" placeholder="Password"  name="password" onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
      );
}