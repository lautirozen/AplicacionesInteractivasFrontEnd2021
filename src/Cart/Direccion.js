import React, {useState } from 'react';
import Navigation from '../components/Navbar';
import NavigationLog from '../components/NavCart';
import { Card} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import { useHistory} from "react-router-dom";


function Dirrecion (props){
    const [totalprecio]=useState(props.location.state);
    var user =JSON.parse(localStorage.getItem('user'));
    const history= useHistory();
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          marginBottom: theme.spacing(2),
          width: 200,
        },
        modify: {
            padding:30,
            backgroundColor:"#F2EFEB"
        },
        title:{
            fontStyle:"italic", 
            marginTop:"3rem",
            textAlign:"center",
            fontWeight: 'bold',
            marginBottom:"2rem",
        },
        space:{
            marginTop:"15px",
        },
        dirrecion:{
            backgroundColor:"#F2EFEB"
        }
      }));
    const Number = /^[0-9]+$/;
    const classes = useStyles();
    
        return (
            <div className={classes.dirrecion}>
                 {(user===null)?
                <Navigation />: <NavigationLog />}
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Información de envío</h2>
                <div class="container">
            <div class="row">
                <div class="col-md-6 offset-md-2">
                <Formik
            initialValues={{
                nombre: "",
                apellido: "",
                dni: "",
                domicilio_ciudad: "",
                domicilio_calle: "",
                domicilio_numero: "",
                domicilio_barrio: "",
                piso: "",
                cp: ""
            }}
            validationSchema={Yup.object().shape({
                
                nombre: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                apellido: Yup.string()
                    .required('El campo es obligatorio (*)')
                    .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                dni: Yup.string()
                    .matches(Number,'Ingrese únicamente números')
                    .required('El campo es obligatorio (*)')
                    .min(7, 'El DNI ingresado no es correcto')
                    .max(8, 'El DNI ingresado no es correcto'),
                domicilio_ciudad:Yup.string()
                .required('El campo es obligatorio (*)'),
                domicilio_calle: Yup.string()
                .required('El campo es obligatorio (*)'),
                domicilio_barrio:Yup.string()
                .required('El campo es obligatorio (*)'),
                domicilio_numero:Yup.string()
                .required('El campo es obligatorio (*)')
                .matches(Number,'Ingrese únicamente números'),
                piso:Yup.string()
                .required('El campo es obligatorio (*)'),
                cp:Yup.string()
                .required('El campo es obligatorio (*)')
                .matches(Number,'Ingrese únicamente números'),
            })}
            onSubmit={fields => {
                const datosenvio = {
                    nombre:fields.nombre,
                    apellido:fields.apellido,
                    dni:fields.dni,
                    domicilio_ciudad:fields.domicilio_ciudad,
                    domicilio_barrio:fields.domicilio_barrio,
                    domicilio_calle:fields.domicilio_calle,
                    domicilio_numero:fields.domicilio_numero,
                    piso:fields.piso,
                    cp:fields.cp,
                    totalprecio:totalprecio
                }
                console.log(datosenvio)
                history.push({pathname:"/Carrito/Formulario/Resumen", state:(datosenvio)})
            }}
            render={({ errors, status, touched }) => (
                <Card style={{backgroundColor:"#F2EFEB"}} className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                <div className={classes.modify}>
                <Form>
                    <div className="form-group" class="text-left">
                        <label htmlFor="nombre">Nombre Completo</label>
                        <Field name="nombre" style={{backgroundColor:"#F2EFEB"}} type="text" autoComplete="off"  className={'form-control' + (errors.nombre && touched.nombre ? ' is-invalid' : '')} />
                        <ErrorMessage name="nombre" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="apellido">Apellido</label>
                        <Field name="apellido" style={{backgroundColor:"#F2EFEB"}} type="text" autoComplete="off" className={'form-control' + (errors.apellido && touched.apellido ? ' is-invalid' : '')} />
                        <ErrorMessage name="apellido" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="dni">DNI</label>
                        <Field name="dni" type="text"  style={{backgroundColor:"#F2EFEB"}} autoComplete="off" className={'form-control' + (errors.dni&& touched.dni ? ' is-invalid' : '')} />
                        <ErrorMessage name="dni" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="domicilio_ciudad">Ciudad</label>
                        <Field name="domicilio_ciudad" style={{backgroundColor:"#F2EFEB"}} autoComplete="off"  type="text" className={'form-control' + (errors.domicilio_ciudad && touched.domicilio_ciudad ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_ciudad" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="domicilio_calle">Domicilio (calle)</label>
                        <Field name="domicilio_calle" style={{backgroundColor:"#F2EFEB"}} autoComplete="off"  type="text" className={'form-control' + (errors.domicilio_calle&& touched.domicilio_calle ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_calle" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="domicilio_numero">Altura</label>
                        <Field name="domicilio_numero" style={{backgroundColor:"#F2EFEB"}} autoComplete="off" type="text" className={'form-control' + (errors.domicilio_numero&& touched.domicilio_numero ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_numero" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="piso">Piso/Departamento</label>
                        <Field name="piso" type="text" style={{backgroundColor:"#F2EFEB"}} autoComplete="off" className={'form-control' + (errors.piso && touched.piso? ' is-invalid' : '')} />
                        <ErrorMessage name="piso" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="cp">Código postal</label>
                        <Field name="cp" type="text" style={{backgroundColor:"#F2EFEB"}} autoComplete="off" className={'form-control' + (errors.cp&& touched.cp ? ' is-invalid' : '')} />
                        <ErrorMessage name="cp" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-left">
                        <label htmlFor="domicilio_barrio">Barrio</label>
                        <Field name="domicilio_barrio" style={{backgroundColor:"#F2EFEB"}} autoComplete="off" type="text" className={'form-control' + (errors.domicilio_barrio&& touched.domicilio_barrio ? ' is-invalid' : '')} />
                        <ErrorMessage name="domicilio_barrio" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group" class="text-right">
                        <button onClick={() => {history.push("/Carrito")}} className="btn btn-primary mr-2" style={{backgroundColor: "#401801", marginTop:"15px"}}>Volver</button>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor: "#401801", marginTop:"15px"}}>Siguiente</button>
                    </div>
                </Form>
                </div>
                </Card>
            )}
        />
                </div>
            </div>
            </div>
            </div>     
            </div>
            <Footer />
            </div>
        );
    }

export default Dirrecion;