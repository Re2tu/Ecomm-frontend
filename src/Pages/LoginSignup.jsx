import { useState } from 'react';
import React from "react";
import './CSS/LoginSignUp.css'
 const LoginSignup=()=>{
   
   const [state,setState]=useState("Login");
   const [formData,setFormData]=useState({
      username:"",
      password:"",
      email:""
   })
   const changeHandler=(e)=>{
     setFormData({...formData,[e.target.name]:e.target.value})
   }
   const login = async () => {
      try {
         console.log("Login function executed", formData);
         let responseData;
         const response = await fetch('https://ecomm-backend-ammz.onrender.com/login', {
            method: 'POST',
            headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });
   
         if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
         }
   
         responseData = await response.json();
         console.log("Server response:", responseData);
   
         if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
         } else {
            alert(responseData.errors);
         }
      } catch (error) {
         console.error("Fetch error:", error.message);
         alert("Failed to connect to the server. Please try again later.");
      }
   };
   

   const signup =async()=>{
      console.log("Signup function executed",formData);
      let responseData;
      await fetch('https://ecomm-backend-ammz.onrender.com/signup',{
         method:'POST',
         headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
         },
         body:JSON.stringify(formData),
      }).then((response)=>response.json()).then((data)=>responseData=data)

      
      if(responseData.success){
         localStorage.setItem('auth-token',responseData.token);
         window.location.replace("/");
      }
      else{
         alert(responseData.errors)
      }
   }

    return(<div className="loginsignup">
      <div className="loginsignup-container">
         <h1>{state}</h1>
         <div className="loginsignup-fields">
            {state ==="Sign Up" ?<input  name='username' value={formData.username} onChange={changeHandler} type="text" placeholder="Your name"/> :<></>}
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="email address"/>
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder="Password"/>
         </div>
         <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>

       { state ==="Sign Up" ? <p className="loginsignup-login">Already have an account?<span onClick={()=>{setState("Login")}}>Login Here</span></p>:
         <p className="loginsignup-login">Create an account?<span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}

         <div className="loginsignup-agree">
            <input type="checkbox" name='' id=''/>
            <p>By continuing, I agree to the terms of use & privacy policy</p>
         </div>
      </div>

    </div>
    )
 }
 
 export default LoginSignup