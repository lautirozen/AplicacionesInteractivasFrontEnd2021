import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import _ from "lodash";
import Navigationlog from "../Navbarlog";
import Footer from "../Footer";
import axios from 'axios';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import urlWebServices from '../controller/webServices';
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#401801"
    }
  }
})
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: "13rem"
  },
  titulo: {
    fontStyle: "italic",
    marginTop: "3rem",
    textAlign: "center",
    fontWeight: 'bold',
    marginBottom: "5rem",
  },
  pedido: {
    backgroundColor: "#F2EFEB",
  }
}));
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell align="left">{row.fecha}</TableCell>
        <TableCell align="left">$ {row.precioTotal.$numberDecimal}</TableCell>
        <TableCell align="left">{row.direccion}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Carrito
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Foto</TableCell>
                    <TableCell align="left">Producto</TableCell>
                    <TableCell align="center">Unidades</TableCell>
                    <TableCell align="left">Precio ($)</TableCell>
                  </TableRow>
                </TableHead>
                {row.length !== 0 ? (<TableBody>
                  {(row.productos).map((value) => (
                    <TableRow key={value._id}>
                      <TableCell component="th" scope="row">
                        <img src={value.image} width="30px" class="img-fluid" alt="Responsive image" />
                      </TableCell>
                      <TableCell align="left">{value.titulo}</TableCell>
                      <TableCell align="center">{value.cantidad}</TableCell>
                      <TableCell align="left">
                        $ {value.ptotal.$numberDecimal}
                      </TableCell>
                    </TableRow>))}
                </TableBody>) : null}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [PedidosUsuario, setPedidosUsuario] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userid] = useState(JSON.parse(localStorage.getItem('id')));
  useEffect(() => {
    setIsLoaded(true);
    const user = { userId: userid }
    axios.post(urlWebServices.getPedidoUser, user,
      {
        mode: "cors",
        headers: {
          'x-access-token': JSON.parse(localStorage.getItem('token')),
          'Access-control-Allow-Origin': true,
        },
      })
      .then(function (response) {
        setPedidosUsuario(response.data.pedidos);
        setIsLoaded(false);
      })
      .catch(function (error) {
        console.log(error.message);
        setIsLoaded(false);
      });
  }, []);
  const [rows] = useState(PedidosUsuario)
  const classes = useStyles();
  return (
    <div className={classes.pedido}>
      <Navigationlog />
      <div className={classes.titulo}>
        <h1>Mis Pedidos</h1>
      </div>
      {(isLoaded ?
        <MuiThemeProvider theme={theme}>
          <LinearProgress color="secondary" />
        </MuiThemeProvider> :
        <TableContainer style={{ backgroundColor: "#F2EFEB" }} component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Número de pedido</TableCell>
                <TableCell align="left">Fecha</TableCell>
                <TableCell align="left">Precio total ($)</TableCell>
                <TableCell align="left">Dirección</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {PedidosUsuario.map((row) => (
                <Row key={row.nroPedido} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>)}
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
}