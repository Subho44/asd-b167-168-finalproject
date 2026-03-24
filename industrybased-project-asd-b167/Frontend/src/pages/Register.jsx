import React,{useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const navigate = useNavigate();

  const hr =async ()=> {
    const res = await axios.post("http://localhost:5600/api/auth/register",{
      name,
      email
    });
    alert(res.data.message);
    navigate("/login");

  };




  return <>
  <div className='container mt-5'>
    <h2>Register</h2>
    <input 
    className='form-control mb-2 col-md-3'
    placeholder='Enter name'
    onChange={(e)=>setName(e.target.value)}
    required
    />
    <input 
    className='form-control mb-2 col-md-3'
    placeholder='Enter Email'
    onChange={(e)=>setEmail(e.target.value)}
    required
    />
    <button className='btn btn-dark' onClick={hr}>
    Send Otp
    </button>



  </div>
  
  
  </>
}

export default Register