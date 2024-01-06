import { Button, Modal, TextField } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { postUserSignups } from "../../lib/aw-api";
import { Link } from "react-router-dom";
import UserOptions from "./UserOptions";

const HomePage = () => {
    const [openNewUser, setOpenNewUser] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('new_auth')) {
            setOpenNewUser(true);
        }
    }, [setOpenNewUser]);

    const handleOpenNew = () => {
        setOpenNewUser(true);
    };
    
    const handleCloseNew = () => {
        setOpenNewUser(false);
    };
  

    return (
        <Fragment>
            <div className="w-full h-full px-3">
                <h1 className="w-max h-fit center align-center m-auto">HOME</h1>               
            

                {localStorage.getItem('new_auth') &&
                    (<Modal
                        open={openNewUser}
                        onClose={handleCloseNew}
                        className="bg-opacity-50 bg-white/10 bg-blend-normal h-full"
                        sx={{
                            position: 'relative'
                        }}
                    >
                        <div>
                            <UserOptions 
                                handleClose={handleCloseNew}
                                handleOpen={handleOpenNew}
                            />
                        </div>
                    </Modal>
                )}
            </div>
        </Fragment>
    );
}

export default HomePage;