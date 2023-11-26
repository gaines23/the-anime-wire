import { Fragment, useRef, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';

import useHttp from "../../hooks/use-http";
import { getUpdatePassword } from "../../lib/aw-api";

let user_token = localStorage.getItem('token');

const UpdatePasswordModal = ({onClose, autoUpdate, username}) => {
    const { sendRequest } = useHttp(getUpdatePassword, true);

    const oldRef = useRef();
    const newRef = useRef();

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const oldInput = oldRef.current.value;
        const newInput = newRef.current.value;

        setIsLoading(true);

        try {
            await sendRequest({ old_password: oldInput, new_password: newInput, username: username });
            onClose();
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    console.log(user_token)

    const inputClassName = "w-full h-9 mt-1 pl-5 shadow-md shadow-black/20 text-black border-solid border border-text-white/30 color-black rounded-lg";
    const sectionClassName = "h-16 w-4/5 m-auto text-xs my-5";
    
    return (
        <Fragment>
            <Dialog open={true}>
                <DialogTitle>Update Current Password</DialogTitle>
                <DialogContent>
                    { !autoUpdate ? (
                    <>
                        <div className={sectionClassName}>
                        <label htmlFor='old_password'>Old Password</label>
                            <br />
                        <input
                            type='password'
                            className={inputClassName} 
                            required 
                            placeholder="old password" 
                            ref={oldRef}    
                        />
                        </div>

                        <div className={sectionClassName}>
                        <label htmlFor='new_password'>New Password</label>
                            <br />
                        <input
                            type='password'
                            className={inputClassName} 
                            required 
                            placeholder="new password" 
                            ref={newRef}    
                        />
                        </div>
                    </>
                    ) : (
                    <>
                        <DialogContentText>Every 72 Days (3 months) We Ask For You to Change Your Password For Security Purposes.</DialogContentText>
                        <div className={sectionClassName}>
                            <label htmlFor='old_password'>Old Password</label>
                                <br />
                            <input
                                type='password'
                                className={inputClassName} 
                                required 
                                placeholder="old password" 
                                ref={oldRef}    
                            />
                        </div>

                        <div className={sectionClassName}>
                            <label htmlFor='new_password'>New Password</label>
                                <br />
                            <input
                                type='password'
                                className={inputClassName} 
                                required 
                                placeholder="new password" 
                                ref={newRef}    
                            />
                        </div>
                    </>
                    )}
                </DialogContent>
                <DialogActions>
                    {!autoUpdate && <Button onClick={onClose}>Close</Button>}

                    <Button onClick={handleUpdatePassword} variant="contained" color="primary" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default UpdatePasswordModal;
