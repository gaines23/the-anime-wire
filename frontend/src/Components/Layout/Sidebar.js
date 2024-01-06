import { Box, Divider, MenuItem, Stack } from "@mui/material";
import { Fragment } from "react"

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ViewListIcon from '@mui/icons-material/ViewList';

const Sidebar = () => {
    return (
        <Fragment>
            <Box>
                <div className="w-full h-full inline-block">
                    <Stack>
                        <MenuItem>
                           <HomeIcon /> Home
                        </MenuItem>

                        <MenuItem>
                            <SearchIcon /> Search
                        </MenuItem>

                        <MenuItem>
                            <Diversity3Icon /> Friends
                        </MenuItem>
                    </Stack>

                    <Divider light/>

                    <Stack>
                        <MenuItem>
                            <ViewListIcon /> My Lists
                        </MenuItem>
                    </Stack>
                    
                </div>
            </Box>
        </Fragment>
    )
}

export default Sidebar;