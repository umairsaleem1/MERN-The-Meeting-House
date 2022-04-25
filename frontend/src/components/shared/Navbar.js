import { Avatar, Box, Fab, Typography, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';


const style = {
  container: {
    height: '80px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'background.primary',
    color: 'text.primary',
    padding: '0px 174px',
    lineHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoText: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  },
  avatar: {
    border: '3px solid #0077FF',
    height: '52px',
    width: '52px',
    marginRight: '15px'
  },
  logoutBtn: {
    backgroundColor: 'danger',
    color: 'text.primary',
    height: '50px',
    width: '50px',
    '&:hover': {
      backgroundColor: 'danger'
    }
  }
}
const Navbar = () => {

    const navigate = useNavigate();

    return (
      <Box sx={style.container}>

        <Typography variant='h5' sx={style.logoText} onClick={()=>navigate('/rooms')}>
          <span style={{fontSize:'2rem', marginRight:'5px'}}>👋</span>  The Meeting House
        </Typography>

        <Box display='flex' alignItems='center'>
          <Typography variant='h6' fontWeight='bold' mr={1.5} fontSize='18px'>
            Umair Saleem
          </Typography>
          <Avatar alt='avatar' src='/images/monkey-avatar.png' sx={style.avatar}/>
          <Tooltip title='Logout'>
            <Fab sx={style.logoutBtn}>
              <LogoutIcon/>
            </Fab>
          </Tooltip>
        </Box>

      </Box>
    )
}

export default Navbar;