import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const style = {
  container: {
    height: '80px',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'background.primary',
    color: 'text.primary',
    padding: '0px 70px',
    lineHeight: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoText: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold'
  }
}
const Navbar = () => {

    const navigate = useNavigate();

    return (
      <Box sx={style.container}>
        <Typography variant='h5' sx={style.logoText} onClick={()=>navigate('/rooms')}>
          <span style={{fontSize:'2rem', marginRight:'5px'}}>👋</span>  The Meeting House
        </Typography>
      </Box>
    )
}

export default Navbar;