import React, { useState, useEffect } from 'react';
import NavigationAdmin from '../NavbarAdmin';
import { Button, Card } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import Footer from '../Footer';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import urlWebServices from '../controller/webServices';

const ModificarProducto = (props) => {
    const [productoModificar] = useState(props.location.state);
    const [show, setShow] = useState(false);
    const [elementoAAgregar, setElementoAAgregar] = useState("");
    const history = useHistory();
    const [imagen, setImagen] = useState(null);
    const [imgData, setImgData] = useState(productoModificar.image);
    const [display, setDisplay] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    const ModificarArticulo = (Titulo, Categoria, Precio, Marca, Descripcion, Codigo, Stock) => {
        if (Categoria !== productoModificar.categoria || Precio !== productoModificar.precio || Marca !== productoModificar.marca || Descripcion !== productoModificar.descripcion || Codigo !== productoModificar.codigo || Stock !== productoModificar.stock || imgData !== productoModificar.image) {
            setDisplay(false)
            if (imagen !== null) {
                var form = new FormData();
                form.set('titulo', Titulo);
                form.set('categoria', Categoria);
                form.set('precio', Precio);
                form.set('marca', Marca);
                form.set('descripcion', Descripcion);
                form.set('codigo', Codigo);
                form.set('stock', Stock);
                form.append('image', imagen);
                form.set('cantidad', 1);
                form.set('ptotal', 0);
                axios.post(urlWebServices.updateProducts, form,
                    {
                        mode: "cors",
                        headers: {
                            'x-access-token': JSON.parse(localStorage.getItem('token')),
                            'Access-control-Allow-Origin': true,
                            'Accept': 'application/form-data',
                        },
                    })
                    .then(function (response) {
                        setElementoAAgregar(response.data.data);
                        setShow(true)
                    })
                    .catch(function (error) {
                        setDisplay(true);
                        console.log(error.message);
                    });
            } else {
                var form = new FormData();
                form.set('titulo', Titulo);
                form.set('categoria', Categoria);
                form.set('precio', Precio);
                form.set('marca', Marca);
                form.set('descripcion', Descripcion);
                form.set('codigo', Codigo);
                form.set('stock', Stock);
                form.set('image', productoModificar.image);
                form.set('cloudinary_id', productoModificar.cloudinary_id);
                form.set('cantidad', 1);
                form.set('ptotal', 0);
                axios.post(urlWebServices.updateProducts, form,
                    {
                        mode: "cors",
                        headers: {
                            'x-access-token': JSON.parse(localStorage.getItem('token')),
                            'Access-control-Allow-Origin': true,
                            'Accept': 'application/form-data',
                        },
                    })
                    .then(function (response) {
                        setElementoAAgregar(response.data.data);
                        setShow(true)
                    })
                    .catch(function (error) {
                        setDisplay(true);
                        console.log(error.message);
                    });
            }
        } else {
            setDisplay(true)
        }
    }

    const useStyles = makeStyles((theme) => ({
        Addproduct: {
            backgroundColor: "#F2EFEB"
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
            backgroundColor: "#F2EFEB",
            padding: 30,
        },
        title: {
            fontStyle: "italic",
            marginTop: "3rem",
            textAlign: "center",
            fontWeight: 'bold',
            marginBottom: "2rem",
        },
        space: {
            marginTop: "15px",
        }
    }));

    const handleClose = () => {
        setShow(false);
        history.push({
            pathname: '/HomeAdmin'
        })
    }
    const handleShow = () => setShow(true);
    const onDrop = e => {
        if (e.target.files[0]) {
            setImagen(e.target.files[0]);
            setImgData(URL.createObjectURL(e.target.files[0]))
        }
    };
    const Number = /^[0-9]+$/;
    const CustomInputComponent = (props) => (
        <textarea className="form-control" cols={5} rows={5} type="text" autoComplete="off" {...props} />
    );
    const classes = useStyles();
    return (
        <div className={classes.Addproduct}>
            <NavigationAdmin />
            <div className={classes.modify}>
                <div><h2 className={classes.title}>Modificar Producto</h2>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 offset-md-2">
                                <Formik
                                    initialValues={{
                                        titulo: productoModificar.titulo,
                                        categoria: productoModificar.categoria,
                                        precio: productoModificar.precio,
                                        marca: productoModificar.marca,
                                        descripcion: productoModificar.descripcion,
                                        codigo: productoModificar.codigo,
                                        stock: productoModificar.stock,
                                    }}
                                    validationSchema={Yup.object().shape({
                                        titulo: Yup.string()
                                            .required('El campo es obligatorio (*)')
                                            .min(32, ({ min }) => `El t??tulo debe tener almenos ${min} caracteres`),
                                        descripcion: Yup.string()
                                            .required('El campo es obligatorio (*)'),
                                        marca: Yup.string()
                                            .required('El campo es obligatorio (*)'),
                                        precio: Yup.string()
                                            .required('El campo es obligatorio (*)')
                                            .matches(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/, 'Ingrese ??nicamente n??meros'),
                                        stock: Yup.string()
                                            .matches(Number, 'Ingrese ??nicamente n??meros')
                                            .required('El campo es obligatorio (*)'),
                                        categoria: Yup.string()
                                            .required('El campo es obligatorio (*)')
                                            .matches(/^[A-Za-z ]*$/, 'Ingrese ??nicamente letras'),
                                        codigo: Yup.string()
                                            .required('El campo es obligatorio (*)'),
                                    })}
                                    onSubmit={fields => {
                                        ModificarArticulo(fields.titulo, fields.categoria, fields.precio, fields.marca, fields.descripcion, fields.codigo, fields.stock)
                                    }}
                                    render={({ errors, status, touched }) => (
                                        <Card style={{ backgroundColor: "#F2EFEB" }} className="col-sm-12 col-md-12 offset-md-2 col-lg-12 offset-lg-2">
                                            <div className={classes.modify}>
                                                <Form>
                                                    <div className={classes.inputForm}>
                                                        <div className="form-group" class="text-left mb-3 mt-3">
                                                            <label htmlFor="titulo">T??tulo del producto</label>
                                                            <Field name="titulo" type="text" autoComplete="off" disabled placeholder="Titulo del producto" className={'form-control' + (errors.titulo && touched.titulo ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="titulo" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group" class="text-left  mb-3 mt-3">
                                                            <label htmlFor="categoria">Seleccione una categor??a</label>
                                                            <Field as="select"
                                                                name="categoria"
                                                                className={'form-control' + (errors.categoria && touched.categoria ? ' is-invalid' : '')}
                                                            >
                                                                <option value="" label="Seleccione una categoria" />
                                                                <option value="cafe y te" label="Caf?? y t??" />
                                                                <option value="cubierto" label="Cubiertos" />
                                                                <option value="mantel" label="Manteler??a" />
                                                                <option value="ollas y sartenes" label="Ollas y Sartenes" />
                                                                <option value="reposteria" label="Reposter??a" />
                                                                <option value="termos y mates" label="Termos y Mates" />
                                                                <option value="utensilio" label="Utensilios" />
                                                                <option value="vajilla" label="Vajilla" />
                                                                <option value="vasos y copas" label="Vasos y Copas" />
                                                            </Field>
                                                            <ErrorMessage name="categoria" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group" class="text-left  mb-3 mt-3">
                                                            <label htmlFor="categoria">Descripci??n</label>
                                                            <Field name="descripcion" as={CustomInputComponent} autoComplete="off" placeholder="Descripcion" className={'form-control' + (errors.descripcion && touched.descripcion ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="descripcion" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group" class="text-left  mb-3 mt-3">
                                                            <label htmlFor="categoria">Seleccione una marca</label>
                                                            <Field as="select"
                                                                name="marca"
                                                                className={'form-control' + (errors.marca && touched.marca ? ' is-invalid' : '')}
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
                                                                <option value="Tomorrow??s Kitchen" label="Tomorrow??s Kitchen" />
                                                                <option value="Tramontina" label="Tramontina" />
                                                            </Field>
                                                            <ErrorMessage name="marca" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group" class="text-left  mb-3 mt-3">
                                                            <label htmlFor="categoria">Precio ($)</label>
                                                            <Field name="precio" type="text" autoComplete="off" placeholder="Precio ($)" className={'form-control' + (errors.precio && touched.precio ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="precio" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group" class="text-left  mb-3 mt-3">
                                                            <label htmlFor="categoria">C??digo</label>
                                                            <Field name="codigo" type="text" autoComplete="off" placeholder="Codigo" className={'form-control' + (errors.codigo && touched.codigo ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="codigo" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <div className="form-group" class="text-left  mb-3 mt-3">
                                                            <label htmlFor="categoria">Stock</label>
                                                            <Field name="stock" type="text" autoComplete="off" placeholder="Stock" className={'form-control' + (errors.stock && touched.stock ? ' is-invalid' : '')} />
                                                            <ErrorMessage name="stock" component="div" className="invalid-feedback" />
                                                        </div>
                                                        <h6 style={{ textAlign: "left" }}>Imagen</h6>
                                                        <div class="col-lg-2 mr-auto">
                                                            <div class="col-lg-12">
                                                                <input style={{ marginTop: "2rem" }} id="imagenproducto" type="file" onChange={onDrop} />
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2 mr-auto">
                                                            <div class="col-lg-12" style={{ marginTop: "2rem" }}>
                                                                <img className="imagen" width="200px" src={imgData} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {display && (<Alert severity="error">Ha ocurrido un error al modificar el producto.</Alert>)}
                                                    <div className="form-group">
                                                        <button style={{ backgroundColor: "#401801" }} type="submit" className="btn btn-primary mt-3">Modificar Producto</button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Card>)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal size="lg" style={{ maxWidth: '1600px' }} show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Producto modificado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert severity="success">El producto ha sido modificado exitosamente.</Alert><br />
                    Los datos del producto son los siguientes: <br />
                    <img width="120px" src={elementoAAgregar.image} /><br />
                    <h7 style={{ fontWeight: 'bold' }}>T??tulo: </h7>{elementoAAgregar.titulo}??????<br />
                    <h7 style={{ fontWeight: 'bold' }}>Categoria: </h7> {elementoAAgregar.categoria}?????? <br />
                    <h7 style={{ fontWeight: 'bold' }}>Precio: </h7>$ {elementoAAgregar.precio}??????<br />
                    <h7 style={{ fontWeight: 'bold' }}>Marca: </h7>{elementoAAgregar.marca}??????<br />
                    <h7 style={{ fontWeight: 'bold' }}>Descripcion: </h7>{elementoAAgregar.descripcion}??????<br />
                    <h7 style={{ fontWeight: 'bold' }}>C??digo: </h7>{elementoAAgregar.codigo}??????<br />
                    <h7 style={{ fontWeight: 'bold' }}>Stock: </h7>{elementoAAgregar.stock}??????<br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#401801" }}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Footer />
        </div>
    );
}
export default ModificarProducto;
