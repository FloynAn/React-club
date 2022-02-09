import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../../../../Contexts/ProductsContext';

export default function AddComments() {

    const navigate = useNavigate()

    const [values, setValues] = React.useState({
      

            comment:'',
            name: '',
            date:''
       
    })

    const {addComment, getComments} = React.useContext(productContext)
  

    React.useEffect(()=> {
        getComments()
    }, [])
    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }
   

    const handleSave = () => {
        addComment({...values, price: + values.price});
        
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: '40px auto',
          maxwidth: 1000,
          height: 'auto',
          p: '10px'
        },
      }}
    >
        <Paper elevation={3}>
            <h1 style={{textAlign:'center', color: 'darkblue'}}>Добавить отзыв</h1>
            <div style={{display:'flex', justifyContent: 'space-around', color:'black'}}>
                <div
                    style={{
                        width:'450px',
                        display:'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <form noValidate autoComplete='off' 
                            style={{
                                display:'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <TextField 
                                style={{padding:'10px'}} 
                                name='comment' 
                                onChange={handleInp} 
                                // value={values.title} 
                                variant='outlined' 
                                label='Ваш отзыв' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='name' 
                                onChange={handleInp} 
                                // value={values.image} 
                                variant='outlined' 
                                label='Ваше имя' 
                            />
                        </form>
                        <Button 
                            variant='contained' 
                            color='warning'
                            onClick={handleSave}
                        >
                            Добавить
                        </Button>
                </div>
            </div>
        </Paper>
    </Box>
  );
}
