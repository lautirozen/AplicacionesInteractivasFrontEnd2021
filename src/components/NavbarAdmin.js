import React, {useState}from 'react';
import { categorias } from '../components/AdminCategorias';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Modal from 'react-bootstrap/Modal';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles/';
import { useHistory} from "react-router-dom";
import Logo from "./Assets/Logo.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Badge from '@material-ui/core/Badge';

const NavigationAdmin = () => {
    const[user, setUser]=useState(JSON.parse(localStorage.getItem('nombre')));
    const[usera, setUsera]=useState(JSON.parse(localStorage.getItem('apellido')));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const history= useHistory();
    const onClick= () =>{
      localStorage.clear();
      var userrr = JSON.parse(localStorage.getItem('user'));
      console.log(userrr)
      history.push("/")
  }
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
    
    
    title:{
        fontStyle:"italic", 
        marginTop:"10px"
    },
    title1:{
        fontWeight: 'bold',
        textAlign:"center",
        marginTop:"5px"
    },
    card:{
      padding:"4%",
      height:"12rem",
    }
  })); 
  const classes = useStyles();
  
  return (
    <Navbar expand="lg" expand="md" variant="dark" style={{backgroundColor:"#401801"}}>
        <Navbar.Brand ><img src={Logo} width="150" height="100" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{color:"white"}}/>
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link style={{color:"white", fontSize:"20px"}}  onClick={() => history.push({
              pathname: '/Home/Admin',})}>Home</Nav.Link>
            <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={handleShow}>Menu</Nav.Link>
            </Nav>
            <Nav className="cerrarsesion">
              <Nav.Link style={{color:"white",  fontSize:"20px"}}><AccountCircle />  {user} {usera}</Nav.Link>
                  
                  <Nav.Link style={{color:"white",  fontSize:"20px"}} onClick={onClick} >Cerrar sesión</Nav.Link>
              </Nav>
        </Navbar.Collapse>
<Modal size="lg" size="lg" style={{maxWidth: '1600px'}} show={show} onHide={handleClose} >
    <Modal.Header closeButton>
      <Modal.Title>Administrador</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div className={classes.container}>
    
      <div class='row'>
        {categorias.map((categoria) =>(
          
            <div class="col-lg-4 col-md-6 col-sm-12 mb-2">
              <CardActionArea onClick={() => history.push({
                pathname: categoria.direccion})}>
                <div class="card">
                  <div className={classes.card}> 
                    <h6 className={classes.title}>{categoria.titulo}</h6>
                    <p>{categoria.descripcion}</p>
                  </div>
                </div>
              </CardActionArea>
            </div>
          
        )  )}
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
    
)
}
export default withRouter(NavigationAdmin);