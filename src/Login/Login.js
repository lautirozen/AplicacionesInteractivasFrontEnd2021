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
import Background from "./Assets/cocina.jpg";
import { Alert } from '@material-ui/lab';
import Logo from "./../components/Assets/Logo.png";
import { useHistory} from "react-router-dom";

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

export default function LogIn() {
  const classes = useStyles();
  const history= useHistory();
  const manageUsuario=(usuario,nombre,apellido,rol)=>{
    localStorage.setItem('user', JSON.stringify(usuario));//Guardo el apellido de usuario
    console.log(usuario)
    localStorage.setItem('nombre', JSON.stringify(nombre));//Guardo el apellido de usuario
    console.log(nombre)
    localStorage.setItem('apellido', JSON.stringify(apellido));//Guardo el apellido de usuario
    console.log(apellido)
    localStorage.setItem('rol', JSON.stringify(rol));//Guardo el apellido de usuario
    console.log(rol)
    if(rol==="usuario"){
    history.push({
      pathname: '/',
    })
  }else{
    history.push({
      pathname: '/HomeAdmin',
    })
  }
  }
  const [display, setDisplay]=useState(false);
  const handleSignIn = (usuario, contraseña) => {
    const user={
        usuario:"usuario",
        nombre:"Lautaro",
        apellido:"Rozen",
        contraseña:"123456",
        rol:"usuario",
    }
    const usera={
      usuario:"administrador",
      nombre:"German",
      apellido:"Boso",
      contraseña:"123456",
      rol:"administrador",
  }
      if(usuario===user.usuario && contraseña===user.contraseña){
          manageUsuario(user.usuario,user.nombre,user.apellido,user.rol)
      }else{
        if(usuario===usera.usuario || contraseña===usera.contraseña){
          manageUsuario(usera.usuario,usera.nombre,usera.apellido,usera.rol)
        }
        else{
          setDisplay(true);
        }   
    }
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
            Bienvenid@!
          </Typography>
          <Formik
                initialValues={{
                    usuario: '',
                    contraseña: '',
                }}
                validationSchema={Yup.object().shape({
                    usuario: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    contraseña: Yup.string()
                        .required('El campo es obligatorio (*)'),
                })}
                onSubmit={fields => {
                handleSignIn(fields.usuario, fields.contraseña)
                const user1={
                  usuario:"proveedor",
                  nombre:"Ricardo",
                  apellido:"Manuel",
                  contraseña:"123456",
              }
              }}
                render={({ errors, status, touched, handleChange}) => (
                    <Form>
                      <div className={classes.inputForm}>
                        <div className="form-group">
                            <Field name="usuario" type="text"  autoComplete="off" placeholder="Nombre de usuario" className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />
                            <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="contraseña" type="password"  autoComplete="off" placeholder="Contraseña"className={'form-control' + (errors.contraseña && touched.contraseña ? ' is-invalid' : '')} />
                            <ErrorMessage name="contraseña" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                        <div className="form-group">
                        {display && (
                            <Alert severity="error">El usuario o la contraseña son incorrectos.</Alert>)}
                            <button style={{backgroundColor:"#401801"}} type="submit" className="btn btn-primary mt-3 offset-0">INICIAR SESION</button>
                            <button style={{backgroundColor:"#401801"}} onClick={() => history.push({pathname: '/Productos',})} className="btn btn-primary mt-3 ml-2 offset-0">CANCELAR</button>
                        </div>
                    </Form>
                )}
            />
            <Grid container>
              <Grid item xs>
                <div  className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-0">
                <Link href="/OlvideContraseña" variant="body2" style={{color:"black"}}>
                  ¿Olvidaste tu contraseña?
                </Link>
                </div>
                <div  className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-0 ">
                <Link href="/Registrarse" variant="body2" style={{color:"black"}}>
                  ¿Primera vez que ingresas?
                </Link>
                </div>
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
