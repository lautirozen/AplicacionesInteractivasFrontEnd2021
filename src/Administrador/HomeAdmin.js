import React from 'react';
import { useHistory} from "react-router-dom";
import CardActionArea from '@material-ui/core/CardActionArea';
import NavigationLog from '../components/NavbarAdmin';
import { categorias } from '../components/CategoriasAdmin';
import { makeStyles } from "@material-ui/core/styles";
import Footer from '../components/Footer';
function HomeAdmin(){
  const history= useHistory();
  const useStyles = makeStyles((theme) => ({
    card:{
    padding:"3%",
    height:"15rem",
    },
    titulo:{
      fontStyle:"italic", 
      marginTop:"3rem",
      textAlign:"center",
      fontWeight: 'bold',
      marginBottom:"2rem",
      
     },
    title:{
      fontStyle:"italic", 
      fontWeight:'bold',
      marginBottom:"1.5rem",
      fontSize:"25px",
      textAlign:"left",
    },
    adminHome:{
      backgroundColor:"#F2EFEB",
    },
    distanciamiento:{
      marginTop:'5rem'
    },
    Ccontainer:{
      marginLeft:'2rem',
      marginRight:'2rem'
    },
    descripcion:{
      fontFamily:"Garamond", 
      fontSize:"25px",
      textAlign:"justify",
    }
    }));
  const classes = useStyles();
  return(
    <div className={classes.adminHome}>
    <NavigationLog/>
    <div className={classes.titulo}>
      <h1>Bienvenido Administrador</h1>
    </div>
    <div className={classes.distanciamiento}>
      <div class='col-lg-12 row'>
        {categorias.map((categoria) =>(
            <div class="col-lg-4 col-md-6 col-sm-12 mb-5">
              <div className={classes.Ccontainer}>
                <CardActionArea onClick={() => history.push({
                  pathname: categoria.direccion})}>
                  <div class="card">
                    <div className={classes.card}> 
                      <h6 className={classes.title}>{categoria.titulo}</h6>
                      <p className={classes.descripcion}>{categoria.descripcion}</p>
                    </div>
                  </div>
                </CardActionArea>
              </div>
            </div>
        )  )}
      </div>
    </div>
    <Footer />
    </div>
  )
}
export default HomeAdmin;