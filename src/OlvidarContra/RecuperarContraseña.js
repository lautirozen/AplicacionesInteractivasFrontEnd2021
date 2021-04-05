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
import Background from "./Assets/RecuperarB.jpg";
import { Alert } from '@material-ui/lab';
import Logo from "./../components/Assets/Logo.png";
import { useHistory} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Button} from 'react-bootstrap';
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

export default function RecuperarContraseña() {
  const classes = useStyles();
  const history= useHistory();
  const [show, setShow] = useState(false);
  const [display, setDisplay]=useState(false);
  const handleClose = () =>{
    setShow(false);
    history.push({
        pathname: '/Login',
    })
  }
  const handleSignIn = (contraseña) => {
    const user={
        usuario:"admin",
        nombre:"Lautaro",
        apellido:"Rozen",
        contraseña:"123456",
        rol:"administrador",
        email:"lautirozen@gmail.com",
        pregunta:"Auto",
        respuesta:"astra",
    }
      if(contraseña===user.contraseña){
        setDisplay(true);
      }else{
        setDisplay(false);
        setShow(true);
      }   
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{backgroundColor:"#F2EFEB",}}>
        <div className={classes.paper}>
        <div className="logo">
          <img src={Logo} width="200" height="200" />
        </div>
          <Typography component="h1" variant="h4" style={{color:"black"}}>
          Recuperar contraseña
          </Typography>
          <Formik
                initialValues={{
                    contraseña: '',
                    confirmcontraseña: '',
                }}
                validationSchema={Yup.object().shape({
                    contraseña: Yup.string()
                        .matches(/\w*[a-z]\w*/,  "La contraseña debe tener al menos 1 minúscula")
                        .matches(/\w*[A-Z]\w*/,  "La contraseña debe tener al menos 1 mayúscula")
                        .matches(/\d/, "La contraseña debe tener al menos 1 número")
                        .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
                        .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
                        .required('La contraseña es obligatoria'),
                    confirmcontraseña: Yup.string()
                        .oneOf([Yup.ref('contraseña')], 'Las contraseñas no coinciden')
                        .required('La confirmación de contraseña es obligatoria'),
                })}
                onSubmit={fields => {
                handleSignIn(fields.contraseña)
              }}
                render={({ errors, status, touched, handleChange}) => (
                    <Form>
                      <div className={classes.inputForm}>
                      <div className="form-group">
                            <Field name="contraseña" type="password"  autoComplete="off" placeholder="Nueva Contraseña" className={'form-control' + (errors.contraseña && touched.contraseña ? ' is-invalid' : '')} />
                            <ErrorMessage name="contraseña" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="confirmcontraseña" type="password"  autoComplete="off" placeholder="Confirmar nueva Contraseña" className={'form-control' + (errors.confirmcontraseña && touched.confirmcontraseña ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmcontraseña" component="div" className="invalid-feedback" />
                        </div>
                      </div>
                        <div className="form-group">
                        {display && (
                            <Alert severity="error">La nueva contraseña no debe ser igual a la anterior.</Alert>)}
                            <button style={{backgroundColor:"#401801"}} type="submit" className="btn btn-primary mt-3 offset-0">CAMBIAR CONTRASEÑA</button>
                            <button style={{backgroundColor:"#401801"}} onClick={() => history.push({pathname: '/OlvidarseContraseña',})} className="btn btn-primary mt-3 ml-2 offset-0">VOLVER</button>
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
      <Modal size="lg" size="lg" style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Recuperar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">Se ha cambiado la contraseña.</Alert>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
                Cerrar
            </Button>
            </Modal.Footer>
            </Modal>
    </Grid>
  );
}
