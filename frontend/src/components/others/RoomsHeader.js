import { useState } from 'react';
import { Grid, TextField, InputAdornment, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomSearchString } from '../../redux/roomsSlice';
import CreateRoomModal from './CreateRoomModal';





const style = {
    roomsHeader: {
      backgroundColor: 'background.primary',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: {
        xm: "30px 174px",
        md: '10px 70px',
        sm: '10px 40px',
        xs: '10px 15px'
      },
      position: 'fixed',
      top: {
        md: '80px',
        xs: '60px',
      },
      left: '0px',
      zIndex: 2 
    },
    allRoomsHeading: {
      color: 'text.primary',
      fontWeight: 'bold',
      fontSize: {
        sm: '20px',
        xs: '17px'
      }
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

    const { roomSearchString } = useSelector((state)=>state.rooms);
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();


    return (
      <Grid container gap={3} sx={style.roomsHeader}>
    
        <Grid item>
    
          <Grid container alignItems='center' gap={3}>
    
            <Grid item sx={{ borderBottom:'3px solid #0077FF', height: { sm: '45px', xs: '37px' }, paddingTop:'7px' }}>
              <Typography variant='h6' sx={style.allRoomsHeading}>
                All rooms
              </Typography>
            </Grid>
    
            <Grid item sx={{ display: { sm:'none', xs:'none', xm:'block'}}}>
              <TextField
                sx={style.search}
                autoComplete='off'
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
                value={roomSearchString}
                onChange={(e)=>dispatch(setRoomSearchString(e.target.value))}
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
    
        <Grid item sm={12} sx={{ display: { xs:'block', sm: 'block', xm:'none'}}}>
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
            value={roomSearchString}
            onChange={(e)=>dispatch(setRoomSearchString(e.target.value))}
          />
        </Grid>
    
      </Grid>
    )
}

export default RoomsHeader;