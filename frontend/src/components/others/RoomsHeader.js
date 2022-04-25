import { useState } from 'react';
import { Grid, TextField, InputAdornment, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CreateRoomModal from './CreateRoomModal';





const style = {
    roomsHeader: {
      backgroundColor: 'background.primary',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '30px 174px',
      position: 'fixed',
      top: '80px',
      left: '0px',
      zIndex: 2
    },
    search: {
      width: '350px',
      height: '45px',
      backgroundColor: '#262626',
      borderRadius: '10px',
      padding: '0px 20px',
      paddingTop: '5.7px'
    }
}

const RoomsHeader = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
      <Grid container gap={3} sx={style.roomsHeader}>
    
        <Grid item>
    
          <Grid container alignItems='center' gap={3}>
    
            <Grid item sx={{ borderBottom:'3px solid #0077FF', height:'45px', paddingTop:'7px' }}>
              <Typography variant='h6' color='text.primary' fontWeight='bold'>
                All rooms
              </Typography>
            </Grid>
    
            <Grid item sx={{ display: { sm:'none', xs:'none', md:'block'}}}>
              <TextField
                sx={style.search}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
                  style: { fontSize: '1.2rem', color: '#C4C5C5' }
                }}
                variant="standard"
              />
            </Grid>
    
          </Grid>
    
        </Grid>
    
        <Grid item>
          <Button variant='contained' startIcon={<RecordVoiceOverIcon/>} sx={(theme)=>theme.greenBtnStyle} onClick={()=> setOpenModal(true)}>
            Start a room
          </Button>
        </Grid>
        
        <CreateRoomModal openModal={openModal} setOpenModal={setOpenModal}/>
    
        <Grid item sm={12} sx={{ display: { sm:'block', md:'none'}}}>
          <TextField
            sx={style.search} style={{width:'100%'}}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
              style: { fontSize: '1.2rem', color: '#C4C5C5' }
            }}
            variant="standard"
          />
        </Grid>
    
      </Grid>
    )
}

export default RoomsHeader;