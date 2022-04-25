import { Box, Grid, Typography } from "@mui/material";




const style = {
    container: {
        height: '100%',
        width: '100%',
        border: '3px solid blue',
        overflow: 'auto'
    },
    guest: {
        width: '280px',
        height: '350px',
        border: '1px solid red',
        borderRadius: '7px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginRight: '10px',
        marginBottom: '30px'
    },
    avatar: {
        height: '100%',
        width: '100%'
    },
    name: {
        position: 'absolute',
        left: '10px',
        bottom: '10px',
        color: 'text.primary',
        backgroundColor: 'background.primary',
        padding: '0px 5px',
        borderRadius: '10px',
        fontSize: '15px',
        maxWidth: '100%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
}
const RoomGuestsScreen = () => {
    return (
        <Grid container justifyContent='space-evenly' sx={style.container}>

            {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item)=>{  

                return <Box item sx={style.guest} key={item}>
                    <img alt='avatar' src='/images/monkey-avatar.png' sx={style.avatar}/>
                    <Typography variant='body1' sx={style.name}>
                        Umair Saleem
                    </Typography>
                </Box>
                })
            }

        </Grid>
    )
}

export default RoomGuestsScreen;