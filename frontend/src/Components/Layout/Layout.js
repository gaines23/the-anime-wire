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
            <div className="h-full w-full static bg-gradient-to-b from-med-blue/70 to-light-blue">
                {/* DELETE AND UPDATE CSS */}
                <TopMenu />

                <div className="h-full w-full mx-auto flex overflow-hidden">
                    {/* <div className="w-fit h-full flex flex-col py-3 ease-in">
                        <div className="w-full h-full mx-auto flex flex-col">
                            {isLoggedIn ? (
                                <> 
                                    {isOpen ? <SideBarOpen /> : <SideBarClosed setIsOpen={setIsOpen}/>}
                                </>
                            ): 
                                <SideBarOpen />
                            }
                        </div>
                        {isLoggedIn &&
                            <div className="flex group px-1 h-8 w-5/6 mx-auto rounded-lg hover:border hover:border-1 hover:border-text-white/50 outline-none hover:shadow hover:shadow-md hover:shadow-text-white/10">
                                <button 
                                    className="w-full h-8"
                                    onClick={handleToggle}
                                    title={isOpen ? "Hide" : "Expand"}
                                >
                                    <p className="w-fit h-fit m-auto text-center text-input-fill/70 text-md">
                                        {isOpen ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
                                    </p>
                                </button>
                            </div>
                        }
                    </div> */}
                 
                    <div className="w-full h-screen sticky z-100 grid grid-flow-col">
                        <main className="h-screen w-full mx-auto rounded-l-md grid auto-rows-max grid-flow-col grid-cols-12">
                            <Box className="w-full h-screen flex flex-col col-span-full px-3">
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