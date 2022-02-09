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
import { Button } from '@mui/material';


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

export default function Favorites() {

    const { favorite, getFavorite, changFavoriteCount, deleteFromFavorite} = React.useContext(productContext)
    React.useEffect(()=>{
        getFavorite()
    }, [])
    

  return (
    <>
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Фото</StyledTableCell>
            <StyledTableCell align="center">Наименование</StyledTableCell>
             <StyledTableCell align="center">Удалить</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {favorite.products? (
                <>
                    {favorite.products.map((elem) => (
                        <StyledTableRow key={elem.item.id}>
                        <StyledTableCell component="th" scope="row" align="center">
                            <img width='200px' src={elem.item.image} alt={elem.item.title} />
                        </StyledTableCell>
                        <StyledTableCell align="center">{elem.item.title}</StyledTableCell>
                        <StyledTableCell align='center'>
                          <Button onClick={e => deleteFromFavorite(elem.item.id, elem.item.price)} style={{color: 'red'}}>&times;</Button>
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
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
