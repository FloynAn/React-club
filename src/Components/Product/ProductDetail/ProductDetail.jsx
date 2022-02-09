import { Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductsContext';

const ProductDetail = () => {
    const {id} = useParams()
    const {detail, getDetail} = useContext(productContext)

    useEffect(() => {
        getDetail(id)
    }, [id])

    return (
              <Paper variant="outlined">
                    <Typography variant='h4' style={{textAlign:'center', color:'darkorange', marginTop: '20px'}}>
                        ОПИСАНИЕ
                    </Typography>
                    {
                        detail? (
                            <div style={{
                                display:'flex', 
                                flexDirection: 'column',
                                alignItems:'center'
                            }}>
                                <div>
                                    <img width='250px' src={detail.image} alt={detail.title} />
                                </div>
                                <div style = {{
                                    // width: '450px',
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    maxWidth: '100%'
                                }}>
                                    <Typography style={{color: 'orange', textAlign:'center'}} variant='h3' sx={{ display: { fontSize:'30px' }}}>{detail.title}</Typography>
                                    <Typography style={{color:'darkblue', textAlign:'center'}} variant='subtitle1'>{detail.type}</Typography>
                                    <Typography style={{color:'darkblue', textAlign:'center'}} variant='body1'>{detail.description}</Typography>
                                    <Typography style={{color:'darkblue', textAlign:'center'}} variant='h3'>{detail.price} руб.</Typography>
                                </div>
                            </div>
                        ) : (<h1>Loading...</h1>)
                    }
              </Paper>
          );
    
};

export default ProductDetail;