import { Fragment, useContext, useState, useRef } from "react";
import { Link, NavLink, useMatch } from "react-router-dom";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import NewAW from '../../assets/250x100.png';
import AuthContext from "../../store/auth-context";

const TopMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <Fragment>
            <Box>
                <div className="w-full h-max flex">
                    <div className="w-full h-full col-span-1 flex">
                        <div className="w-max h-max flex px-2 m-auto">
                            {/* {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                            <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                        </div>
                    </div>

                    <div className="w-full h-fit flex col-span-1">
                        { !isLoggedIn &&
                            <div className="w-max h-full mx-auto">
                                <img
                                    src={NewAW}
                                    className="w-auto h-24 m-auto"
                                />
                            </div>
                        }
                    </div>

                    <div className="w-full flex col-span-1 h-fit">
                        <div className="w-max h-max ml-auto my-auto px-5">
                            { isLoggedIn &&
                                <IconButton
                                    onClick={handleClick}
                                    size="small"
                                    sx={{ ml: 2 }}
                                    aria-controls={anchorEl ? "account-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={anchorEl ? "true" : undefined}
                                >
                                    <Avatar sx={{ width: 32, height: 32, backgroundColor: '#5FDCE1' }}>M</Avatar>
                                </IconButton>
                            }
                        </div>
                    </div>
                </div>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <PersonAddIcon fontSize="small" /> Invite Friends
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                        Settings
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                        Logout
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default TopMenu;
