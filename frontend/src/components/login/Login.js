import { useState } from 'react'
import './login.css'
import {Dialog} from '@mui/material'
import { loginAuthentication, registerAuthentication } from '../../service/api'
import {useDispatch} from 'react-redux';


const initialValues = {
    login :{
        view: 'login'
    },
    register :{
        view: 'register'
    },
}

const Login = ({open ,setOpen, getData})=>{

    const [toggle, setToggle] = useState(initialValues.login);
    const [error, setError] = useState(false);
    const [user, setUser] = useState({
        firstname: '',lastname:'', username:'', email:'', password:''
    });
    const [loginUser, setLoginUser] = useState({
         username:'', password:''
    });

    const handleClose = ()=>{
        setOpen(false);
        setToggle(initialValues.login)
        setError(false);
    }

    const changeToRegisterForm = ()=>{
        setToggle(initialValues.register);
    }
    const onValueChange = (e)=>{
        setLoginUser({...loginUser,[e.target.name]: e.target.value})
    }
    const onInputChange = (e)=>{
        setUser({...user, [e.target.name]: e.target.value});
        // console.log(user);
    }

    const submitRegisterForm = async ()=>{
        let response = await registerAuthentication(user);
        getData(user);
        handleClose();
    }
    const submitLoginForm = async()=>{
        let response = await loginAuthentication(loginUser);
        console.log(response);
        if(response.status == 200){
            localStorage.setItem('user', JSON.stringify(loginUser))
            getData(loginUser)
            handleClose();
        }
        else{
            setError(true);
        }
    }
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{sx: {maxWidth: 'unset'}}} >
         
            <div className="login-sec">
                <div className='login-side'>
                    {
                        toggle.view==='login' ?
                        <>
                            <h3>Login</h3>
                            <p>
                                Get access to your orders, wishlist and recomendations
                            </p>
                        </>
                        :
                        <>
                            <h3> Looks like you are new here!</h3>
                            <p>
                                sign up with your mobile number to get started
                            </p>
                         </>
                    }
                </div>
                {
                 toggle.view==='login'  ?
                    <div className="login" >
    
                            <div className="login-inp" > 
                                <input onChange={(e)=>onValueChange(e)} name='username' type="text" placeholder="Enter username/Mobile number" />
                                {
                                  error &&  <p className='login-error'>invalid username or password</p>
                                }
                       
                                <input onChange={(e)=>onValueChange(e)} name='password' type="password" placeholder="Enter password" />
                                <p>By continuing, you agree to Flasko's Terms of use and Privacy Policy </p>
                            </div>
                            <div className="login-btn-sec">
                                <button onClick={submitLoginForm} >Login</button>
                            </div>
                            <p className='or'> OR</p>
                            {/* <button className='otp-btn'>Request OTP</button> */}
                            <p className='register' onClick={()=>changeToRegisterForm()}>New to Flasko? Create an account</p>
         
                    </div>
                    :
                    <div className="login" >
                            <div className="login-inp" > 
                                <input onChange={(e)=>onInputChange(e)} name='firstname' type="text" placeholder="Enter  firstname" />
                                <input onChange={(e)=>onInputChange(e)} name='lastname' type="text" placeholder="Enter lastname" />
                                <input onChange={(e)=>onInputChange(e)} name='username' type="text" placeholder="Enter username" />
                                <input onChange={(e)=>onInputChange(e)} name='email' type="email" placeholder="Enter Email" />
                                <input onChange={(e)=>onInputChange(e)} name='password' type="password" placeholder="Enter Phone" />
                            </div>
                            <div className="login-btn-sec login-btn-sec-register">
                                <button onClick={submitRegisterForm} >continue</button>
                            </div>
                    </div>
             }
            </div>
        </Dialog>
    )
}

export default Login;