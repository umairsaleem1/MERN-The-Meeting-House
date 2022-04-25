import { Avatar, Box, Typography } from '@mui/material';




const style = {
    container: {
        width: '100%',
        height: 'auto',
        padding: '0px 10px',
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    name: {
        color: 'text.secondary',
        textTransform: 'capitalize',
        marginTop: '25px',
        fontSize: '12px'
    },
    messageContainer: {
        height: '100%',
        maxWidth: '90%',
        display: 'flex',
        marginTop: '7px'
    },
    avatar: {
        height: '40px',
        width: '40px',
        marginRight: '10px'
    },
    messageText: {
        lineHeight: '20px',
        padding: '11px 15px',
        backgroundColor: 'placeholder',
        color: 'text.primary',
        borderRadius: '10px'
    }
}
const Message = ( { message, prevMessage, messageNo } ) => {

    return (
        <Box sx={style.container} style={ message.author==='me' ? { alignItems: 'flex-end' } : null }>
            {
                (messageNo===1 || (message.author!==prevMessage.author))
                ?  
                <Typography variant='body2' sx={style.name} style={ message.author==='me' ? { paddingRight: '60px' } : { paddingLeft: '60px' }}>
                    {message.author} to Everyone
                </Typography>
                :
                null
            }
            <Box sx={style.messageContainer}>
                {
                    (messageNo===1 || (message.author!==prevMessage.author))
                    ? 
                    <Avatar alt='avatar' src='/images/monkey-avatar.png' sx={style.avatar} style={ message.author==='me' ? { order: 12, marginRight: '0px', marginLeft: '10px' } : null }/>
                    :
                    <Box sx={style.avatar} style={ message.author==='me' ? { order: 12, marginRight: '0px', marginLeft: '10px' } : null }></Box>
                }
                <Typography variant='body1' sx={style.messageText} style={ message.author==='me' ? { backgroundColor: '#5453E0' } : null }>
                    Hello, how are you?
                </Typography>
            </Box>
        </Box>
    )
}

export default Message;