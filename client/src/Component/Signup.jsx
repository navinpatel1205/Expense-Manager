
import  React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useHistory} from "react-router-dom";
import signup from "../image/signup.jpeg";
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';

// import Grid from '@material-ui/core/Grid';

// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles} from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import EmailIcon from '@material-ui/icons/Email';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import IconButton from '@material-ui/core/IconButton';
// import FilledInput from '@material-ui/core/FilledInput';

// import Icon from '@material-ui/core/Icon';




// const useStyles = makeStyles((theme) => ({
//     paper: {
//       marginTop: theme.spacing(0),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     avatar: {
//       margin: theme.spacing(1), 
//       backgroundColor: theme.palette.primary.main,
//         },
//     form: {
//       width: '100%', // Fix IE 11 issue.
//       marginTop: theme.spacing(3),
//     },
//     submit: {
//       margin: theme.spacing(3, 0, 2),
//          },
//   }));
 
const Signup=()=>
{ 
    const history =useHistory();

  const [user,setUser] =useState({
    name:"",
    email:"",
    phone:"",
    work:"",
    password:"",
    cpassword:""
  })

  let name,value;
  const handleInputs = (e) =>
  {
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }


 const PostData = async (e) =>
 {
         e.preventDefault();

   const {name,email,phone,work,password,cpassword} = user;

     const response =  await fetch("/register" , {
       method: "post",
       headers: {
         "Content-Type" : "application/json"
       },
       body : JSON.stringify({
        name,email,phone,work,password,cpassword
       })
     })

     const data = await response.json();
     
     if(response.status === 422 || !data)
     {
       window.alert("Please Fill All The Required Fields CareFully");
       console.log("Please Fill All The Required Fields CareFully");
     }
     else
      if(response.status === 402)
      {
        window.alert("Email Already exist");
       console.log("Email Already exist");
      }
      else
       if(response.status === 401)
       {
        window.alert("Password should be Same");
        console.log("Password should be Same");
       }
     else
     {
      window.alert(" SignUp Succesfull 👍 Thank You");
      console.log(" SignUp Succesfull 👍 Thank You");
      history.push("/login");
    }

 }

  return(
    < >
  
    <section className="signup " >
      <div className="container mt-2">
        <div className="signup-content" >
            <div className="signup-form " >
              <h2 className="form-title">SIGN UP</h2>
              <form method="POST" className="signup-form" id="signup-form " >
                <div className="form-group input-group mb-3">
                  <label htmlFor="name">
                  <span className="material-icons">account_circle</span>
                  </label>
                  <input type="text" name="name" className="form-control" autoComplete="off"
                      value={user.name} onChange={handleInputs} required  placeholder="Enter Your Name" />
                </div>
                <div className="form-group input-group mb-3">
                  <label htmlFor="email">
                  <span className="material-icons fa-5x">email</span>
                  </label>
                  <input type="email" className="form-control" 
                      value={user.email}
                          onChange={handleInputs}  placeholder="Enter your email" autoComplete="off"
                   aria-label="Username" required  name="email" id="email"/>
                  
                </div>
                <div className="form-group input-group mb-3">
                  <label htmlFor="phone">
                   <span className="material-icons fa-lg">phone</span>
                  </label>
                  <input type="number"  className="form-control" name="phone" id="phone" autoComplete="off"
                  
                      value={user.number}
                          onChange={handleInputs} required placeholder="Enter your  Number"  aria-label="Username" />
                </div>
                <div className="form-group input-group mb-3">
                  <label htmlFor="Work">
                   <span className="material-icons">work</span>
                  </label>
                  <input className="form-control" type="text" name="work" id="work" autoComplete="off"
                  
                      value={user.work}
                          onChange={handleInputs} required placeholder="Enter your Profesion"></input>
                </div>
                <div className="form-group input-group mb-3">
                  <label htmlFor="Password">
                   <span className="material-icons">lock</span>
                  </label>
                  <input type="password"   className="form-control" name="password" id="password" autoComplete="off"
                      value={user.password}
                          onChange={handleInputs} required placeholder="Enter your Password" ></input>
                </div>
                <div className="form-group input-group mb-3">
                  <label htmlFor="cpassword">
                   <span className="material-icons">lock</span>
                  </label>
                  <input type="password"   name="cpassword" id="cpassword"
                  className="form-control" autoComplete="off"
                      value={user.cpassword}
                          onChange={handleInputs} required placeholder="Confirm your Password"></input>
                </div>
                <div className="form-group-form-button " >
                  <input type="submit" name="signup" id="signup" 
                   className="btn-signin btn-primary btn-lg"
                    value="Register"  onClick={PostData}
                    />

                </div>
              </form>
              </div>
              <div className="signup-image rounded ">
                <figure>
                   <img src={signup}  alt="signup "/>
                </figure>
                <Link to="/login" className="signup-image-link"> Already Have An Account? </Link>
              </div>
            
            </div>
      </div>
    </section>

    </>
    )
    //  const className = useStyles();
    // const [values, setValues] = React.useState({
    //     password: '',
    //     confirmpassword:'',
    //     showPassword: false,
    //     showCpassword:false,
    //   });
    //   const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //   };
    
    //   const handleClickShowPassword = () => {
    //     setValues({ ...values, showPassword: !values.showPassword });
    //   };
    //   const handleClickShowCPassword = () => {
    //     setValues({ ...values, showCPassword: !values.showCPassword });
    //   };
    
    //   const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    //   };
    
          
      
    //   <Container component="main" maxWidth="xs">
    //   <CssBaseline />
    //   <div className={classes.paper}>
    //     <Avatar className={classes.avatar}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Sign up
    //     </Typography>
    //     <form className={classes.form} noValidate>
    //       <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //           <TextField
    //             autoComplete="fname"
    //             name="firstName"
    //             variant="filled"
    //             required
    //             fullWidth
    //             id="firstName"
    //             label="First Name"
    //             InputProps={{
    //                 startAdornment: (
    //                   <InputAdornment position="start">
    //                     <AccountCircle />
    //                   </InputAdornment>
    //                 ),
    //               }}
    //           />
    //         </Grid>
            
    //         <Grid item xs={12} >
    //           <TextField
    //              variant="filled"
    //             required
    //             fullWidth
    //             id="lastName"
    //             label="Last Name"
    //             name="lastName"
    //             autoComplete="lname"
    //             InputProps={{
    //                 startAdornment: (
    //                   <InputAdornment position="start">
    //                     <AccountCircle />
    //                   </InputAdornment>
    //                 ),
    //               }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextField
    //             variant="filled"
    //             required
    //             fullWidth
    //             id="email"
    //             label="Email Address"
    //             name="email"
    //             autoComplete="email"
    //             InputProps={{
    //                 startAdornment: (
    //                   <InputAdornment position="start">
    //                     <EmailIcon/>
    //                   </InputAdornment>
    //                 ),
    //               }}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <FilledInput
    //              variant="filled"
    //             required
    //             fullWidth
    //             name="password"
    //             label="Password"
    //             id="password"
    //             autoComplete="current-password"
    //             type={values.showPassword ? 'text' : 'password'}
    //         value={values.password}
    //         onChange={handleChange('password')}
            
    //         endAdornment={
    //           <InputAdornment position="start">
    //             <IconButton
    //               aria-label="toggle password visibility"
    //               onClick={handleClickShowPassword}
    //               onMouseDown={handleMouseDownPassword}
    //             >
    //               {values.showPassword ? <Visibility /> : <VisibilityOff />}
    //             </IconButton>
    //           </InputAdornment>
    //         }
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <FilledInput
    //             required
    //             fullWidth
    //             name="Confirm password"
    //             label="Confirm Password"
    //             id="confirmpassword"
    //             autoComplete="current-password"
    //             type={values.showCpassword ? 'text' : 'password'}
    //             value={values.confirmpassword}
    //             onChange={handleChange('confirmpassword')}
    //             endAdornment={
    //               <InputAdornment position="start">
    //                 <IconButton
    //                   aria-label="toggle password visibility"
    //                   onClick={handleClickShowCPassword}
    //                   onMouseDown={handleMouseDownPassword}
    //                 >
    //                   {values.showCPassword ? <Visibility /> : <VisibilityOff />}
    //                 </IconButton>
    //               </InputAdornment>
    //             }
    //           />
    //         </Grid>
            
    //       </Grid>
    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         color="primary"
    //         className={classes.submit}
    //       >
    //         Sign Up
    //       </Button>
    //       <Grid container justify="flex-end">
    //         <Grid item>
    //           <Link href="/login" variant="body2">
    //             Already have an account? Sign in
    //           </Link>
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </div>
    
    // </Container>
    
}
export default Signup;