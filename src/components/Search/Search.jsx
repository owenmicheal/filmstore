import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useStyles from './styles';
import { searchMovie } from '../../features/currentDenreOrCategory';

const Search = () => {
    const classes = useStyles();
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const location = useLocation()

    const handleSearch = () => {
        if (query.trim()) {
            dispatch(searchMovie(query));
            setQuery(''); // Clear the text field
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    if(location.pathname !== '/') return null;

    return (
        <div className={classes.searchContainer}>
            <TextField
                onKeyUp={handleKeyPress}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                variant="standard"
                placeholder="Search movie..."
                InputProps={{
                    className: classes.input,
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Search;
