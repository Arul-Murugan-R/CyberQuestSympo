import React,{useState} from 'react'
import { TextField,FormControl,OutlinedInput,IconButton,InputLabel,InputAdornment,Button} from '@mui/material';
import { Visibility,VisibilityOff } from '@mui/icons-material';
import './Login.css'

export default function Login() {
    const [showPassword,setShowPassword] = useState(false)
    // return(
    //     <div className="login-container">
    //         <form className='login-form'>
    //             <div className="input-field">
    //                 <input type="text" placeholder='Team Name' />
    //             </div>
    //             <div className="input-field">
    //                 <input type={showPassword?'text':'password'} placeholder='Password' />
    //                 {showPassword ? <VisibilityOff /> : <Visibility />}
    //             </div>
    //             <div className="input-field">
    //                 <button type="submit" >Submit</button>
    //             </div>
    //         </form>
    //     </div>
    // )

  return (
    <div className='login-container'>
        <center><h3>Login Page</h3></center>
          <FormControl sx={{width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-name">Team Name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-name"
            label="Team Name"
          />
        </FormControl>
        <FormControl sx={{width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>setShowPassword((prev)=>!prev)}
                //   onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <FormControl sx={{width: '100%' }}>
          {/* sx={{boxShadow: '6px 6px 2px black'}} */}
        <Button variant="outlined" size="medium" >
          Login
        </Button>
        </FormControl>
    </div>
  )
}
