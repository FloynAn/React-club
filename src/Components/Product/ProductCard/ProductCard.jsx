import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { productContext } from '../../../Contexts/ProductsContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function ProductCard({item}) {

  const {deleteProduct, addProductInCart, checkProductInCart, addProductInFavorite, checkProductInFavorite, useAuth} = React.useContext(productContext)

  const currentUser = useAuth()

  let icons = (
        <CardActions disableSpacing style={{display: 'flex', justifyContent:'right'}}>
                {currentUser?.email === "admin@gmail.com" ? ( 
                  <>
                <CardActions disableSpacing> 
                <Link to={`edit/${item.id}`}>  
                  <IconButton> 
                    <EditIcon/> 
                 </IconButton> 
                </Link> 
                <IconButton onClick={() => deleteProduct(item.id)}> 
                    <DeleteIcon/> 
                 </IconButton>  
              </CardActions>
              </>
               
                ) : 
                <>
              <IconButton 
              aria-label='share'       
              onClick={() => addProductInCart(item)}
              color = {checkProductInCart(item.id) ? 'primary' : 'inherit'}
              >
             <ShoppingCartIcon/>
             </IconButton>
             <IconButton
              aria-label='share'       
              onClick={() => addProductInFavorite(item)}
              color = {checkProductInFavorite(item.id) ? 'primary' : 'inherit'}
             >
                <StarIcon/>
             </IconButton>
             {/* <IconButton
              // aria-label='share'       
              // onClick={() => addProductInFavorite(item)}
              // color = {checkProductInFavorite(item.id) ? 'primary' : 'inherit'}
              >
                <FavoriteIcon/>
             </IconButton> */}
             </>
           }
        </CardActions>
      )
  return (
    <Card sx={{ maxWidth: 420, maxHeight: 550 }}>
      <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <CardMedia
          component="img"
          height="250"
          image={item.image}
        />
        <CardContent >
          <Typography  gutterBottom variant="h5" component="div" color='darkblue' fontWeight='bold' align="center" >
            {item.title}
          </Typography>
          <Typography marginBottom='7px' variant="body2" color='darkblue' fontSize='16px' height='40px' align="center" >
            {item.date}
          </Typography>
          <Typography marginBottom='7px' variant="body2" color='darkblue' fontSize='16px' height='40px' align="center" >
            {item.description}
          </Typography>
        </CardContent>
      </Link>
      <CardContent>
        <Typography marginTop='7px' color='darkblue' fontSize="20px" align="center">{item.price} руб.</Typography>
        {icons}
      </CardContent>
    </Card>
  );
}
