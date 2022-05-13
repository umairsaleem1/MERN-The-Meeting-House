import { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useSocket } from "../utils/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublicRooms } from "../redux/roomsSlice";
import RoomsHeader from "../components/others/RoomsHeader";
import RoomCard from "../components/others/RoomCard";
import Navbar from "../components/shared/Navbar";






const style = {
    container: {
      height: 'calc(100vh - 80px)',
      width: '100%',
      backgroundColor: 'background.primary',
      marginTop:'80px',
      overflow: 'auto'
    },
    roomsListContainer: {
        width: '100%',
        padding: '0px 174px',
        height: 'auto',
        marginTop: { md: '130px', sm:'200px' }
    },
    fade: {
      width: '100%',
      height: '70px',
      position: 'fixed',
      bottom: '0px',
      left: '0px',
      zIndex: 2,
      background: 'linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 0.7) 50%, #121212 100%)'
    }
}

const Rooms = () => {

    const { rooms } = useSelector((state)=>state.rooms);
    const dispatch = useDispatch();
    useSocket();



    useEffect(()=>{

      dispatch(getAllPublicRooms());
      
    }, [dispatch])

 
    return(
      <>
      <Navbar/>
      <Box sx={style.container}>
          <RoomsHeader/>
          <Grid container gap={2} sx={style.roomsListContainer}>
              {
                rooms.length
                ?
                [
                  ...new Map(rooms.map((item)=>[item["_id"], item])).values()
                ].map((room)=>{
                  return(
                    <Link to={`/${room._id}`} className='link-style' key={room._id}>
                        <RoomCard room={room}/>
                    </Link>
                  )
                })
                : 
                null
              }
          </Grid>

          <Box sx={style.fade}>

          </Box>

      </Box>
      </>
    )
}

export default Rooms;