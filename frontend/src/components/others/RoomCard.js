import { Grid, Typography, Stack, Avatar } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';





const style = {
    roomCard: {
        width: '300px',
        height: '200px',
        borderRadius: '20px',
        padding: '20px 25px',
        backgroundColor: 'background.secondary',
        position: 'relative',
        zIndex: 1
    },
    roomTopic: {
        fontWeight: 'bold',
        fontSize: '17px',
        color: 'text.primary',
        maxHeight: '80px',
        overflow: 'hidden'
    },
    participantsCount: {
        position: 'absolute',
        bottom: '5px',
        right: '12px',
        color: 'text.secondary'
    }
}
const RoomCard = ( { room, roomsParticipants } ) => {
    const colors = ['#0077FF', '#20BD5F', '#F44336', '#E91E63', '#5453E0', 'yellow'];
    let randomNo = Math.floor(Math.random() * 6);


    return (
        <Grid item sx={style.roomCard}>

            <Typography variant='h6' sx={style.roomTopic}>
                { room.topic }
            </Typography>

            <Stack direction='row' alignItems='center' spacing={3} mt={2}>

                <Avatar alt={room.creator.name} src={room.creator.avatar || '/images/monkey-avatar.png'} sx={{ border: `2px solid ${colors[randomNo]}` }} />

                <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography color='text.secondary'>
                        { room.creator.name }
                    </Typography>
                    <Typography color='text.primary'>
                        <ChatIcon/>
                    </Typography>
                </Stack>

            </Stack>

            <Stack direction='row' alignItems='center' spacing={0.5} sx={style.participantsCount}>
                <Typography>
                    {
                        (roomsParticipants && roomsParticipants[room._id]) && Object.keys(roomsParticipants[room._id]).length
                    }
                </Typography>
                <Typography>
                    <PersonSharpIcon/>
                </Typography> 
            </Stack>

        </Grid>
    )
}

export default RoomCard;