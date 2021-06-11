import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import NavigationAdmin from '../NavbarAdmin';
import Footer from '../Footer';
import {Card} from 'react-bootstrap';
import { products } from '../Productos/products';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory} from "react-router-dom";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'react-bootstrap';
import { Alert } from '@material-ui/lab';

const DeshabilitarProducto  = () => { 
    const useStyles=makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        ModificarProducto: {
            backgroundColor:"#F2EFEB"
        },
        cardTotal: {
            backgroundColor:"#F2EFEB"
        },
        modify: {
            padding:30,
        },
        title:{
            fontStyle:"italic",
            marginTop:"3rem",
            textAlign:"center",
            fontWeight: 'bold',
            marginBottom:"2rem",
        },
        medias:{
            height:307,
        },
        cards:{
            padding:"2%",
            height:"31rem",
        },
        input:{
            width:"300px",
            height:"50px",
            backgroundColor:"#F2EFEB",
            marginBottom:"2rem"
          },
        footer:{
            marginTop:"8rem"
        },
      }));
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState("");
    const classes = useStyles();
    const history= useHistory();
    const [show, setShow]=useState(false);
    const [mostrar, setMostrar]=useState(false);
    const onSearch = (buscar) =>{
        console.log(buscar)
        setSearch(buscar)
    }
    useEffect(() => {
        products.map((product) => (
          setFilteredProducts(
          products.filter((product) =>
          product.titulo.toLowerCase().includes(search.toLowerCase())
          ))
        ))
    },[search,products]);
    const eliminate = () =>{
       setMostrar(true)
      }
    const handlecerrar = () =>{
        setMostrar(false);
    }
    const handledeshabilitar = () =>{
        setMostrar(false);
        setShow(true);
    }
    const handleclose = () =>{
        setShow(false);
        history.push("/HomeAdmin")
    }
    return (
    <div className={classes.ModificarProducto}>
        <NavigationAdmin />
        <div className={classes.modify}>
            <h2 className={classes.title}>Deshabilitar Producto</h2>
            <input
                type="text"
                placeholder="Buscar producto a deshabilitar"
                className={classes.input}
                onChange={(e) =>{onSearch(e.target.value)}}
            />
            <Card class="col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3" className={classes.cardTotal}>
                <div class="col-12 row">
                    {(search==="")?
                    products.map((product) => (
                        <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2 mt-5">
                            <div class="card" key={product.id}>
                                <div className={classes.cards}>
                                    <CardMedia
                                        className={classes.medias}
                                        image={product.image}
                                        />
                                    <CardContent>
                                        <Typography gutterBottom style={{textAlign:"left"}} variant="h5" component="h2">
                                            <div style={{fontFamily:"Georgia, serif"}}>
                                                <h5>{product.titulo}</h5>
                                            </div>
                                            <h5>${product.precio}</h5>
                                        </Typography>
                                    </CardContent>
                                    <div style={{borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                                        <CardActionArea style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-lg-3 mb-lg-3"  onClick={() => {eliminate(product)}}>
                                            <DeleteForeverIcon /> Deshabilitar
                                        </CardActionArea >
                                </div>
                            </div>
                        </div>)): console.log("no")}
                        {(search!=="")?
                        filteredProducts.map((product) => 
                        <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2">
                            <div className="products">
                                <div class="card" key={product.id}>
                                    <div className={classes.cards}>
                                        <CardMedia
                                            className={classes.medias}
                                            image={product.image}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom style={{textAlign:"left"}}variant="h5" component="h2">
                                            <div style={{fontFamily:"Georgia, serif"}}>
                                                <h5>{product.titulo}</h5>
                                            </div>
                                            <h5>${product.precio}</h5>
                                            </Typography>
                                        </CardContent>
                                        <div style={{borderTop: "2px solid #808080	", marginLeft: 5, marginRight: 5 }}></div>
                                                <CardActionArea style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3 "  onClick={() => {eliminate(product)}}>
                                                    <DeleteForeverIcon /> Deshabilitar
                                                </CardActionArea >
                                        </div>
                                </div>
                            </div>
                        </div>): console.log("no")}
                </div>
            </Card>
        </div>
        <Modal size="lg" style={{maxWidth: '1600px'}} show={mostrar} onHide={handlecerrar} >
            <Modal.Header closeButton>
            <Modal.Title>¿Está seguro que desea deshabilitar el producto?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="warning">Al momento de deshabilitar un producto se deshabilitará la información asociada al mismo.</Alert>
            </Modal.Body>
            <Modal.Footer>
            <div class="row">
                <Button variant="secondary" onClick={handledeshabilitar}  style={{backgroundColor: "#401801"}}>
                    Deshabilitar
                </Button>
                <Button variant="secondary" onClick={handlecerrar} style={{backgroundColor: "#401801", marginLeft:"0.5rem"}}>
                    Cerrar
                </Button>
            </div>
            </Modal.Footer>
        </Modal>
        <Modal size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleclose} >
            <Modal.Header closeButton>
            <Modal.Title>Producto deshabilitado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert severity="success">El producto ha sido deshabilitado.</Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleclose}  style={{backgroundColor: "#401801"}}>
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
export default DeshabilitarProducto;