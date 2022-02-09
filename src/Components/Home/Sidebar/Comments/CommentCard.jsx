import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { productContext } from '../../../../Contexts/ProductsContext';


export default function CommentCard({item}) {

  const {deleteComment, useAuth, getComment} = React.useContext(productContext)

  const currentUser = useAuth()
  let icons = (
    <CardActions disableSpacing style={{display: 'flex', justifyContent:'right'}}>
            {currentUser?.email === "admin@gmail.com" ? ( 
              <>
            <CardActions disableSpacing> 
            <IconButton onClick={() => deleteComment(item.id)}> 
                <DeleteIcon/> 
             </IconButton>  
          </CardActions>
          </>
            ) : null
        //  <IconButton
        //   aria-label='share'       
        //   // onClick={() => addProductInFavorite(item)}
        //   // color = {checkProductInFavorite(item.id) ? 'primary' : 'inherit'}
        //  >
        //     <FavoriteIcon/>
        //  </IconButton>
       }
    </CardActions>
  )
return (
<Card sx={{ maxWidth: 420, maxHeight: 550 }}>
  {/* <Link to={`/detail/${item.id}`} style={{textDecoration: 'none', color: 'black'}}> */}
    <CardContent >
      <Typography marginBottom='7px' variant="body2" color='darkblue' fontSize='16px' height='40px' align="center" >
        {item.comment}
      </Typography>
      <Typography marginBottom='7px' variant="body2" color='darkblue' fontSize='16px' height='40px' align="right" >
        {item.name}
      </Typography>
    </CardContent>
  {/* </Link> */}
  <CardContent>
    {icons}
  </CardContent>
</Card>
);

}
