import { Box, TextField, Typography, Modal, Backdrop, Fade, Button } from '@mui/material';
import { useState } from 'react';
import validator from 'validator';



const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.secondary',
        boxShadow: 24,
        p: 4,
        borderRadius: '20px'
    },
    heading: { 
        color: 'text.primary',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        color: 'text.primary',
        marginTop: '15px',
        fontSize: '17px'
    },
    urlInput: {
        width: '100%',
        height: '45px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        padding: '0px 20px',
        paddingTop: '5.7px',
        marginTop: '10px'
    },
    btns: {
        width: '100%',
        height: '40px',
        marginTop: '50px',
        display: 'flex',
        justifyContent: 'space-around'
    },
    btn: {
        width: '100px',
        height: '100%',
        color: 'text.primary',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'transparent'
        },
        '&:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'all !important',
            color: '#C4C5C5',
        }
    }
}

const WebURLModal = ( { openWebURLModal, setOpenWebURLModal } ) => {

    const [url, setUrl] = useState('');

    return (
        <Modal
            open={openWebURLModal}
            onClose={()=> setOpenWebURLModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={openWebURLModal}>

                <Box sx={style.modal}>

                    <Typography variant='h6' sx={style.heading}>
                        Web URL
                    </Typography>

                    <Typography variant='body2' sx={style.text}>
                        Input the URL and press share to let everyone see it
                    </Typography>

                    <TextField
                        type='url'
                        sx={style.urlInput}
                        InputProps={{
                            disableUnderline: true,
                            style: { fontSize: '1.2rem', color: '#C4C5C5' }
                        }}
                        variant="standard"
                        onChange={(e)=>setUrl(e.target.value)}
                    />
                    
                    <Box sx={style.btns}>
                        <Button sx={style.btn} onClick={()=> setOpenWebURLModal(false)}>
                            Cancel
                        </Button>
                        <Button sx={style.btn} style={validator.isURL(url) ? { backgroundColor: '#20BD5F' } : null } disabled={!validator.isURL(url)}>
                            Share
                        </Button>
                    </Box>

                </Box>

            </Fade>

        </Modal>
    )
}

export default WebURLModal;