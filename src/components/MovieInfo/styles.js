import { Height } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { height, margin, padding, width } from '@mui/system';

export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'wrap',
            justifyContent:'center',
            alignItems: 'center'
        },
    },

    poster: {
        borderRadius: '25px',
        boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
        width: '100%',
        marginBottom:'40px',
        [theme.breakpoints.down('md')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',
            marginBottom: '30px',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',  // Adjusted height for smaller screens
            marginBottom: '30px'
        },
    },
    

    genresContainer:{
        margin: '10px 0 !important',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },

    genreImage: {
        filter: theme.palette.mode === 'dark' ? 'invert(1)': 'black',
        marginRight: '10px'
    },

    links: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        [theme.breakpoints.down('sm')]: {
            padding: '0.5rem 1rem '
        },

    },

    castImage: {
        width: '100%',
        maxWidth: '7em',
        height: '8em',
        objectFit: 'cover',
        borderRadius: '25px'
    },

    castName: {
        fontSize: '0.9rem',
        marginTop: '5px',
        color: theme.palette.text.primary,
      },

    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    }, 

    modal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    video: {
        width: '50%',
        height: '50%',
        borderRadius: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            height: '90%',
            borderRadius: '20px',
        }
    }
      
    
}));
