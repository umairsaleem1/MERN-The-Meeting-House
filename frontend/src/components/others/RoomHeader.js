import React, { useState } from "react";
import { Grid, Box, IconButton, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EndRoom from "./EndRoom";
import RoomDetails from "./RoomDetails";




const style = {
    container: {
        width: '100%',
        height: '60px',
        backgroundColor: 'background.secondary',
        padding: '0px 100px'
    },
    meetingDetailsBtn: {
        fontWeight: 'bold',
        color: 'text.primary',
        letterSpacing: '1px',
        '&:hover': {
            backgroundColor: 'background.secondary'
        }
    },
    endBtn: {
        backgroundColor: 'danger',
        fontWeight: 'bold',
        color: 'text.primary',
        '&:hover': {
            backgroundColor: 'danger'
        }
    }
}
const RoomHeader = () => {

    const [openMeetingDetailsDialog, setOpenMeetingDetailsDialog] = useState(false);
    const [openEndMeetingDialog, setOpenEndMeetingDialog] = useState(false);
    const navigate = useNavigate();

    return (
        <Grid container alignItems='center' justifyContent='space-between' sx={style.container}>
            
            <Box item>
                <IconButton onClick={()=> navigate('/rooms')}>
                    <ArrowBackIcon/>
                </IconButton>
            </Box>

            <Box item>
                <Button endIcon={<KeyboardArrowDownIcon/>} sx={style.meetingDetailsBtn} onClick={()=> setOpenMeetingDetailsDialog(true)}>
                    Room details
                </Button>
            </Box>

            <RoomDetails openMeetingDetailsDialog={openMeetingDetailsDialog} setOpenMeetingDetailsDialog={setOpenMeetingDetailsDialog}/>

            <Box item>
                <Button sx={style.endBtn} onClick={()=> setOpenEndMeetingDialog(true)}>
                    End
                </Button>
            </Box>
            
            <EndRoom openEndMeetingDialog={openEndMeetingDialog} setOpenEndMeetingDialog={setOpenEndMeetingDialog}/>

        </Grid>
    )
}

export default RoomHeader;