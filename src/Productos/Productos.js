import React, { useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import Footer from '../components/Footer';
import { Navbar, Nav, Button } from 'react-bootstrap';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles/';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from "../components/Assets/Logo.png";
import Stanley from "../components/Assets/Stanley.jpg";
import Bialetti from "../components/Assets/Bialetti.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from '@material-ui/core/Badge';
import KitchenAid from "../components/Assets/KitchenAid.jpg";
import Mica from "../components/Assets/mica.jpg";
import Hudson from "../components/Assets/Hudson.jpg";
import Nadir from "../components/Assets/nadir.jpg";
import Park from "../components/Assets/park.PNG";
import Porcelana from "../components/Assets/porcelana-tsuji.jpg";
import Tomorrows from "../components/Assets/tomorrow.jpg"
import Tramontina from "../components/Assets/tramontina.png";
import Libbey from "../components/Assets/libbey.svg";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Pyrex from "../components/Assets/pyrex.svg";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { products } from './products';
 function Productos (props){  
  const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[user, setUser]=useState(JSON.parse(localStorage.getItem('nombre')));
    const[usera, setUsera]=useState(JSON.parse(localStorage.getItem('apellido')));
    const handleShow = () => setShow(true);
    const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      marginLeft:"2%",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: 200,
    },
    modify: {
        padding:30,
    },
    modify1: {
        padding:10,
    },
    media: {
      height: 140,
    },
    medias:{
      height:307,
    },
    title:{
      fontStyle:"italic", 
      marginTop:"3rem",
      textAlign:"center",
      fontWeight: 'bold',
      marginBottom:"2rem",
  },
    title1:{
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:"5px"
    },
    page:{
      backgroundColor:"#F2EFEB",
    },
    card:{
      padding:"4%",
      height:"12rem",
    },
    cards:{
      padding:"2%",
      height:"31rem",
    },
    input:{
      width:"300px",
      height:"40px",
      backgroundColor:"#4d240d",
      color:"white",
    },
  })); 
  const classes = useStyles();
  const [info, setInfo]=useState(props.location.state);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const[filteredProductsinfo, setFilteredProductsinfo]= useState([]);
    const onClickcerrar= () =>{
      localStorage.clear();
      var userrr = JSON.parse(localStorage.getItem('user'));
      console.log(userrr)
      history.push("/")
  }
  const onClick = (marca) =>{
    console.log(marca)
    setInfo(marca)
    setSearch("")
    products.map((product) => (
    setFilteredProductsinfo(
      products.filter((product) =>
      product.marca.toLowerCase().match(marca.toLowerCase()) || product.categoria.toLowerCase().match(marca.toLowerCase())
      ))))
    setShow(false)
}
const onSearch = (buscar) =>{
  console.log(buscar)
  setSearch(buscar)
  setInfo(undefined)
  }
  const onClicksame = () =>{
    setInfo(undefined)
  }
  useEffect(() => {
    if(info===undefined){
      console.log("Esta es la info:",info)
    products.map((product) => (
      setFilteredProducts(
      products.filter((product) =>
      product.titulo.toLowerCase().includes(search.toLowerCase())
      ))
      ))
    }
    else{
      console.log("Esta es la info:",info)
      products.map((product) => (
      setFilteredProductsinfo(
        products.filter((product) =>
        product.marca.toLowerCase().match(info.toLowerCase()) || product.categoria.toLowerCase().match(info.toLowerCase())
        ))))
  }
},[search,products]);
    console.log(info)
    console.log(search)
    const history= useHistory();
    const handleHistory = () => {
        history.push("/");
    }
    return (
    <div className={classes.page}>
         {(user===null)?
       <Navbar expand="lg" expand="md" variant="dark" style={{backgroundColor:"#401801"}}>
       <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
       <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:"white"}}/>
       <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="mr-auto">
           <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
             pathname: '/',})}>Home</Nav.Link>
           <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={onClicksame}>Productos</Nav.Link>
           <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Marcas</Nav.Link>
           <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({
             pathname: '/Nosotros',})}>Nosotros</Nav.Link>
           </Nav>
           <Nav.Item>
              <input
                        type="text"
                        placeholder="Buscar producto"
                        className={classes.input}
                        onChange={(e) =>{onSearch(e.target.value)}}
                      />
              </Nav.Item>
           <Nav className="cerrarsesion">
               <Nav.Link style={{color:"white", fontSize:"20px"}} onClick={() => history.push({
             pathname: '/Login',})} >Ingresar</Nav.Link>
               <Nav.Link style={{color:"grey",  fontSize:"20px"}} ><ShoppingCartIcon /></Nav.Link>
           </Nav>
       </Navbar.Collapse>
<Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleClose} >
   <Modal.Header closeButton>
     <Modal.Title>Marcas</Modal.Title>
   </Modal.Header>
   <Modal.Body>
   <div class="container">
   <div class="row">
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Bialetti")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Bialetti}
         title="Bialetti"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Hudson")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Hudson}
         title="Hudson"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("KitchenAid")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={KitchenAid}
         title="KitchenAid"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Libbey")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Libbey}
         title="Libbey"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Mica")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Mica}
         title="Mica"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Nadir Argentina")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Nadir}
         title="Nadir Argentina"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Park Design")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Park}
         title="Park Design"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Porcelana Tsuji")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Porcelana}
         title="Porcelana Tsuji"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Pyrex")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Pyrex}
         title="Pyrex"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Stanley")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Stanley}
         title="Stanley"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Tomorrow´s Kitchen")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Tomorrows}
         title="Tomorrow´s Kitchen"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Tramontina")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Tramontina}
         title="Tramontina"
       />
 </div>
 </div>
 </CardActionArea>
</div>
</div>
</div>
   </Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
       Cerrar
     </Button>
   </Modal.Footer>
 </Modal>
   </Navbar>
   : <Navbar expand="lg" expand="md" variant="dark" style={{backgroundColor:"#401801"}}>
   <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />
   <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="mr-auto">
       <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
         pathname: '/',})}>Home</Nav.Link>
       <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={onClicksame} >Productos</Nav.Link>
       <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Marcas</Nav.Link>

           <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={() => history.push({
         pathname: '/Nosotros',})}>Nosotros</Nav.Link>
       </Nav>
       <Nav.Item>
       <input
                type="text"
                placeholder="Buscar producto"
                className={classes.input}
                onChange={(e) =>{onSearch(e.target.value)}}
              />
      </Nav.Item>
       <Nav className="cerrarsesion">
           <Nav.Link style={{color:"white",  fontSize:"20px"}}><AccountCircle />  {user} {usera}</Nav.Link>
           <Nav.Link style={{color:"grey",  fontSize:"20px"}} ><Badge badgeContent={2} color='error'>
             <ShoppingCartIcon />
           </Badge></Nav.Link>
           <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={onClickcerrar} >Cerrar sesión</Nav.Link>
       </Nav>
   </Navbar.Collapse>
   <Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleClose} >
   <Modal.Header closeButton>
     <Modal.Title>Marcas</Modal.Title>
   </Modal.Header>
   <Modal.Body>
   <div class="container">
   <div class="row">
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Bialetti")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Bialetti}
         title="Bialetti"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Hudson")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Hudson}
         title="Hudson"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("KitchenAid")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={KitchenAid}
         title="KitchenAid"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Libbey")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Libbey}
         title="Libbey"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Mica")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Mica}
         title="Mica"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Nadir Argentina")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Nadir}
         title="Nadir Argentina"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Park Design")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Park}
         title="Park Design"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Porcelana Tsuji")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Porcelana}
         title="Porcelana Tsuji"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Pyrex")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Pyrex}
         title="Pyrex"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Stanley")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Stanley}
         title="Stanley"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Tomorrow´s Kitchen")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Tomorrows}
         title="Tomorrow´s Kitchen"
       />
 </div>
 </div>
 </CardActionArea>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-2">
<CardActionArea onClick={() => {onClick("Tramontina")}}>
 <div class="card">
 <div className={classes.card}>
 <CardMedia
         className={classes.media}
         image={Tramontina}
         title="Tramontina"
       />
 </div>
 </div>
 </CardActionArea>
</div>
</div>
</div>
   </Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={handleClose}  style={{backgroundColor: "#401801"}}>
       Cerrar
     </Button>
   </Modal.Footer>
 </Modal>
   </Navbar>
   }
      <div className={classes.title}>
          <h1>Productos</h1>
        </div>            
        <div class="col-12 row">
               {(info===undefined && search==="")? 
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
                          <div class="row">
                            <CardActionArea key={product.id} style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3" onClick={() => history.push({pathname: `/productos/${product.titulo}`, state: product})}>
                                <VisibilityIcon /> Detalles
                            </CardActionArea >
                            <div style={{borderLeft:"2px solid #808080",marginLeft: 50}}></div>
                              <CardActionArea key={product.id} class=" ml-auto mt-3 mr-4"   style={{backgroundColor:"white", border:"0"}}   onClick={() => {console.log(product.titulo + " añadido")}}>
                                  <AddShoppingCartIcon /> Comprar
                              </CardActionArea >
                            </div>
                      </div>
                      </div>
                    </div>)) : console.log("no")}
                {(info!==undefined && filteredProductsinfo!=="" && search==="")?
                filteredProductsinfo.map((product) =>
                <div class="col-lg-3 col-md-6 col-sm-11 ml-lg-7 mb-2">
                  <div className="products">
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
                        <div class="row">
                        <CardActionArea key={product.id} style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3"  onClick={() => history.push({pathname: `/productos/${product.titulo}`, state: product})}>
                            <VisibilityIcon /> Detalles
                        </CardActionArea >
                        <div style={{borderLeft:"2px solid #808080",marginLeft: 50}}></div>
                        <CardActionArea class=" ml-auto mt-3 mr-4" key={product.id}  style={{backgroundColor:"white", border:"0"}}   onClick={() => {console.log(product.titulo + " añadido")}}>
                            <AddShoppingCartIcon /> Comprar
                        </CardActionArea >
                      </div>
                  </div>
                  </div>
                </div>
                    </div>) : console.log("no")}
                    {(info===undefined && search!=="" && filteredProducts!=="")?
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
                          <div class="row">
                          <CardActionArea key={product.id} style={{backgroundColor:"white", border:"0"}} class=" ml-auto mt-3"  onClick={() => history.push({pathname: `/productos/${product.titulo}`, state: product})}>
                              <VisibilityIcon /> Detalles
                          </CardActionArea >
                          <div style={{borderLeft:"2px solid #808080",marginLeft: 50}}></div>
                          <CardActionArea class=" ml-auto mt-3 mr-4" key={product.id} style={{backgroundColor:"white", border:"0"}}  onClick={() => {console.log(product.titulo + " añadido")}}>
                              <AddShoppingCartIcon /> Comprar
                          </CardActionArea >
                        </div>
                    </div>
                  </div>
                  </div>
                      </div>): console.log("no")}
                      </div>
            <Footer />
          </div>
          )
}
export default Productos;