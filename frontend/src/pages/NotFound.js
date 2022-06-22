import { Box, Button, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';





const style = {
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: 'background.primary',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader: {
        height: '280px',
        width: '200px',
        margin: 'auto'
    },
    text: {
        color: 'text.primary',
        fontWeight: 'bold'
    }
}
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box sx={style.container}>
            <Box sx={style.content}>
                <img src='/images/loader.gif' alt='loader' style={style.loader}/>
                <Typography variant='h5' sx={style.text}>Oops! page not found</Typography>
                <Button 
                    variant='contained' 
                    startIcon={<HomeIcon/>} 
                    sx={(theme)=>theme.btnStyle}
                    onClick={()=>navigate('/')}
                >Go to Home</Button>
            </Box>
        </Box>
    )
}

export default NotFound;