import React,{ useState } from 'react'
import icon from '../img/icon.png'


// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import AxiosService from '../../components/utils/ApiService';
import { useNavigate,  } from "react-router-dom";
// import signincss from './signin.module.css'
// import Spiner from '../../components/Spiner/Spiner';
// import { FiEye, FiEyeOff } from "react-icons/fi"; // Import eye icons from react-icons/fi

function Signin() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
  
        const res = await AxiosService.post(`/user/login`, {
          email,
          password,
        });
  
        if (res.status === 200) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
          if (res.data.userData.status === "InActive") {
            navigate("/");
            toast.error("You are not Allow to login");
          } else if (res.data.userData.role === "customer") {
            toast.success(res.data.message);
            navigate("/dashboard");
          } else {
            toast.success(res.data.message);
            navigate("/userdash");
          }
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <>
 {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
      <section>
      <div className='logfull'  >
      <div className="login" style={{height:"480px",paddingTop:"20px", marginTop:"40px"}}>
      <div className="avatar" style={{width:"100px", height:"100px"}}>
        <img src={icon} />
      </div>
        <h2  >Login</h2>
        <h3>Welcome back!</h3>

        <form className="login-form">
          <div className="textbox">
            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
            <span className="material-symbols-outlined"> email </span>
          </div>

          <div className="textbox">
            <input
              type={showPassword ? 'text' : 'password'} // Here is the change
              placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
            />
            <span  className="material-symbols-outlined">
              {' '}
              lock{' '}
            </span>
           </div>

           <div  id='ch' style={{display:'flex',marginTop:"px"}}>
            <input style={{width:"15px",margin:"-18px 6px 0px 0px"}}
              type="checkbox"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              
            /> 
            
            <span id='sp' style={{marginRight:"-3px",color:'#157ae1' }}>
              Show Password
            </span>
            &nbsp; &nbsp;
            

</div>

          <button type="submit" style={{marginTop:"-28px", width:"150px",height:"50px"}} onClick={(e)=>handleLogin(e)} > LOGIN</button>

          
        </form>
      </div>
      </div>
      </section>
      </>
    );
}

export default Signin
