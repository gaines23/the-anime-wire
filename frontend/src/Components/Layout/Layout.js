import { Fragment, useState, useContext } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import AuthContext from '../../store/auth-context';
import { Box } from '@mui/material';
import TopMenu from './TopMenu';

/*
    sm - 640
    md - 768
    lg - 1024
    xl - 1280
    2xl - 1536

*/

const Layout = (props) => {
    const [isOpen, setIsOpen] = useState(true);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const authCtx = useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;
    
    return (
        <Fragment>
            <div className="h-screen w-full static">
                <div className="h-full w-full mx-auto block overflow-hidden ">
                    <div className="w-full h-1/6 flex ">
                        <div className="w-full h-full mx-auto flex px-5">
                            <TopMenu />
                        </div>
                        
                    </div>
                 
                    <div className="w-full h-5/6 flex">
                        <main className="h-screen w-full mx-auto rounded-l-md grid auto-rows-max  grid-cols-12">
                            <Box className="w-full h-full flex flex-col col-span-full px-3">
                                {props.children}
                            </Box>
                        </main>
                    </div>
                     
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;