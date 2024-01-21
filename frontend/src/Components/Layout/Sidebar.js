import { Box, Button, Divider, MenuItem, Stack, Tooltip } from "@mui/material";
import { Fragment, useState, useContext } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import NewAW from '../../assets/150x100.png';
import { Link } from "react-router-dom";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Fragment>
            <div className="w-full h-20 mx-auto">
                <img 
                    src={NewAW}
                    className={`h-20 m-auto ${isOpen ? '`w-max' : 'w-full'}`}
                />
            </div>

            <Box className={`h-full px-1 mr-auto ${isOpen ? 'w-40' : 'w-20'}`}>
                <div className="flex grouph-8 w-10 mx-auto">
                    <button
                        className="w-full h-8 w-10 px-2 rounded-lg hover:border hover:border-1 hover:border-text-white/50 outline-none hover:shadow hover:shadow-md hover:shadow-text-white/10"
                        onClick={handleToggle}
                        title={isOpen ? "Hide" : "Expand"}
                    >
                        <p className="w-fit h-fit m-auto text-center text-input-fill/70 text-md">
                            {isOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
                        </p>
                    </button>
                </div>

                <div className="w-full h-5/6 inline-block border border-aw-teal/10 bg-bg-white/10 rounded-md py-2 my-1">
                    <Stack className="h-1/3 w-5/6 m-auto">
                        <Tooltip
                            title="Home"
                            arrow
                            placement={"right"}
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
                            <Link to="/" className="w-full h-full">
                                <ul className={`${isOpen ? 'w-full h-full' : 'w-10'} m-auto cursor-pointer hover:bg-bg-white/20 rounded-xl`}>
                                    <div className={`h-10 flex m-auto ${isOpen ? 'w-24 h-full' : 'w-max'}`}>
                                        <HomeIcon size="small" className={`h-max ${isOpen ? 'my-auto pr-1' : 'm-auto'}`} />
                                        <span className={`text-sm h-4 my-auto ${isOpen ? 'pl-1' : 'hidden'}`}>Home</span>
                                    </div>
                                </ul>
                            </Link>
                        </Tooltip>
                        <Tooltip
                            title="Search"
                            arrow
                            placement={"right"}
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
                            <Link to="/search" className="w-full h-full">
                                <ul className={`${isOpen ? 'w-full h-full' : 'w-10'} m-auto cursor-pointer hover:bg-bg-white/20 rounded-xl`}>
                                    <div className={`h-10 flex m-auto ${isOpen ? 'w-24 h-full' : 'w-max'}`}>
                                        <SearchIcon size="small" className={`h-max ${isOpen ? 'my-auto pr-1' : 'm-auto'}`}/>
                                        <span className={`text-sm h-max my-auto ${isOpen ? 'pl-1' : 'hidden'}`}>Search</span>
                                    </div>
                                </ul>
                            </Link>
                        </Tooltip>
                        
                        <ul className="h-6 my-auto grid">
                            <span className={`${isOpen ? 'text-gray-500 h-max my-auto text-sm' : 'hidden'}`}>Activity</span>
                            <div className={`${isOpen ? 'hidden': 'my-auto'}`}>
                                <Divider sx={{'borderColor': '#5FDCE136'}}/>
                            </div>
                        </ul>

                        <Tooltip
                            title="Friends"
                            arrow
                            placement={"right"}
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
                            <ul className={`${isOpen ? 'w-full h-full' : 'w-10'} m-auto cursor-pointer hover:bg-bg-white/20 rounded-xl`}>
                                <div className={`h-10 flex m-auto ${isOpen ? 'w-24 h-full' : 'w-max'}`}>
                                    <Diversity3Icon size="small" className={`h-max ${isOpen ? 'my-auto pr-1' : 'm-auto'}`} />
                                    <span className={`text-sm h-4 my-auto ${isOpen ? 'pl-1' : 'hidden'}`}>Friends</span>
                                </div>
                            </ul>
                        </Tooltip>
                        
                        <Tooltip
                            title="Discover"
                            arrow
                            placement={"right"}
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
                            <ul className={`${isOpen ? 'w-full h-full' : 'w-10'} m-auto cursor-pointer hover:bg-bg-white/20 rounded-xl`}>
                                <div className={`h-10 flex m-auto ${isOpen ? 'w-24 h-full' : 'w-max'}`}>
                                    <LightbulbIcon size="small" className={`h-max ${isOpen ? 'my-auto pr-1' : 'm-auto'}`} />
                                    <span className={`text-sm h-4 my-auto ${isOpen ? 'pl-1' : 'hidden'}`}>Discover</span>
                                </div>
                            </ul>
                        </Tooltip>
                    </Stack>

                    <Stack className="h-1/5 w-5/6 m-auto">
                        <ul className="h-6 my-2 grid">
                            <span className={`${isOpen ? 'text-gray-500 h-max my-auto text-sm' : 'hidden'}`}>Playlists</span>
                            <div className={`${isOpen ? 'hidden': 'text-sm my-auto'}`}>
                                <Divider sx={{'borderColor': '#5FDCE136'}}/>
                            </div>
                        </ul>

                        <Tooltip
                            title="Favorites"
                            arrow
                            placement={"right"}
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
                            <ul className={`${isOpen ? 'w-full  h-full' : 'w-10'} m-auto cursor-pointer hover:bg-bg-white/20 rounded-xl`}>
                                <div className={`h-10 flex m-auto ${isOpen ? 'w-24 h-full' : 'w-max'}`}>
                                    <FavoriteIcon size="small" className={`h-max ${isOpen ? 'my-auto pr-1' : 'm-auto'}`} />
                                    <span className={`text-sm h-4 my-auto ${isOpen ? 'pl-1' : 'hidden'}`}>Favorites</span>
                                </div>
                            </ul>
                        </Tooltip>

                        <Tooltip
                            title="Watchlist"
                            arrow
                            placement={"right"}
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
                            <ul className={`${isOpen ? 'w-full h-full' : 'w-10'} m-auto cursor-pointer hover:bg-bg-white/20 rounded-xl`}>
                                <div className={`h-10 flex m-auto ${isOpen ? 'w-24 h-full' : 'w-max'}`}>
                                    <PersonalVideoIcon size="small" className={`h-max ${isOpen ? 'my-auto pr-1' : 'm-auto'}`} />
                                    <span className={`text-sm h-4 my-auto ${isOpen ? 'pl-1' : 'hidden'}`}>Watchlist</span>
                                </div>
                            </ul>
                        </Tooltip>
                    </Stack>
                </div>
            </Box>
        </Fragment>
    )
}

export default Sidebar;