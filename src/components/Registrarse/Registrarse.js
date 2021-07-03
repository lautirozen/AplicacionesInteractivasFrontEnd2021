import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Background from "./Assets/cocinaa.jpg";
import { Alert } from '@material-ui/lab';
import Logo from "./../Assets/Logo.png";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import urlWebServices from "../controller/webServices";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "black" }} align="center">
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
    margin: theme.spacing(9, 9),
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
    backgroundColor: " #BF6D3A",
  },
  inputForm: {
    marginTop: "30px",
    borderRadius: 10,
    borderColor: 'gray',
    width: '100%'
  }
}));

export default function Registrarse() {
  const history = useHistory();
  const classes = useStyles();
  const [display, setDisplay] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    history.push({
      pathname: '/Login'
    })
  }
  const Cancel = () => {
    history.push({
      pathname: '/Login',
    })
  }
  const handleRegister = (nombre_usuario, clave, nombre, apellido, email, pregunta, respuesta) => {
    if (nombre_usuario === "" || clave === "" || nombre === "" || apellido === "" || email === "" || pregunta === "" || respuesta === "") {
      setDisplay(true);
    } else {
      const usuario = {
        usuario: nombre_usuario,
        rol: "usuario",
        nombre: nombre,
        apellido: apellido,
        email: email,
        contraseña: clave,
        pregunta: pregunta,
        respuesta: respuesta,
      }
      axios.post(urlWebServices.register, usuario)
        .then(function (response) {
          setDisplay(false);
          setShow(true);
        })
        .catch(function (error) {
          setDisplay(true);
          console.log(error.message);
        });
    }
  };
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{ backgroundColor: "#F2EFEB", }}>
        <div className={classes.paper}>
          <div className="logo">
            <img src={Logo} width="300" height="250" />
          </div>
          <Typography component="h1" variant="h4" style={{ color: "black" }}>
            Vamos a Registrarte
          </Typography>
          <Formik
            initialValues={{
              usuario: '',
              nombre: '',
              apellido: '',
              email: '',
              contraseña: '',
              confirmcontraseña: '',
              pregunta: '',
              respuesta: '',
            }}
            validationSchema={Yup.object().shape({
              usuario: Yup.string()
                .required('El campo es obligatorio (*)'),
              nombre: Yup.string()
                .required('El campo es obligatorio (*)')
                .matches(/^[A-Za-z ]*$/, 'Ingrese únicamente letras'),
              apellido: Yup.string()
                .required('El campo es obligatorio (*)')
                .matches(/^[A-Za-z ]*$/, 'Ingrese únicamente letras'),
              contraseña: Yup.string()
                .matches(/\w*[a-z]\w*/, "La contraseña debe tener al menos 1 minúscula")
                .matches(/\w*[A-Z]\w*/, "La contraseña debe tener al menos 1 mayúscula")
                .matches(/\d/, "La contraseña debe tener al menos 1 número")
                .matches(/[#$%*_=+]/, "La contraseña debe tener al menos 1 símbolo (# $ % * _ = +)")
                .min(8, ({ min }) => `La contraseña debe ser de al menos ${min} caracteres`)
                .required('La contraseña es obligatoria'),
              confirmcontraseña: Yup.string()
                .oneOf([Yup.ref('contraseña')], 'Las contraseñas no coinciden')
                .required('La confirmación de contraseña es obligatoria'),
              email: Yup.string()
                .email('El email no es válido')
                .required('El campo es obligatorio (*)'),
              pregunta: Yup.string()
                .required('El campo es obligatorio (*)'),
              respuesta: Yup.string()
                .required('El campo es obligatorio (*)'),
            })}
            onSubmit={fields => {
              fields.respuesta = fields.respuesta.toLowerCase().trim();
              handleRegister(fields.usuario, fields.contraseña, fields.nombre, fields.apellido, fields.email, fields.pregunta, fields.respuesta)
            }}
            render={({ errors, status, touched, handleChange }) => (
              <Form>
                <div className={classes.inputForm}>
                  <div className="form-group">
                    <Field name="usuario" type="text" autoComplete="off" placeholder="Nombre de usuario" className={'form-control' + (errors.usuario && touched.usuario ? ' is-invalid' : '')} />
                    <ErrorMessage name="usuario" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <Field name="nombre" type="text" autoComplete="off" placeholder="Nombre completo" className={'form-control' + (errors.nombre && touched.nombre ? ' is-invalid' : '')} />
                    <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <Field name="apellido" type="text" autoComplete="off" placeholder="Apellido" className={'form-control' + (errors.apellido && touched.apellido ? ' is-invalid' : '')} />
                    <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <Field name="email" type="text" autoComplete="off" placeholder="Email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <Field as="select"
                      name="pregunta"
                      className={'form-control' + (errors.pregunta && touched.pregunta ? ' is-invalid' : '')}
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
                    <Field name="respuesta" type="text" autoComplete="off" placeholder="Respuesta" className={'form-control' + (errors.respuesta && touched.respuesta ? ' is-invalid' : '')} />
                    <ErrorMessage name="respuesta" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <Field name="contraseña" type="password" autoComplete="off" placeholder="Contraseña" className={'form-control' + (errors.contraseña && touched.contraseña ? ' is-invalid' : '')} />
                    <ErrorMessage name="contraseña" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <Field name="confirmcontraseña" type="password" autoComplete="off" placeholder="Confirmar Contraseña" className={'form-control' + (errors.confirmcontraseña && touched.confirmcontraseña ? ' is-invalid' : '')} />
                    <ErrorMessage name="confirmcontraseña" component="div" className="invalid-feedback" />
                  </div>
                  {display && (<Alert severity="error">Ha ocurrido un error al registrar el usuario.</Alert>)}
                </div>
                <div className="form-group">
                  <button style={{ backgroundColor: "#401801" }} type="submit" className="btn btn-primary mt-3">REGISTRARSE</button>
                  <button style={{ backgroundColor: "#401801" }} onClick={Cancel} className="btn btn-primary ml-3 mt-3" >CANCELAR</button>
                </div>
              </Form>
            )}
          />
          <Box mt={15}>
            <Copyright />
          </Box>
        </div>
      </Grid>
      <Modal size="lg" size="lg" style={{ maxWidth: '1600px' }} show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Usuario registrado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert severity="success">El usuario ha sido registrado exitosamente.</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#401801" }}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Grid>
  );
}
