import { Fragment, useContext } from "react"
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { getLogoutUrl } from "../../lib/aw-api";
import { useNavigate } from "react-router-dom";
import Logout from '@mui/icons-material/Logout';
import { ListItemIcon, MenuItem } from "@mui/material";


const LogOut = ({close}) => {
        const navigate = useNavigate();
        const { sendRequest, status } = useHttp(getLogoutUrl);
        const authCtx = useContext(AuthContext);
     
        const logoutHandler = (e) => {
            e.preventDefault();
    
            sendRequest();
            navigate('/home');
            window.location.reload(false);
            authCtx.logout();
            close();
        }
    
        return (
            <Fragment>
               <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Fragment>
        );
    }


export default LogOut;