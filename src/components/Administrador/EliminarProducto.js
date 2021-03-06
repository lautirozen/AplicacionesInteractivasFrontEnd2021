import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavigationAdmin from '../NavbarAdmin';
import Footer from '../Footer';
import { Card, Image } from 'react-bootstrap';
//import { products } from '../Productos/products';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Alert } from '@material-ui/lab';
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import urlWebServices from "../controller/webServices";

const EliminarProducto = () => {
    const theme = createMuiTheme({
        palette: {
            secondary: {
                main: "#401801"
            }
        }
    })
    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        ModificarProducto: {
            backgroundColor: "#F2EFEB"
        },
        cardTotal: {
            backgroundColor: "#F2EFEB"
        },
        modify: {
            padding: 30,
        },
        title: {
            fontStyle: "italic",
            marginTop: "3rem",
            textAlign: "center",
            fontWeight: 'bold',
            marginBottom: "2rem",
        },
        medias: {
            height: 307,
            width: "98%"
        },
        cards: {
            padding: "2%",
            height: "31rem",
        },
        input: {
            width: "300px",
            height: "50px",
            backgroundColor: "#F2EFEB",
            marginBottom: "2rem"
        },
        footer: {
            marginTop: "8rem"
        },
    }));
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const classes = useStyles();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [mostrar, setMostrar] = useState(false);
    const [productoeli, setProductoeli] = useState("");
    const [showerror, setShowerror] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const onSearch = (buscar) => {
        products.map((product) => (
            setFilteredProducts(
                products.filter((product) =>
                    product.titulo.toLowerCase().includes(buscar.toLowerCase())
                ))
        ))
        setSearch(buscar)
    }
    useEffect(() => {
        setIsLoaded(true);
        axios.get(urlWebServices.allProducts,
            {
                mode: "cors",
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('token')),
                    'Access-control-Allow-Origin': true,
                },
            })
            .then(function (response) {
                setProducts(response.data.data.docs);
                setIsLoaded(false);
            })
            .catch(function (error) {
                console.log(error.message);
                setIsLoaded(false);
            });
    }, []);
    const eliminate = (producto) => {
        setProductoeli(producto)
        setMostrar(true)
    }
    const handlecerrar = () => {
        setMostrar(false);
    }
    const closeerror = () => {
        setShowerror(false);
    }
    const handledeshabilitar = () => {
        setMostrar(false);
        const productoid = {
            id: productoeli._id
        }
        axios.post(urlWebServices.disableProducts, productoid,
            {
                mode: "cors",
                headers: {
                    'x-access-token': JSON.parse(localStorage.getItem('token')),
                    'Access-control-Allow-Origin': true,
                },
            })
            .then(function (response) {
                setShowerror(false);
                setShow(true);
            })
            .catch(function (error) {
                console.log(error.message);
                setShowerror(true);
            });
    }
    const handleclose = () => {
        setShow(false);
        history.push("/HomeAdmin")
    }
    return (
        <div className={classes.ModificarProducto}>
            <NavigationAdmin />
            <div className={classes.modify}>
                <h2 className={classes.title}>Eliminar Producto</h2>
                <input
                    type="text"
                    placeholder="Buscar producto a eliminar"
                    className={classes.input}
                    onChange={(e) => { onSearch(e.target.value) }}
                />
                {(isLoaded ?
                    <MuiThemeProvider theme={theme}>
                        <LinearProgress color="secondary" />
                    </MuiThemeProvider> :
                    <Card class="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3" className={classes.cardTotal}>
                        <div class="col-12 row">
                            {(search === "") ?
                                products.map((product) => (
                                    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2 mt-5">
                                        <div class="card" key={product.id}>
                                            <div className={classes.cards}>
                                                <CardMedia><Image src={product.image} className={classes.medias} style={{ resizeMode: "contain" }} /></CardMedia>
                                                <CardContent>
                                                    <Typography gutterBottom style={{ textAlign: "left" }} variant="h5" component="h2">
                                                        <div style={{ fontFamily: "Georgia, serif" }}>
                                                            <h5>{product.titulo}</h5>
                                                        </div>
                                                        <h5>${product.precio}</h5>
                                                    </Typography>
                                                </CardContent>
                                                <div style={{ borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                                                <CardActionArea style={{ backgroundColor: "white", border: "0" }} class=" ml-auto mt-lg-3 mb-lg-3" onClick={() => { eliminate(product) }}>
                                                    {(product.stock === 0 ? <DeleteForeverIcon style={{ color: "red" }} /> : <DeleteForeverIcon />)} Eliminar
                                                </CardActionArea >
                                            </div>
                                        </div>
                                    </div>)) : null}
                            {(search !== "") ?
                                filteredProducts.map((product) =>
                                    <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2">
                                        <div className="products">
                                            <div class="card" key={product.id}>
                                                <div className={classes.cards}>
                                                    <CardMedia><Image src={product.image} className={classes.medias} style={{ resizeMode: "contain" }} /></CardMedia>
                                                    <CardContent>
                                                        <Typography gutterBottom style={{ textAlign: "left" }} variant="h5" component="h2">
                                                            <div style={{ fontFamily: "Georgia, serif" }}>
                                                                <h5>{product.titulo}</h5>
                                                            </div>
                                                            <h5>${product.precio}</h5>
                                                        </Typography>
                                                    </CardContent>
                                                    <div style={{ borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                                                    <CardActionArea style={{ backgroundColor: "white", border: "0" }} class=" ml-auto mt-3 " onClick={() => { eliminate(product) }}>
                                                        {(product.stock === 0 ? <DeleteForeverIcon style={{ color: "red" }} /> : <DeleteForeverIcon />)} Eliminar
                                                    </CardActionArea >
                                                </div>
                                            </div>
                                        </div>
                                    </div>) : null}
                        </div>
                    </Card>)}
            </div>
            <Modal size="lg" style={{ maxWidth: '1600px' }} show={mostrar} onHide={handlecerrar} >
                <Modal.Header closeButton>
                    <Modal.Title>??Est?? seguro que desea eliminar el producto?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert severity="warning">Al momento de eliminar un producto se eliminar?? la informaci??n asociada al mismo.</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <div class="row">
                        <Button variant="secondary" onClick={handledeshabilitar} style={{ backgroundColor: "#401801" }}>
                            Eliminar
                        </Button>
                        <Button variant="secondary" onClick={handlecerrar} style={{ backgroundColor: "#401801", marginLeft: "0.5rem" }}>
                            Cerrar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" style={{ maxWidth: '1600px' }} show={showerror} onHide={closeerror} >
                <Modal.Header closeButton>
                    <Modal.Title>Error al eliminar el producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert severity="error">Ha ocurrido un error al eliminar el producto.</Alert></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeerror} style={{ backgroundColor: "#401801", marginLeft: "0.5rem" }}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" style={{ maxWidth: '1600px' }} show={show} onHide={handleclose} >
                <Modal.Header closeButton>
                    <Modal.Title>Producto eliminar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert severity="success">El producto ha sido eliminado.</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleclose} style={{ backgroundColor: "#401801" }}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={classes.footer}>
                <Footer />
            </div>
        </div>
    );
}
export default EliminarProducto;
