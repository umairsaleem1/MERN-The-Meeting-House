import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 400,
          md: 600,
          xm: 960,
          lg: 1280,
          xl: 1920
        }
    },
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
        width: {
            md: '550px',
            xs: '100%',
        },
        backgroundColor: 'background.secondary',
        borderRadius: {
            md: '20px',
            xs: '0px',
        },
        textAlign: 'center',
        padding: {
            md: '50px',
            sm: '20px',
            xs: '10px'
        },
        paddingBottom: {
            md: '70px',
            xs: '30px',
        },
        paddingTop: {
            md: '50px',
            xs: '30px',
        },
        color: 'text.primary'
    },
    stepsTitleStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: {
            md: '22px',
            xs: '18px'
        }
    },
    btnStyle: {
        backgroundColor: 'blue',
        color: 'text.primary',
        marginTop: '50px',
        borderRadius: '18px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'blue'
        },
        '&:disabled': {
            backgroundColor: '#79aef0',
            opacity: '0.8',
            cursor: 'not-allowed',
            pointerEvents: 'all !important'
        }
    },
    greenBtnStyle: {
        backgroundColor: 'success.main',
        color: 'text.primary',
        borderRadius: '18px',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'success.main'
        },
        '&:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'all !important',
            backgroundColor: '#addfad'
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