import  { TextField } from '@mui/material';



const style = {
    input: {
        width: '250px',
        height: '45px',
        marginTop: '35px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        padding: '0px 20px',
        paddingTop: '5.7px'
    },
    profileInput: {
        width: '100%',
        height: '45px',
        marginBottom: '30px',
        backgroundColor: '#262626',
        borderRadius: '10px',
        padding: '0px 20px',
        paddingTop: '5.7px'
    }
}
const TextInput = ( { type, placeholder, value, setValue, fromProfile } ) => {
  return (
    <TextField 
        type={type}
        placeholder={placeholder}
        variant="standard"
        autoComplete='off'
        InputProps={{
           disableUnderline: true,
           style: { fontSize: '1.2rem', color: '#C4C5C5' }
         }}
         sx={fromProfile ? style.profileInput : style.input}
         onChange={(e)=>setValue(e.target.value)}
         value={value}
    ></TextField>
  )
}

export default TextInput;