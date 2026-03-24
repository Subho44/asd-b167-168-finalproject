import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
 
  const [email,setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const navigate = useNavigate();

  const verifyotp =async ()=> {
    const res = await axios.post("http://localhost:5600/api/auth/verify",{
      email,
      otp
    });
    localStorage.setItem("token",res.data.token)
    alert(res.data.message);
    navigate("/home");

  };




  return <>
  <div className='container mt-5'>
    <h2>Login(otp)</h2>
    <input 
    className='form-control mb-2 col-md-3'
    placeholder='Enter Email'
    onChange={(e)=>setEmail(e.target.value)}
    required
    />
    <input 
    className='form-control mb-2 col-md-3'
    placeholder='Enter Otp'
    onChange={(e)=>setOtp(e.target.value)}
    required
    />
    <button className='btn btn-dark' onClick={verifyotp}>
    Login
    </button>



  </div>
  
  
  </>
}

export default Login