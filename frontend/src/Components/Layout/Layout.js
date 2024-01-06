import { Fragment, useState, useContext } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import AuthContext from '../../store/auth-context';
import { Box } from '@mui/material';
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
            <div className="h-screen w-screen flex flex-col p-3">          
                <TopMenu />

                { isLoggedIn ?
                    <div className="grid grid-cols-12 w-screen h-full overflow-y-auto overflow-x-hidden scroll-smooth scrollbar scrollbar-height:sm scrollbar-width:thin scrollbar-thumb-text-purple/60 scrollbar-track-transparent">
                        <div className="w-full px-2 py-3 flex flex-col col-span-1 hidden sm:flex md:col-span-2 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
                            <Sidebar />
                        </div>

                        <main className="flex w-full col-span-11 sm:col-span-12 md:col-span-10 lg:col-span-11 xl:col-span-11 2xl:col-span-11">
                            <Box className="h-full w-full">
                                {props.children}
                            </Box>
                        </main>
                    </div>
                :   
                    <main className="flex w-full h-screen">
                        <Box className="h-full w-full flex">
                            {props.children}
                        </Box>
                    </main>
                }
            </div>
        </Fragment>
    );
};

export default Layout;