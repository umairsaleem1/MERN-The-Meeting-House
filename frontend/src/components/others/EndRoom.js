import { Box, Button, Dialog, DialogActions } from "@mui/material";
import TransitionComponent from "../shared/TransitionComponent";




const style = {
    endMeetingDialog: {
        position: 'fixed',
        left: 'calc(100% - 350px)',
        top: '0px',
        height: '150px',
        width: '350px'
    },
    cancelEndMeetingDialog: {
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '100px',
        backgroundColor: 'background.secondary'
    },
    cancelBtnEndMeetingDialog: {
        fontWeight: 'bold',
        backgroundColor: 'placeholder',
        color: 'text.primary',
        '&:hover': {
            backgroundColor: 'placeholder'
        }
    },
    endMeetingDialogLeaveBtns: {
        height: 'calc(100% - 60px)',
        width: '90%',
        margin: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderBottomLeftRadius: '20px',
        borderBottomRightRadius: '20px',
        padding: '20px',
        backgroundColor: 'rgba(18, 18, 18, 0.88)'
    },
    endMeetingDialogLeaveAllBtn: {
        fontWeight: 'bold',
        color: 'text.primary',
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: 'danger',
        '&:hover': {
            backgroundColor: 'danger'
        }
    },
    endMeetingDialogLeaveSingleBtn: {
        fontWeight: 'bold',
        color: 'text.primary',
        width: '100%',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: 'placeholder',
        '&:hover': {
            backgroundColor: 'placeholder'
        }
    }
}
const EndRoom = ( { openEndMeetingDialog, setOpenEndMeetingDialog, leaveRoom, endRoomForAll, user, openedRoom } ) => {
    
    return (
        <Dialog
            open={openEndMeetingDialog}
            TransitionComponent={TransitionComponent}
            keepMounted
            fullScreen={true}
            onClose={()=> setOpenEndMeetingDialog(false)}
            sx={style.endMeetingDialog}
            BackdropProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
                },
            }}
            PaperProps={{
                style: {
                    boxShadow: 'none',
                    backgroundImage: 'none',
                    backgroundColor: 'transparent'
                }
            }}   
        >
            <Box sx={style.cancelEndMeetingDialog}>
                <Button sx={style.cancelBtnEndMeetingDialog} onClick={()=> setOpenEndMeetingDialog(false)}>
                    Cancel
                </Button>
            </Box>
            <DialogActions sx={style.endMeetingDialogLeaveBtns}>
                {
                    (openedRoom && openedRoom.creator===user._id)
                    ?
                    <Button sx={style.endMeetingDialogLeaveAllBtn} variant='contained' onClick={()=> endRoomForAll()}>
                        End Room for All
                    </Button>
                    :
                    <Button sx={style.endMeetingDialogLeaveSingleBtn} variant='contained' onClick={leaveRoom}>
                        Leave Room
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

export default EndRoom;