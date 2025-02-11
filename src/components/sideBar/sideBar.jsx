import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { selectGenreOrCategory } from '../../features/currentDenreOrCategory';
import useStyles from './styles'
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';


const categories = [ 
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' }
];

import redLogo from '../../assets/images/red.png';
import blueLogo from '../../assets/images/blue.png';

const SideBar = ({ setMobileOpen }) => {
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
    const theme = useTheme();
    const classes = useStyles();
    const { data, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        setMobileOpen(false)
    }, [genreIdOrCategoryName]);


  return (
    <>
    <Link to='/' className={ classes.imageLink }>
        <img 
            className={ classes.image }
            src={ theme.palette.mode === 'light' ? blueLogo : redLogo }
            alt='Film Store Logo'
        />
    </Link>
    <Divider />
    <List>
        <ListSubheader>Categories</ListSubheader>
        { categories.map(({label, value}) => (
            <Link key={value} className={ classes.links } to='/' >
                <ListItem onClick = {() => dispatch(selectGenreOrCategory(value))} button >
                    <ListItemIcon>
                        <img src={genreIcons[label.toLowerCase()]} className={ classes.genreImages } height={30} />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
            </Link>
        ))}
    </List>
    <Divider />
    <List>
        <ListSubheader>Genres</ListSubheader>
        { isFetching ? (
            <Box display='flex' justifyContent='center'>
                <CircularProgress />
            </Box>
        ) : data.genres.map(({name, id}) => (
            <Link key={name} className={ classes.links } to='/' >
                <ListItem onClick = {() => dispatch(selectGenreOrCategory(id))} button>
                        <ListItemIcon>
                                <img src={genreIcons[name.toLowerCase()]} className={ classes.genreImages } height={30} />
                        </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItem>
            </Link>
        ))}
    </List>
    </>
  );
};

export default SideBar;