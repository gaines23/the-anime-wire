import { Fragment, useContext, useState } from "react";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";

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
import SearchIcon from '@mui/icons-material/Search';

import NewAW from '../../assets/250x100.png';
import AuthContext from "../../store/auth-context";
import { Select, Tooltip } from "@mui/material";
import { getSearchMovieTv } from "../../lib/aw-api";
import LogOut from "./Logout";

const TopMenu = () => {
    const nav = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCat, setSearchCat] = useState(0);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
  
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const data = await getSearchMovieTv({searchTerm});
            nav('/search', {state: {results: data[0], searchTerm: searchTerm}});
            setSearchTerm('');
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            // Perform any action you want when Enter is pressed
            // For example, submit the search term
            try {
                const data = await getSearchMovieTv({searchTerm});
                nav('/search', {state: {results: data, searchTerm: searchTerm}});
                setSearchTerm('');
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        }
    };

    const handleCategory = (event) => {
        const selectedValue = event.target.value;
        setSearchCat(selectedValue);
    };

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <Fragment>
            <Box>
                <div className="w-full h-20 flex flex-row">
                    <div className="w-full h-full basis-1/3">
                        <div className="w-max h-max flex px-2 m-auto">
                            {/* {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                            <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
                        </div>
                    </div>

                    <div className="w-full h-full flex basis-1/2">
                        { !isLoggedIn &&
                            <div className="w-max h-full mx-auto">
                                <img
                                    src={NewAW}
                                    className="w-auto h-24 m-auto"
                                />
                            </div>
                        }

                        {isLoggedIn && 
                            <div className="h-full w-full flex">
                                <div className="h-max w-full h-12 py-1 px-3 bg-purple-bg/30 rounded-3xl my-auto flex">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        onKeyPress={handleKeyPress}
                                        className="w-full bg-transparent border-none outline-none px-1"
                                    />
                                        <Select
                                            onChange={handleCategory}
                                            value={searchCat}
                                            className="w-32 h-10 outline-none text-text-white border-transparent bg-transparent font-sm outline-transparent mx-1"
                                            sx={{
                                                size: 'small',
                                                fontSize: '12px',
                                                border: '1px solid #F7F8FD2B',
                                                margin: '0px 1px',
                                                color: '#f7f8fd',
                                                outline: 'transparent',
                                            }}                                       
                                        >
                                            <MenuItem value={0}>Movies & TV</MenuItem>
                                            <MenuItem value={1}>Movies</MenuItem>
                                            <MenuItem value={2}>TV</MenuItem>
                                            <MenuItem value={3}>Credits</MenuItem>
                                            <MenuItem value={4}>Playlists</MenuItem>
                                        </Select>
                                        <Tooltip
                                            title="Search"
                                            arrow
                                            placement={"bottom"}
                                            slotProps={{
                                                popper: {
                                                modifiers: [
                                                    {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [0, -5],
                                                    },
                                                    },
                                                ],
                                                },
                                            }}
                                        >
                                            <button className="ml-2" onClick={handleSearch} type="submit"><SearchIcon /></button>
                                        </Tooltip>
                                </div>
                            </div>
                        }
                    </div>

                    <div className="w-full flex basis-1/3 m-auto h-fit">
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

                <LogOut close={handleClose} />
            </Menu>
        </Fragment>
    );
};

export default TopMenu;
