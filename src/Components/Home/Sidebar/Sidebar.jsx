import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../../../Contexts/ProductsContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, FormControl, FormControlLabel, FormLabel, Link, Radio, RadioGroup, Slider } from '@mui/material';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MapBish from '../../images/MapBish.png'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexGrow: 1
  };


const Sidebar = () => {
    
    const search = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const {getProducts} = useContext(productContext)
    const [type, setType] = useState(search.get('type') || '')
    const [price, setPrice] = useState(search.get('price_lte') || '')

    const [openAbout, setOpenAbout] = React.useState(false);
    const handleOpenAbout = () => setOpenAbout(true);
    const handleCloseAbout = () => setOpenAbout(false);

    const [openMap, setOpenMap] = React.useState(false);
    const handleOpenMap = () => setOpenMap(true);
    const handleCloseMap = () => setOpenMap(false);
    
    const [openContacts, setOpenContacts] = React.useState(false);
    const handleOpenContacts = () => setOpenContacts(true);
    const handleCloseContacts = () => setOpenContacts(false);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const filterProducts = (key, value) => {
        search.set(key, value)
        let newPath = `${window.location.pathname}?${search.toString()}`
        navigate(newPath)
        setType(search.get('type') || '')
        setPrice(search.get('price_lte' || ''))
        getProducts()
    }

    const handleChangeType = (e, value) => { 
        if(value === 'all'){ 
            search.delete('type')
            let newPath = `${window.location.pathname}?${search.toString()}`
            navigate(newPath) 
            setType(value) 
            getProducts()
            return 
        } 
        search.set(e,value)
        let newPath = `${window.location.pathname}?${search.toString()}` 
        navigate(newPath) 
        setType(search.get("type") || '') 
        getProducts() 
    }


    const resetFilter = () => {
        navigate('/')
        setType('')
        setPrice('')
        getProducts()
    }

    const openComments = () => {
        navigate('/comments')
    }

      
      return (
        <div style={{marginLeft:'70px', color:'blue'}}>
        <Box>
            <Divider />
                <List style={{alignItems:'center'}}>
                   
                        <Button style={{color: 'orange'}} onClick={handleOpenAbout}>О НАС</Button>
                    
                        <Button style={{color: 'orange'}} onClick={handleOpenMap}>КАК НАС НАЙТИ</Button>
                    
                        <Button style={{color: 'orange'}} onClick={handleOpenContacts}>КОНТАКТЫ</Button>
                 
                        <Button style={{color: 'orange'}} onClick={handleOpen}>ФИЛЬТРАЦИЯ</Button>
                        
                        <Button style={{color: 'orange'}} onClick={openComments}>ОТЗЫВЫ</Button>

                        
                </List>
            <Divider />
        </Box>
        
        <Modal
            open={openAbout}
            onClose={handleCloseAbout}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Paper elevation={2}>
                        <FormControl component='fieldset'>
                            <Typography style={{color:'darkblue', backgroundColor:'orange',  textAlign:'center'}}>КЛУБ НАСТОЛЬНЫХ ИГР LUCKYDICE </Typography>
                            <Typography style={{color:'darkblue', textAlign:'center'}}>
                                Первый клуб настольных игр в Кыргызстане.
                                Сообщесиво людей, играющих в настольные игры в Бишкеке. Дети выросли, а желание играть осталось. Мы играем в Warhammer, D'n'D, Экивоки, Нечто, Взрывных котиков, Эпичные схватки боевых магов, Крагморту и многое другое.
                                <Typography style={{color:'darkblue', backgroundColor:'orange', textAlign:'center'}}>
                                    РЕЖИМ РАБОТЫ
                                </Typography >
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Пн 11:00 - 23:00
                                </Typography >
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Вт 11:00 - 23:00
                                </Typography>
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Ср 11:00 - 23:00
                                </Typography>
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Чт 11:00 - 23:00
                                </Typography>
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Пт 11:00 - 23:00
                                </Typography>
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Сб 11:00 - 23:00
                                </Typography>
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    Вс 11:00 - 23:00
                                </Typography>
                            </Typography>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </Modal>

        <Modal
            open={openMap}
            onClose={handleCloseMap}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style} style={{textAlign:'center'}}>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Paper elevation={2}>
                        <FormControl component='fieldset'>
                            <FormLabel style={{color:'darkblue', backgroundColor:'orange', textAlign:'center'}}>КАК НАС НАЙТИ</FormLabel>
                            <Typography style={{color:'darkblue', textAlign:'center'}}>
                                Мы играем в кафе Sierra. Адрес:
                            </Typography>
                            <Typography style={{color:'darkblue', textAlign:'center'}}>
                                г.Бишкек, ул.Токтоналиева, д.62
                            </Typography>
                            <Typography>
                                <img style={{width: '270px', textAlign:'center'}} src={MapBish} />
                            </Typography>
                            <Typography style={{textAlign:'center'}}>
                                <Link href="https://go.2gis.com/iei1wf" style={{color:'darkblue', textDecoration:'none'}}>Карта</Link>
                            </Typography>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </Modal>

        <Modal
            open={openContacts}
            onClose={handleCloseContacts}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Grid container spacing={2} style={{textAlign:'center'}}>
                <Grid item md={12}>
                    <Paper elevation={2}>
                        <FormControl component='fieldset'  >
                            <Typography style={{color:'darkblue', backgroundColor:'orange',  textAlign:'center'}}>КЛУБ НАСТОЛЬНЫХ ИГР LUCKYDICE </Typography>
                            <Typography style={{color:'darkblue', textAlign:'center'}}>
                                <Typography style={{color:'darkblue', backgroundColor:'orange', textAlign:'center'}}>
                                    Телефон
                                </Typography >
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    +996 (555) 555-55-55
                                </Typography>
                                <Typography style={{color:'darkblue', backgroundColor:'orange', textAlign:'center'}}>
                                    Электронная почта
                                </Typography >
                                <Typography style={{color:'darkblue', textAlign:'center'}}>
                                    admin@gmail.com
                                </Typography>
                            </Typography>
                        </FormControl>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </Modal>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <Paper elevation={2}>
                        <FormControl component='fieldset'>
                            <FormLabel style={{color:'darkblue', backgroundColor:'orange', textAlign:'center'}}>КАТЕГОРИИ</FormLabel>
                            <RadioGroup 
                                aria-label='gender' 
                                name='gender1' 
                                value={type}
                                onChange={(e)=>handleChangeType('type', e.target.value)}
                            >
                                <FormControlLabel 
                                    value='demo' 
                                    control={<Radio/>} 
                                    label="Обучающие игры"
                                />
                                <FormControlLabel 
                                    value='league' 
                                    control={<Radio/>} 
                                    label="Лига"
                                />
                                <FormControlLabel 
                                    value='tournament' 
                                    control={<Radio/>} 
                                    label="Турнир"
                                />
                                <FormControlLabel 
                                    value='painting' 
                                    control={<Radio/>} 
                                    label="Хобби вечер"
                                />
                                <FormControlLabel
                                     value='casual' 
                                     control={<Radio/>} 
                                     label="Казуальные игры"
                                 />
                                <FormControlLabel
                                     value='other' 
                                     control={<Radio/>} 
                                     label="Прочее"
                                 />
                                <FormControlLabel
                                     value='all' 
                                     control={<Radio/>} 
                                     label="Все"
                                 />
                            </RadioGroup>
                        </FormControl>
                        <Grid>
                            <Slider
                            onChange={(e) => filterProducts
                            ('price_lte', e.target.value)}
                            valueLabelDisplay='auto'
                            max={2000}
                            step={50}
                           
                            />
                        </Grid>
                        <Button 
                            onClick={resetFilter} 
                            variant='contained' 
                            style={{backgroundColor:'darkorange'}}
                        >
                            Сбросить
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </Modal>

        </div>
    );
};

export default Sidebar;