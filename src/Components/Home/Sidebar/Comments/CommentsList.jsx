import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import CommentCard from './CommentCard';
import { productContext } from '../../../../Contexts/ProductsContext';
import AddComments from './AddComments';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CommentList() {
    const {comments, getComments } = React.useContext (productContext)
    
     useEffect(() => {
      getComments()
    }, [])
    
  return (
    <>  
        <Box sx={{ flexGrow: 1, margin: 4, marginTop: 1 }} style={{backgroundColor: '#fee8d9', paddingBottom:'20px'}}>
          <Grid container spacing={{ xs: 2, md: 3}} columns={{ xs: 2, sm: 8, md: 12}} style={{display:'flex', justifyContent:'center'}}>
            {
                comments ? (
                    comments.map((item,index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <CommentCard item = {item} key={index}/>
                        </Grid>
                    ))
                    ) : (<h1>загрузка...</h1>)
            }
          </Grid>
        </Box>
    </>
  );
}