import React from "react";


export default function LogOut() {

    const handleLogout = async() => {
        console.log("Logout button clicked");
        try {
            const response = await fetch("https://localhost:7098/api/Auth/logout", {
                method: "GET"                              
            });

            if (response.ok) {              
                localStorage.removeItem("token"); // Remove the token from local storage
                alert("Logged out successfully");
            } else {
                alert("logout failed");
            }
        } catch (error) {
            console.log(error);
        }       
    };

    return (
        <div>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}