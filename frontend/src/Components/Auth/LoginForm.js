import { Link, useNavigate } from "react-router-dom";
import { Fragment, useRef, useState, useContext } from "react";

import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import UpdatePasswordModal from "../Modals/UpdatePasswordModal";
import { RegInput } from "../UI/FormStyles";

let login_url = process.env.REACT_APP_LOGIN;

const LoginForm = () => {
    const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
    const navigate = useNavigate();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const usernameInput = usernameRef.current.value;
        const passwordInput = passwordRef.current.value;

        setIsLoading(true);

        fetch(
            login_url,
            {
              method: 'POST',
              body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
              }),
              headers: {
                'Content-Type': 'application/json',
              }
              
            }
            ).then(async res => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(data => {
                        let errorMessage = 'Authentication Failed';
                        if (data && data.error && data.error.message) {
                          errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            }).then((data) => {   
                authCtx.login(data.access, data.refresh, data.username, data.lastLogin);
                navigate('/home/logged_in');
                window.location.reload(true);
            })
            .catch((err) => {
                alert(err.message);
            });
        }
    
    const handleForgotPasswordClick = () => {
        setIsUpdatePasswordModalOpen(true);
    };

    const handleCloseUpdatePasswordModal = () => {
        setIsUpdatePasswordModalOpen(false);
    };

    const sectionClassName = "h-full w-full inline-block py-2";

    return (
        <Fragment>
            <div className="h-full w-1/3 m-auto flex py-3">
                <div className="w-5/6 h-ft block m-auto">
                    <p className="w-full text-center font-bold text-3xl">Login</p>

                    <form className="h-fit w-fit my-auto inline-block" onSubmit={submitHandler}>
                            { isLoading && <LoadingSpinner /> }

                            <div className={sectionClassName}>
                                <h1 className="py-1">Username</h1>
                               <input 
                                    type='text' 
                                    className={RegInput} 
                                    required
                                    placeholder="username" 
                                    ref={usernameRef}
                                />
                            </div>
                            <div className={sectionClassName}>
                                <h1 className="py-1">Password</h1>
                                <input
                                    type='password'
                                    className={RegInput} 
                                    required 
                                    placeholder="password" 
                                    ref={passwordRef}    
                                />
                            </div>
                            <div className={sectionClassName}>
                                <div className="h-full w-3/4 mx-auto my-5">
                                   <button type="submit" className="w-full text-sm h-10 shadow-md shadow-black/20 border-solid border border-text-white/30 rounded-lg hover:bg-text-white/20">
                                        Sign In
                                    </button> 
                                </div>
                                
                            </div>

                            <div className="flex w-1/2 m-auto justify-self-center mt-5 h-5">
                                <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                                <div className="w-6 m-auto float-left text-center border-solid border border-text-white/40 rounded-md bg-text-white/20">    
                                    <p className="text-xs">Or</p>
                                </div>
                                <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                            </div>
                            
                            <div className="w-full h-12 my-5 text-center">
                                <Link to="/register" className='w-full text-sm'>
                                    Not a member? Create an account here!
                                </Link>
                                <br />
                                <div>
                                    <div className='w-full italic text-sm cursor-pointer' onClick={handleForgotPasswordClick}>
                                        Forgot password?
                                    </div>

                                    {isUpdatePasswordModalOpen && <UpdatePasswordModal onClose={handleCloseUpdatePasswordModal} autoUpdate={false} /> }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
        </Fragment>
    );
};

export default LoginForm;