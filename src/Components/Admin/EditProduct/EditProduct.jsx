import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, IconButton, TextField } from '@mui/material';
import { productContext } from '../../../Contexts/ProductsContext';
import { Link, useParams } from 'react-router-dom';

export default function EditProduct() {

    const { edit, editProduct, saveEditedProduct} = React.useContext(productContext)
    let {id} = useParams()
    const [values, setValues] = React.useState({
        title:'',
        image:'',
        date:'',
        price:'',
        type:'',
        description:''
    })

    React.useEffect(() =>{
        editProduct(id)
    }, [id])

    React.useEffect(() =>{
        if(edit) {
            setValues(edit)
        }
    }, [edit])



    const handleEditInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }


    const handleSave = () => {
        saveEditedProduct(values)
    }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: '40px auto',
        //   maxwidth: 1000,
          height: 'auto',
          p: '10px'
        },
      }}
    >
        <Paper elevation={3}>
            <h1 style={{textAlign:'center', color:'darkblue'}}>ИЗМЕНИТЬ</h1>
            <div style={{display:'flex', justifyContent: 'space-around', color:'black'}}>
                <div>
                    <img width='300' src={values.image} alt="Картинка" />
                </div>
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
                                name='title' 
                                onChange={handleEditInp} 
                                value={values.title} 
                                variant='outlined' 
                                label='Название мероприятия' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='image' 
                                onChange={handleEditInp} 
                                value={values.image} 
                                variant='outlined' 
                                label='Картинка' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='type' 
                                onChange={handleEditInp} 
                                value={values.type} 
                                variant='outlined' 
                                label='Категория' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='date' 
                                onChange={handleEditInp} 
                                value={values.date} 
                                variant='outlined' 
                                label='Дата проведения' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='price' 
                                onChange={handleEditInp} 
                                value={values.price} 
                                variant='outlined' 
                                label='Стоимость участия' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='description' 
                                onChange={handleEditInp} 
                                value={values.description} 
                                variant='outlined' 
                                label='Описание' 
                            />
                        </form>
                            <Link to='/' style={{textDecoration:'none'}}>     
                                <Button 
                                onClick={handleSave}
                                variant='contained' 
                                color='warning'
                            >
                                Сохранить изменения
                            </Button></Link> 
                </div>
            </div>
        </Paper>
    </Box>
  );
}
