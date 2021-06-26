import React, {useState}  from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./Assets/Recuperar.jpg";
import { Alert } from '@material-ui/lab';
import Logo from "./../Assets/Logo.png";
import { useHistory} from "react-router-dom";
import axios from 'axios';
import urlWebServices from "../controller/webServices";

function Copyright() {
  return (
    <Typography variant="body2" align="center" style={{color:"black"}}>
      {"Copyright © "}
        Kitchen Gadget
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(9, 15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(10),
     backgroundImage: `url(${Logo})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:" #BF6D3A",
  },
  inputForm: {
    marginTop:"30px",
    borderRadius: 10,
    borderColor: 'gray',
    width: '100%'
 }
}));

export default function OlvidarseContraseña() {
  const classes = useStyles();
  const history= useHistory();
  const [display, setDisplay]=useState(false);
  const handleSignIn = (usuario, email) => {
    setDisplay(false);
    const user={
        usuario:usuario,
        email:email
    }
    axios.post(urlWebServices.forgotPass,user)
    .then(function (response) {
      setDisplay(false);
        if(response.data.data.docs.length !== 0){
          history.push({
            pathname: '/OlvidarseContraseña',
            state: response.data.data.docs
        })
      }else{
        setDisplay(true);
      }
    })
    .catch(function (error) {
      console.log(error)
      setDisplay(true);
    }); 
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#F2EFEB",}}>
        <div className={classes.paper}>
        <div className="logo">
          <img src={Logo} width="300" height="250" />
        </div>
          <Typography component="h1" variant="h4" style={{color:"black"}}>
          Recuperar contraseña
          </Typography>
          <Formik
                initialValues={{
                    usuario: '',
                    email: '',
                }}
                validationSchema={Yup.object().shape({
                    usuario: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    email: Yup.string()
                        .email('El email no es válido')
                        .required('El campo es obligatorio (*)'),
                })}
                onSubmit={fields => {
                handleSignIn(fields.usuario, fields.email)
              }}
                render={({ errors, status, touched, handleChange}) => (
                    <Form>
                      <div className={classes.inputForm}>
                        <div className="form-group">
                            <Field name="usuario" type="text"  autoComplete="off" placeholder="Nombre de usuario" className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />
                            <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="email" type="text"  autoComplete="off" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                        <div className="form-group">
                        {display && (
                            <Alert severity="error">El usuario o el email no son correctos.</Alert>)}
                            <button style={{backgroundColor:"#401801"}} type="submit" className="btn btn-primary mt-3 offset-0">SIGUIENTE</button>
                            <button style={{backgroundColor:"#401801"}} onClick={() => history.push({pathname: '/Login',})} className="btn btn-primary mt-3 ml-2 offset-0">CANCELAR</button>
                        </div>
                    </Form>
                )}
            />
            <Grid container>
              <Grid item xs>
              </Grid>
            </Grid>
            <Box mt={15}>
              <Copyright />
            </Box>
        </div>
      </Grid>
    </Grid>
  );
}
