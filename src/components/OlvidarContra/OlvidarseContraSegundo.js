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
import Background from "./Assets/RecuperarA.jpg";
import { Alert } from '@material-ui/lab';
import Logo from "./../Assets/Logo.png";
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

export default function OlvidarseContraSegundo(props) {
  const classes = useStyles();
  const history= useHistory();
  const [display, setDisplay]=useState(false);
  const handleSignIn = (pregunta, respuesta) => {
    if(props.location.state[0] !== undefined){
      const user=props.location.state[0]
      if(pregunta!==user.pregunta || respuesta!==user.respuesta){
        setDisplay(true);
      }else{
        setDisplay(false);
          console.log(user.pregunta)
          console.log(pregunta)
          console.log(user.respuesta)
          console.log(respuesta)
        history.push({
            pathname: '/RecuperarContraseña',
            state: user
          })
      }
    }else{
      const user=props.location.state
      if(pregunta!==user.pregunta || respuesta!==user.respuesta){
        setDisplay(true);
      }else{
        setDisplay(false);
          console.log(user.pregunta)
          console.log(pregunta)
          console.log(user.respuesta)
          console.log(respuesta)
        history.push({
            pathname: '/RecuperarContraseña',
            state: user
          })
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
          Recuperar contraseña
          </Typography>
          <Formik
                initialValues={{
                    pregunta: '',
                    respuesta: '',
                }}
                validationSchema={Yup.object().shape({
                    pregunta: Yup.string()
                        .required('El campo es obligatorio (*)'),
                    respuesta: Yup.string()
                        .required('El campo es obligatorio (*)'),
                })}
                onSubmit={fields => {
                fields.respuesta = fields.respuesta.toLowerCase().trim();
                console.log(fields.respuesta, fields.pregunta)
                handleSignIn(fields.pregunta, fields.respuesta)
              }}
                render={({ errors, status, touched, handleChange}) => (
                    <Form>
                      <div className={classes.inputForm}>
                      <div className="form-group">
                        <Field as="select"
                            name="pregunta"
                            className={'form-control' + (errors.pregunta && touched.pregunta? ' is-invalid' : '')}
                        >
                            <option value="" label="Seleccione una pregunta de seguridad" />
                            <option value="Auto" label="¿Cuál fue su primer auto?" />
                            <option value="Mascota" label="¿Cuál es el nombre de tu mascota?" />
                            <option value="Secundaria" label="¿En qué año terminaste la secundaria?" />
                            <option value="Apodo" label="¿Cuál era su apodo de pequeño?" />
                            <option value="Vacaciones" label="¿Dónde fuiste de vacaciones el año pasado?" />
                        </Field>
                            <ErrorMessage name="pregunta" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="respuesta" type="text"  autoComplete="off" placeholder="Respuesta" className={'form-control' + (errors.respuesta && touched.respuesta ? ' is-invalid' : '')} />
                            <ErrorMessage name="respuesta" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                        <div className="form-group">
                        {display && (
                            <Alert severity="error">La pregunta o la respuesta no son correctas.</Alert>)}
                            <button style={{backgroundColor:"#401801"}} type="submit" className="btn btn-primary mt-3 offset-0">SIGUIENTE</button>
                            <button style={{backgroundColor:"#401801"}} onClick={() => history.push({pathname: '/OlvideContraseña',})} className="btn btn-primary mt-3 ml-2 offset-0">VOLVER</button>
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
