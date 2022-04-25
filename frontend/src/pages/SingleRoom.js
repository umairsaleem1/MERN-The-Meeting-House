import { Box } from '@mui/material';
import RoomFooter from '../components/others/RoomFooter';
import RoomHeader from '../components/others/RoomHeader';
import RoomMainArea from '../components/others/RoomMainArea';



const style = {
    container: {
        height: '100vh',
        width: '100%',
        backgroundColor: 'background.primary',
    }
}
const SingleRoom = () => {
    return (
        <Box sx={style.container}>
            <RoomHeader/>
            <RoomMainArea/>
            <RoomFooter/>

        </Box>
    )
}

export default SingleRoom;