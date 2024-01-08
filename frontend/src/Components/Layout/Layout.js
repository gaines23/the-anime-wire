import { Fragment, useState, useContext } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import AuthContext from '../../store/auth-context';
import { Box, Divider } from '@mui/material';
import TopMenu from './TopMenu';
import Sidebar from './Sidebar';

import NewAW from '../../assets/150x100.png';
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
                    <div className="grid grid-cols-12 w-screen h-full">
                        <div className="w-full pr-2 flex flex-col col-span-2 hidden sm:flex md:col-span-2 lg:col-span-1 xl:col-span-2 2xl:col-span-2">
                        
                            <div className="w-full h-max mx-auto">
                                <img 
                                    src={NewAW}
                                    className="w-max h-fit m-auto"
                                />
                            </div>

                            <Sidebar />
                        </div>

                        <main className="flex w-full px-3 col-span-10 sm:col-span-12 md:col-span-10 lg:col-span-11 xl:col-span-10 2xl:col-span-10">
                            <div className='w-screen h-full col-span-1'>
                                <TopMenu />

                                <Box className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar scrollbar-height:sm scrollbar-width:thin scrollbar-thumb-text-purple/60 scrollbar-track-transparent">
                                    {props.children}
                                </Box>
                            </div>
                        </main>
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