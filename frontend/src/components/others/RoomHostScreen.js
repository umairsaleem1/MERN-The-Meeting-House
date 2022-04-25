import { Box, Typography } from "@mui/material";




const style = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '70px 0px'
    },
    media: {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    name: {
        position: 'absolute',
        left: '30px',
        bottom: '20px',
        color: 'text.primary'
    }
}
const RoomHostScreen = () => {
    return (
        <Box sx={style.container}>
            <img alt='avatar' src='/images/monkey-avatar.png' sx={style.media}/>
            {/* <video style={style.media}>
                <source src="/images/vid.mp4" type="video/mp4"/>
            </video> */}
            <Typography variant='h6' sx={style.name}>
                Umair Saleem
            </Typography>
        </Box>
    )
}

export default RoomHostScreen;