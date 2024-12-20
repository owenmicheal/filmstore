import React, { useEffect } from 'react'
import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles';
import { SideBar, Search } from '..';
import { fetchToken, createSessionId, moviesApi } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';

import { setUser, userSelector } from '../../features/auth';

const Navbar = () => {
const { isAuthenticated, user } = useSelector(userSelector)
const classes = useStyles();
const isMobile = useMediaQuery('(max-width:600px)');
const theme = useTheme()
const [ mobileOpen, setMobileOpen ] = useState(false);
const dispatch = useDispatch()

const token = localStorage.getItem('request_token');
const sessionIdFromLocalStorage = localStorage.getItem('session_id');

useEffect(() => {
    const loginUser = async () => {
        if(token) {
            if(sessionIdFromLocalStorage) {
                const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)

                dispatch(setUser(userData));
            } else {
                const sessionId = await createSessionId();

                const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)

                dispatch(setUser(userData));
            }
        };
    };

    loginUser();

}), [token];

  return (
    <>
    <AppBar position='fixed'>
        <Toolbar className={ classes.toolbar }>
            {isMobile && (
                <IconButton
                color="inherit"
                edge="start"
                style={{ outline: 'none' }}
                onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                className={ classes.menuButton } >
                    <Menu />
                </IconButton>
            )}
                <IconButton color='inherit' sx={{ ml: 1}} onClick={() => {}}>
                    { theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
                </IconButton>
                {!isMobile && <Search /> }
                <div>
                    {!isAuthenticated ? (
                        <Button color='inherit' onClick={ fetchToken }>
                            Login &nbsp; <AccountCircle />
                        </Button>
                    ) : (
                        <Button
                                color='inherit'
                                component={ Link }
                                to={`./Profile/${user.id}`}
                                className={ classes.linkButton }
                                onClick={() => {}}
                        >
                            { !isMobile && <>My Movies &nbsp;</> }
                            <Avatar 
                                style={{ width: 30, height: 30 }}
                                alt='Profile'
                                src='https://avatar.iran.liara.run/public/boy'
                            />
                        </Button>
                    )}
                </div>
                {isMobile && <Search /> }
        </Toolbar>
    </AppBar>

    <div>
        <nav className={ classes.drawer }>
            {isMobile ? (
                <Drawer
                    variant='temporary'
                    anchor='right'
                    open={mobileOpen}
                    onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                    classes={{ paper: classes.drawerPaper }}
                    ModalProps={{keepMounted: true}}
                >
                    <SideBar setMobileOpen={ setMobileOpen}/>
                </Drawer>
            ) : (
                <Drawer classes={{ paper: classes.drawerPaper}} variant='permanent' open >
                    <SideBar setMobileOpen={ setMobileOpen} />
                </Drawer>
            )}
        </nav>
    </div>
    </>
  )
}

export default Navbar