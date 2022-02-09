import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { productContext } from '../../Contexts/ProductsContext';
import { Button, Typography } from '@mui/material';
import { calcTotalPrice } from '../../Helpers/CalcPrice';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#fee8d9',
    color: 'darkblue',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Cart() {

    const { cart, getCart, changeProductCount, deleteFromCart} = React.useContext(productContext)
    React.useEffect(()=>{
        getCart()
    }, [])
    

  return (
    <>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Фото</StyledTableCell>
            <StyledTableCell align="center">Наименование</StyledTableCell>
            <StyledTableCell align="center">Цена</StyledTableCell>
            <StyledTableCell align="center">Количество</StyledTableCell>
            <StyledTableCell align="center">Итого</StyledTableCell>
            <StyledTableCell align="center">Удалить</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {cart.products? (
                <>
                    {cart.products.map((elem) => (
                        <StyledTableRow key={elem.item.id}>
                        <StyledTableCell component="th" scope="row" align="center">
                            <img width='250px' src={elem.item.image} alt={elem.item.title} />
                        </StyledTableCell>
                        <StyledTableCell align="center">{elem.item.title}</StyledTableCell>
                        <StyledTableCell align="center">{elem.item.price}</StyledTableCell>
                        <StyledTableCell align="center">
                            <input 
                            type="number" 
                            value={elem.count}
                            min='0'
                            onChange={(e) => changeProductCount(e.target.value, elem.item.id)}
                            
                            />
                        </StyledTableCell>
                        <StyledTableCell align="center">{elem.subPrice}</StyledTableCell>
                        <StyledTableCell align='center'>
                        
                          <Button onClick={e => deleteFromCart(elem.item.id, elem.item.price)} style={{color: 'red'}}>&times;</Button>
                        </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </>
            ): (
                <TableRow>
                    <TableCell>
                        <h1>Загрузка...</h1>
                    </TableCell>
                </TableRow>
                )}
            <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>
                    <Typography variant='h5'>Всего:</Typography>
                </TableCell>
                {
                    cart.products ? (
                        <TableCell align='right'>
                            <Typography variant='h5'>
                                {calcTotalPrice(cart.products)}
                            </Typography>
                        </TableCell>
                    ): (null)
                }
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} align='right'>
                  <Link to='/payment' style={{textDecoration:'none'}}>
                    <Button variant='contained' color='warning'>
                        КУПИТЬ
                    </Button>
                  </Link >
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
