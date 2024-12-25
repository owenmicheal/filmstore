import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    cardContainer: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '490px',
        textDecoration: 'none',
    },

    card: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
    },

    cardRoot: {
        position: 'relative',
    },

    cardmedia: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0, 0.575)',
        backgroundBlendMode: 'darken',
        borderRadius: '18px',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '5px'
        },
    },

    cardContent: {
        color: '#fff',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },

    cardContentRoot: {
        position: 'relative',
        backgroundColor: 'transparent',
    },
}));