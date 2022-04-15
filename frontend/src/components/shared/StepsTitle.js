import { Typography } from "@mui/material";

const StepsTitle = ( { icon, title, image, fromPassword, fromEmailOtp } ) => {
    return (
        <Typography variant='h6' sx={fromEmailOtp ? {fontWeight:'bold'} : (theme)=>theme.stepsTitleStyle}>
            {
                icon
                ?
                <span style={{fontSize:'2rem', marginRight:'5px'}}>{icon}</span>
                :
                <img alt='icon' src={image} style={fromPassword ? {marginRight:'5px', marginTop:'-8px', height:'40px', width:'40px'} : {marginRight:'10px'}}/>
            }
            {title}
        </Typography>
    )
}

export default StepsTitle;