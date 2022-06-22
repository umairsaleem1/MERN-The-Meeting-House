import { Avatar, Box, Typography } from '@mui/material';




const style = {
    container: {
        width: '100%',
        height: 'auto',
        padding: '0px 15px',
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
const Message = ( { message, prevMessage, messageNo, user } ) => {

    return (
        <Box sx={style.container} style={ message.authorId===user._id ? { alignItems: 'flex-end' } : null }>
            {
                (messageNo===1 || (message.authorId!==prevMessage.authorId))
                ?  
                <Typography variant='body2' sx={style.name} style={ message.authorId===user._id ? { paddingRight: '60px' } : { paddingLeft: '60px' }}>
                    { message.authorName } to Everyone
                </Typography>
                :
                null
            }
            <Box sx={style.messageContainer}>
                {
                    (messageNo===1 || (message.authorId!==prevMessage.authorId))
                    ? 
                    <Avatar alt='avatar' src={message.authorAvatar || '/images/monkey-avatar.png'} sx={style.avatar} style={ message.authorId===user._id ? { order: 12, marginRight: '0px', marginLeft: '10px' } : null }/>
                    :
                    <Box sx={style.avatar} style={ message.authorId===user._id ? { order: 12, marginRight: '0px', marginLeft: '10px' } : null }></Box>
                }
                <Typography variant='body1' sx={style.messageText} style={ message.authorId===user._id ? { backgroundColor: '#5453E0' } : null }>
                    { message.text }
                </Typography>
            </Box>
        </Box>
    )
}

export default Message;