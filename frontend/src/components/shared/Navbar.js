import { Avatar, Box, Fab, Typography, Tooltip } from "@mui/material";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { getUser, setUser } from '../../redux/authSlice';
import { setRooms, setRoomsFetchingCompleted, setRoomsParticipants, setRoomSearchString, setOnlineUsers, setSocket, setSocketEventsRegistered } from "../../redux/roomsSlice";

const style = { 
  container: {
    height: {
      md: '80px',
      xs: '60px'
    },
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "background.primary",
    color: "text.primary",
    padding: {
      xm: "0px 174px",
      md: '0px 70px',
      sm: '0px 40px',
      xs: '0px 15px'
    },
    lineHeight: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logoText: {
    display: "flex",
    alignItems: "center",
    fontWeight: "bold",
    cursor: 'pointer',
    fontSize: {
      md: '23px',
      xs: '18px'
    }
  },
  avatar: {
    border: "3px solid #0077FF",
    height: {
      md: '52px',
      xs: '45px'
    },
    width: {
      md: '52px',
      xs: '45px'
    },
    marginRight: "15px",
  },
  logoutBtn: {
    backgroundColor: "danger",
    color: "text.primary",
    height: {
      md: '50px',
      xs: '45px'
    },
    width: {
      md: '50px',
      xs: '45px'
    },
    "&:hover": {
      backgroundColor: "danger",
    },
  },
};
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useParams();



  useEffect(()=>{

    if(location.pathname==='/register' || location.pathname==='/forgotpassword' || location.pathname===`/resetpassword/${token}`){
      return;
    }

    dispatch(getUser(navigate));

  }, [dispatch, navigate, location.pathname, token])


  const logout = async ()=>{
    try{
      const res = await fetch('auth/logout/');
      if(!res.ok){
        throw new Error(res.statusText);
      }

      await res.json();
      dispatch(setUser(null));
      dispatch(setRooms([])); 
      dispatch(setRoomsFetchingCompleted(false));
      dispatch(setRoomsParticipants(null));
      dispatch(setRoomSearchString(''));
      dispatch(setSocket(null));
      dispatch(setSocketEventsRegistered(false));
      dispatch(setOnlineUsers([]));
  
      navigate('/login');

    }catch(e){
      console.log(e);
    }
  }

  return (
    <Box sx={style.container}>
      <Typography
        variant="h5"
        sx={style.logoText}
        onClick={() => navigate("/")}
      >
        <span style={{ fontSize: "2rem", marginRight: "5px" }}>👋</span> The
        Meeting House
      </Typography>

      {(user) ? (
        <Box display="flex" alignItems="center">
          <Link to='/me' style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold" mr={1.5} fontSize="18px" sx={{ display: { xs: 'none', xm: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }}}>
              { user.name }
            </Typography>
          </Link>
          <Link to='/me'>
            <Avatar
              alt={user.name}
              src={ user.avatar || '/images/monkey-avatar.png'}
              sx={style.avatar}
            />
          </Link>
          <Tooltip title="Logout">
            <Fab sx={style.logoutBtn} onClick={logout}>
              <LogoutIcon />
            </Fab>
          </Tooltip>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
