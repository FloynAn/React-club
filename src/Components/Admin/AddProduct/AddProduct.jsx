import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { productContext } from '../../../Contexts/ProductsContext';
import { useNavigate } from 'react-router-dom';
import preview from '../../images/preview.png'

export default function AddProduct() {

    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        title:'',
        image: '',
        date:'',
        price: '',
        type: '',
        description:''
    })

    const {addProduct} = React.useContext(productContext)

    const handleInp = (e) => {
        let obj = {
            ...values,
            [e.target.name]: e.target.value
        }
        setValues(obj)
    }


    const handleSave = () => {
        if(!values.image) values.image = 'https://i.pinimg.com/736x/8b/34/ee/8b34ee5542156708c073bd14347a9b0c--tabletop-rpg-role-playing-games.jpg' ;
        addProduct({...values, price: + values.price});
        navigate('/')
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
            <h1 style={{textAlign:'center', color: 'darkblue'}}>Добавить мероприятие</h1>
            <div style={{display:'flex', justifyContent: 'space-around', color:'black'}}>
                <div>
                    <img style={{width: '400px'}} src={values.image ? values.image: 'https://i.pinimg.com/736x/8b/34/ee/8b34ee5542156708c073bd14347a9b0c--tabletop-rpg-role-playing-games.jpg'} alt="Картинка" />
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
                                onChange={handleInp} 
                                value={values.title} 
                                variant='outlined' 
                                label='Название мероприятия' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='image' 
                                onChange={handleInp} 
                                value={values.image} 
                                variant='outlined' 
                                label='Картинка' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='type' 
                                onChange={handleInp} 
                                value={values.type} 
                                variant='outlined' 
                                label='Категория' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='date' 
                                onChange={handleInp} 
                                value={values.date} 
                                variant='outlined' 
                                label='Дата проведения' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='price' 
                                onChange={handleInp} 
                                value={values.price} 
                                variant='outlined' 
                                label='Стоимость участия' 
                            />
                            <TextField 
                                style={{padding:'10px'}} 
                                name='description' 
                                onChange={handleInp} 
                                value={values.description} 
                                variant='outlined' 
                                label='Описание' 
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
