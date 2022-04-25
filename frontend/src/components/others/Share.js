import React from "react";
import { Box, Button, Dialog, Slide } from "@mui/material";
import { styled } from '@mui/material/styles';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';





const style = {
    shareDialog: {
        position: 'fixed',
        left: 'calc(50% - 175px)',
        top: 'calc(100% - 334px)',
        width: '350px',
        height: '334px'
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

const Share = ( { openShareDialog, setOpenShareDialog, setOpenWebURLModal } ) => {

    const handleWebURLBtnClick = ()=>{
        setOpenShareDialog(false);
        setOpenWebURLModal(true);
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
                        <Input accept="image/*" id="photo" type="file"/>
                        <Button component="span" sx={style.shareItemBtn} style={{ borderTop: '1px solid #f2f2f217' }}>
                            Photo
                            <PhotoSizeSelectActualOutlinedIcon sx={style.shareItemBtnIcon}/>
                        </Button>
                    </label>
                    <label htmlFor="document">
                        <Input id="document" type="file"/>
                        <Button component="span" sx={style.shareItemBtn}>
                            Document
                            <InsertDriveFileOutlinedIcon sx={style.shareItemBtnIcon}/>
                        </Button>
                    </label>
                    <Button sx={style.shareItemBtn} onClick={handleWebURLBtnClick}>
                        Web URL
                        <LinkOutlinedIcon sx={style.shareItemBtnIcon}/>
                    </Button>
                    <Button sx={style.shareItemBtn}>
                        Screen
                        <ScreenShareOutlinedIcon sx={style.shareItemBtnIcon}/>
                    </Button>
                </Box>
                <Button sx={style.cancelBtn} onClick={()=> setOpenShareDialog(false)}>Cancel</Button>
            </Box>
        </Dialog>
    )
}

export default Share;