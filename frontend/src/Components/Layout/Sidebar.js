import { Box, Divider, MenuItem, Stack } from "@mui/material";
import { Fragment } from "react"

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import NewAW from '../../assets/150x100.png';

const Sidebar = () => {
    return (
        <Fragment>
            <Box className="h-full">
                <div className="w-full h-full inline-block border-r border-r border-r-aw-teal/30">
                    <Stack className="h-max w-full py-5">
                        <MenuItem>
                            <HomeIcon size="small"/>
                            <span className="px-2">Home</span>
                        </MenuItem>

                        <MenuItem>
                            <SearchIcon size="small" />
                            <span className="px-2">Search</span>
                        </MenuItem>

                        <Stack className="h-fit w-full ">
                            <MenuItem>
                                <span className="text-gray-500 text-sm font-medium">Activity</span>
                            </MenuItem>

                            <MenuItem>
                                <Diversity3Icon size="small" />
                                <span className="px-2">Friends</span>
                            </MenuItem>

                            <MenuItem>
                                <LightbulbIcon size="small" />
                                <span className="px-2">Discover</span>
                            </MenuItem>
                        </Stack>
                    </Stack>

                    <Divider light />

                    <Stack>
                        <MenuItem>
                            <span className="text-gray-500 text-sm font-medium">Playlists</span>
                        </MenuItem>

                        <MenuItem>
                            <FavoriteIcon size="small" />
                            <span className="px-2">Favorites</span>
                        </MenuItem>

                        <MenuItem>
                            <PersonalVideoIcon size="small" />
                            <span className="px-2 text-sm">Watchlist</span>
                        </MenuItem>
                    </Stack>

                    <Divider light />

                </div>
            </Box>
        </Fragment>
    )
}

export default Sidebar;