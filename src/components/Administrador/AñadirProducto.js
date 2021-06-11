import React, {useState} from 'react';
import NavigationAdmin from '../NavbarAdmin';
import {Button, Card} from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import Footer from '../Footer';
import { useHistory} from "react-router-dom";

const AñadirProducto  = () => { 

    const [show,setShow]=useState(false);
    const [elementoAAgregar, setElementoAAgregar]=useState("");
    const history= useHistory();
    const[imagen,setImagen]=useState(null);
    const [imgData, setImgData] = useState(null);
    const CrearArticulo =(Titulo,Categoria,Precio, Marca, Descripcion, Codigo, Stock)=>{
        const catalogo={
            titulo:Titulo,
            categoria:Categoria,
            precio:Precio,
            marca:Marca,
            descripcion:Descripcion,
            codigo:Codigo,
            stock:Stock,
            image:imgData,
        }
        setElementoAAgregar(catalogo)
        setShow(true)
    }

    const useStyles = makeStyles((theme) => ({
    Addproduct:{
        backgroundColor:"#F2EFEB"
    },
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
        backgroundColor:"#F2EFEB",
        padding:30,
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
    }
    }));

    const handleClose = () =>{
    setShow(false);
    history.push({
    pathname: '/HomeAdmin'})
    }
    const handleShow = () => setShow(true);
        const onDrop = e => {
            if (e.target.files[0]) {
              console.log("picture: ", URL.createObjectURL(e.target.files[0]));
              setImagen(e.target.files[0]);
              setImgData(URL.createObjectURL(e.target.files[0]))
            }
        };
    const CustomInputComponent = (props) => (
            <textarea className="form-control" cols={5} rows={5} type="text" autoComplete="off" {...props} />
        );
    const Number = /^[0-9]+$/;
    const classes = useStyles(); 
    return (
    <div className={classes.Addproduct}>
        <NavigationAdmin />
        <div className={classes.modify}>
            <div><h2 className={classes.title}>Añadir Producto</h2>
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 offset-md-2">
                            <Formik
                            initialValues={{
                            titulo: '',
                            categoria:'',
                            precio:'',
                            marca:'',
                            descripcion: '',
                            codigo: '',
                            stock:'' ,
                            }}
                            validationSchema={Yup.object().shape({
                            titulo: Yup.string()
                            .required('El campo es obligatorio (*)')
                            .min(32, ({ min }) => `El título debe tener almenos ${min} caracteres`),
                            descripcion: Yup.string()
                            .required('El campo es obligatorio (*)'),
                            marca: Yup.string()
                            .required('El campo es obligatorio (*)'),
                            precio: Yup.string()
                            .matches(Number,'Ingrese únicamente números')
                            .required('El campo es obligatorio (*)'),
                            stock: Yup.string()
                            .matches(Number,'Ingrese únicamente números')
                            .required('El campo es obligatorio (*)'),
                            categoria:Yup.string()
                            .required('El campo es obligatorio (*)')
                            .matches(/^[A-Za-z ]*$/,'Ingrese únicamente letras'),
                            codigo: Yup.string()
                            .required('El campo es obligatorio (*)'),
                            })}
                            onSubmit={fields => {
                            console.log('holas sdasdafgds')
                            CrearArticulo(fields.titulo, fields.categoria, fields.precio, fields.marca, fields.descripcion, fields.codigo, fields.stock)
                            }}
                            render={({ errors, status, touched }) => (
                            <Card style={{backgroundColor:"#F2EFEB"}} className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                            <div className={classes.modify}>
                            <Form>
                      <div className={classes.inputForm}>
                        <div className="form-group">
                            <Field name="titulo" type="text" autoComplete="off" placeholder="Titulo del producto" className={'form-control' + (errors.titulo && touched.titulo ? ' is-invalid' : '')} />
                            <ErrorMessage name="titulo" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field as="select"
                                name="categoria"
                                className={'form-control' + (errors.categoria && touched.categoria? ' is-invalid' : '')}
                            >
                                <option value="" label="Seleccione una categoria" />
                                <option value="cafe y te" label="Café y té" />
                                <option value="cubierto" label="Cubiertos" />
                                <option value="mantel" label="Mantelería" />
                                <option value="ollas y sartenes" label="Ollas y Sartenes" />
                                <option value="reposteria" label="Repostería" />
                                <option value="termos y mates" label="Termos y Mates" />
                                <option value="utensilio" label="Utensilios" />
                                <option value="vajilla" label="Vajilla" />
                                <option value="vasos y copas" label="Vasos y Copas" />
                            </Field>
                            <ErrorMessage name="categoria" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="descripcion" as={CustomInputComponent} placeholder="Descripcion" className={'form-control' + (errors.descripcion && touched.descripcion ? ' is-invalid' : '')}/>
                            <ErrorMessage name="descripcion" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field as="select"
                                name="marca"
                                className={'form-control' + (errors.marca && touched.marca? ' is-invalid' : '')}
                            >
                                <option value="" label="Seleccione una marca" />
                                <option value="Bialetti" label="Bialetti" />
                                <option value="Hudson" label="Hudson" />
                                <option value="KitchenAid" label="KitchenAid" />
                                <option value="Libbey" label="Libbey" />
                                <option value="Mica" label="Mica" />
                                <option value="Nadir Argentina" label="Nadir Argentina" />
                                <option value="Park Design" label="Park Design" />
                                <option value="Porcelana Tsuji" label="Porcelana Tsuji" />
                                <option value="Pyrex" label="Pyrex" />
                                <option value="Stanley" label="Stanley" />
                                <option value="Tomorrow´s Kitchen" label="Tomorrow´s Kitchen" />
                                <option value="Tramontina" label="Tramontina" />
                            </Field>
                            <ErrorMessage name="marca" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="precio" type="text"  autoComplete="off" placeholder="Precio ($)" className={'form-control' + (errors.precio && touched.precio ? ' is-invalid' : '')} />
                            <ErrorMessage name="precio" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="codigo" type="text"  autoComplete="off" placeholder="Codigo" className={'form-control' + (errors.codigo && touched.codigo ? ' is-invalid' : '')} />
                            <ErrorMessage name="codigo" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <Field name="stock" type="text"  autoComplete="off" placeholder="Stock" className={'form-control' + (errors.stock && touched.stock ? ' is-invalid' : '')} />
                            <ErrorMessage name="stock" component="div" className="invalid-feedback" />
                        </div>
                            <h6 style={{textAlign:"left"}}>Imagen</h6>
                            <div class="col-lg-2 mr-auto">
                                <div class="col-lg-12">
                                    <input style={{marginTop:"2rem"}} id="imagenproducto" type="file" onChange={onDrop} />
                                </div>
                                <div class="col-lg-12" style={{marginTop:"2rem"}}>
                                    <img className="imagen" width="200px" src={imgData} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button style={{backgroundColor:"#401801"}} type="submit" className="btn btn-primary mt-3">Añadir Producto</button>
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
    <Modal size="lg"  style={{maxWidth: '1600px'}}show={show} onHide={handleClose} >
    <Modal.Header closeButton>
    <Modal.Title>Producto creado</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Alert severity="success">El producto ha sido creado exitosamente.</Alert><br />
    Los datos del producto son los siguientes: <br />
    <img width="120px" src={elementoAAgregar.image} /><br />
    <h7 style={{fontWeight: 'bold'}}>Título: </h7>{elementoAAgregar.titulo}​​<br />
    <h7 style={{fontWeight: 'bold'}}>Categoria: </h7> {elementoAAgregar.categoria}​​ <br />
    <h7 style={{fontWeight: 'bold'}}>Precio: </h7>$ {elementoAAgregar.precio}​​<br />
    <h7 style={{fontWeight: 'bold'}}>Marca: </h7>{elementoAAgregar.marca}​​<br />
    <h7 style={{fontWeight: 'bold'}}>Descripcion: </h7>{elementoAAgregar.descripcion}​​<br />
    <h7 style={{fontWeight: 'bold'}}>Código: </h7>{elementoAAgregar.codigo}​​<br />
    <h7 style={{fontWeight: 'bold'}}>Stock: </h7>{elementoAAgregar.stock}​​<br />
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#401801"}}>
    Cerrar
    </Button>
    </Modal.Footer>
    </Modal>
    <Footer />
    </div>
    );
}
export default AñadirProducto;