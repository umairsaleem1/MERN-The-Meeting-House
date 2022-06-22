import React from "react";
import { Box, Button, Dialog, Slide } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';
import StopScreenShareOutlinedIcon from '@mui/icons-material/StopScreenShareOutlined';
import { useDispatch } from "react-redux";
import { setErrorAlert, setSuccessAlert } from "../../redux/roomsSlice";





const style = {
    shareDialog: {
        position: 'fixed',
        left: 'calc(50% - 175px)',
        top: 'calc(100% - 280px)',
        width: '350px',
        height: '280px',
    },
    share: {
        padding: '20px',
        paddingBottom: '0px',
        backgroundColor: 'inputBackground',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        height: '100%'
    },
    shareItems: {
        width: '100%',
        height: 'auto',
        backgroundColor: 'placeholder',
        borderRadius: '20px',
        padding: '15px 0px'
    },
    shareItemBtn: {
        width: '100%',
        justifyContent: 'space-between',
        padding: '15px 20px',
        borderRadius: '0px',
        fontWeight: 'bold',
        color: 'text.primary',
        borderBottom: '1px solid #f2f2f217',
        '&:hover': {
            backgroundColor: 'placeholder'
        }
    },
    shareItemBtnIcon: {
        fontSize: '25px'
    },
    cancelBtn: {
        width: '100%',
        fontWeight: 'bold',
        color: 'text.primary',
        margin: '10px 0px',
        '&:hover': {
            backgroundColor: 'inputBackground'
        }
    }
}

const TransitionComponent = React.forwardRef(function TransitionComponent(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

const Share = ( { openShareDialog, setOpenShareDialog, startScreenSharing, stopScreenSharing, isSharingScreen, socket } ) => {

    const { roomId } = useParams();
    const dispatch = useDispatch();


    const shareFile = async (e)=>{
        if(!socket || e.target.files.length===0){
            return;
        }

        setOpenShareDialog(false);
        try{
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            
            const res = await fetch(`/rooms/${roomId}/uploadfile`, {
                method: 'POST',
                body: formData
            });

            if(!res.ok){
                throw new Error(res.statusText);
            }

            const data = await res.json();
            
            dispatch(setSuccessAlert('File shared successfylly...'));

            socket.emit('file shared', roomId, data.file);

        }catch(e){
            console.log(e);
            dispatch(setErrorAlert('File not shared due to some problem, try again'));
        }
    }



    return (
        <Dialog
            open={openShareDialog}
            TransitionComponent={TransitionComponent}
            keepMounted
            fullScreen={true}
            onClose={()=> setOpenShareDialog(false)}
            sx={style.shareDialog}
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
            <Box sx={style.share}>
                <Box sx={style.shareItems}>
                    <label htmlFor="photo">
                        <Input accept="image/*" id="photo" type="file" onChange={shareFile}/>
                        <Button component="span" sx={style.shareItemBtn} style={{ borderTop: '1px solid #f2f2f217' }}>
                            Photo
                            <PhotoSizeSelectActualOutlinedIcon sx={style.shareItemBtnIcon}/>
                        </Button>
                    </label>
                    <label htmlFor="document">
                        <Input accept='.xlsx, .xls, .doc, .docx, .ppt, .pptx, .txt, .pdf' id="document" type="file" onChange={shareFile}/>
                        <Button component="span" sx={style.shareItemBtn}>
                            Document
                            <InsertDriveFileOutlinedIcon sx={style.shareItemBtnIcon}/>
                        </Button>
                    </label>
                    {
                        isSharingScreen
                        ?
                        <Button sx={style.shareItemBtn} onClick={stopScreenSharing}>
                            Stop Presenting
                            <StopScreenShareOutlinedIcon sx={style.shareItemBtnIcon}/>
                        </Button>
                        :
                        <Button sx={style.shareItemBtn} onClick={startScreenSharing}>
                            Start Presenting
                            <ScreenShareOutlinedIcon sx={style.shareItemBtnIcon}/>
                        </Button> 
                        }
                </Box>
                <Button sx={style.cancelBtn} onClick={()=> setOpenShareDialog(false)}>Cancel</Button>
            </Box>
        </Dialog>
    )
}

export default Share;