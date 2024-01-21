import { Fragment, useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { Box, Stack } from '@mui/material';
import TopMenu from './TopMenu';
import Sidebar from './Sidebar';

/*
    sm - 640
    md - 768
    lg - 1024
    xl - 1280
    2xl - 1536

*/

const Layout = (props) => {
    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    
    return (
        <Fragment>
            <div className="h-screen w-screen flex flex-col py-3">

                { isLoggedIn ?
                    <div className="w-screen h-full flex flex-row">
                        <div className="w-full basis-1/12 h-full">
                            <Sidebar />
                        </div>

                        <Stack className="w-full flex basis-11/12">
                            <main className="h-screen w-full mx-auto rounded-l-md grid auto-rows-max grid-flow-col grid-cols-12">
                                <Box className="w-full h-screen flex flex-col col-span-full px-1">
                                    <TopMenu />
                                    {props.children}
                                </Box>
                            </main> 
                        </Stack>
                    </div>
                : <>
                    <TopMenu />
                    <main className="flex w-full h-screen px-3">
                        <Box className="h-full w-full flex">
                            {props.children}
                        </Box>
                    </main>
                </>
                }
            </div>
        </Fragment>
    );
};

export default Layout;