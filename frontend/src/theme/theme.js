import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background: {
            primary: '#121212',
            primary2: '#181629',
            secondary: '#1D1D1D',
            secondary2: '#25223F'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#C4C5C5'
        },
        blue: '#0077FF',
        success: { main: '#20BD5F' },
        danger: '#F44336',
        pink: '#E91E63',
        indigo: '#5453E0',
        hrColor: '#323232',
        inputBackground: '#262626' ,
        placeholder: '#454545',

        mode: 'dark'
    },
    stepsBoxStyle: {
        height: 'auto',
        width: '550px',
        backgroundColor: 'background.secondary',
        borderRadius: '20px',
        textAlign: 'center',
        padding: '50px',
        paddingBottom: '70px',
        color: 'text.primary'
    },
    stepsTitleStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    btnStyle: {
        backgroundColor: 'blue',
        color: 'text.primary',
        marginTop: '50px',
        borderRadius: '18px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'blue'
        }
    },
    greenBtnStyle: {
        backgroundColor: 'success.main',
        color: 'text.primary',
        borderRadius: '18px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'success.main'
        }
    },
    typography: {
        fontFamily: [
        //   "Nunito",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ].join(",")
    }
})

export default theme;