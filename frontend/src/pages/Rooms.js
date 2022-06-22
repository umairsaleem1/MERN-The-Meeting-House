import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSocket } from "../utils/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { getAllPublicRooms } from "../redux/roomsSlice";
import RoomsHeader from "../components/others/RoomsHeader";
import RoomCard from "../components/others/RoomCard";
import Navbar from "../components/shared/Navbar";

const style = {
  container: {
    height: {
      md: 'calc(100vh - 80px)',
      xs: 'calc(100vh - 60px)',
    },
    width: "100%",
    backgroundColor: "background.primary",
    marginTop: {
      md: '80px',
      xs: '60px',
    },
    overflow: "auto"
  },
  roomsListContainer: {
    width: "100%",
    padding: {
      xm: "0px 174px",
      md: '0px 70px',
      sm: '0px 40px',
      xs: '0px 10px'
    },
    height: "auto",
    marginTop: { xm: "130px", xs: "160px" },
    justifyContent: {
      sm: 'flex-start',
      xs: 'space-around'
    }
  },
  fade: {
    width: "100%",
    height: "70px",
    position: "fixed",
    bottom: "0px",
    left: "0px",
    zIndex: 2,
    background:
      "linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 0.7) 50%, #121212 100%)",
  },
  loaderScreen: {
    height: "auto",
    width: "100%",
    display: "flex",
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginTop: { xm: "130px", xs: "160px" },
  },
  loaderImg: {
    height: "300px",
    width: "250px",
  },
  noRoom: {
    color: 'white',
    fontSize: {
      sm: '25px',
      xs: '17px'
    }
  }
};

const Rooms = () => {
  const { rooms, roomsFetchingCompleted, roomsParticipants, roomSearchString } = useSelector((state) => state.rooms);
  // const { rooms: { rooms, roomsFetchingCompleted, roomsParticipants, roomSearchString} } = useSelector((state)=>state);
  const dispatch = useDispatch();
  useSocket();



  useEffect(() => {
    dispatch(getAllPublicRooms());
  }, [dispatch]);


  return (
    <>
      <Navbar />
      <Box sx={style.container}>
        <RoomsHeader />
        {roomsFetchingCompleted ? (
          <>
            <Grid container gap={2} sx={style.roomsListContainer}>
              {roomSearchString.length ? (
                rooms.filter((room) => {
                  return room.topic.includes(roomSearchString);
                }).length ? (
                  [
                    ...new Map(
                      rooms.map((item) => [item["_id"], item])
                    ).values(),
                  ].map((room) => {
                    return (
                      <Link
                        to={`/${room._id}`}
                        className="link-style"
                        key={room._id}
                      >
                        <RoomCard
                          room={room}
                          roomsParticipants={roomsParticipants}
                        />
                      </Link>
                    );
                  })
                ) : (
                  <Typography variant="h6" color="white">
                    No room found!
                  </Typography>
                )
              ) : rooms.length ? (
                [
                  ...new Map(rooms.map((item) => [item["_id"], item])).values(),
                ].map((room) => {
                  return (
                    <Link
                      to={`/${room._id}`}
                      className="link-style"
                      key={room._id}
                    >
                      <RoomCard
                        room={room}
                        roomsParticipants={roomsParticipants}
                      />
                    </Link>
                  );
                })
              ) : <Typography variant='h6'sx={style.noRoom}> There is no room currently going on</Typography>}
            </Grid>

            <Box sx={style.fade}></Box>
          </>
        ) : (
          <Box sx={style.loaderScreen}>
              <img src="/images/loader.gif" alt="loader" style={style.loaderImg} />
              <Typography variant="h5" color='white' fontSize='30px'>Please wait...</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Rooms;
