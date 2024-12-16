import React from 'react'
import { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles';
import { SideBar } from '..';

const Navbar = () => {
const classes = useStyles();
const isMobile = useMediaQuery('(max-width:600px)');
const theme = useTheme()
const isAuth = true; //dummy variable
const [ mobileOpen, setMobileOpen ] = useState(false);

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
                {!isMobile && 'Search...'}
                <div>
                    {!isAuth ? (
                        <Button color='inherit' onClick={() => {}}>
                            Login &nbsp; <AccountCircle />
                        </Button>
                    ) : (
                        <Button
                                color='inherit'
                                component={ Link }
                                to={`./Profile/:id`}
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
                {isMobile && 'Search...'}
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