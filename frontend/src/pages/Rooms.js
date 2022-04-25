import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
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
    return(
      <>
      <Navbar/>
      <Box sx={style.container}>
          <RoomsHeader/>
          <Grid container gap={2} sx={style.roomsListContainer}>
              {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item)=>{
                  return(
                    <Link to={`/rooms/${item}`} className='link-style' key={item}>
                        <RoomCard/>
                    </Link>
                  )
                })
              }
          </Grid>

          <Box sx={style.fade}>

          </Box>

      </Box>
      </>
    )
}

export default Rooms;