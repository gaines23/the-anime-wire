import { Link, useNavigate } from "react-router-dom";
import { Fragment, useRef, useState, useContext } from "react";

import AuthContext from "../../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import UpdatePasswordModal from "../Modals/UpdatePasswordModal";

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
                navigate('/home/', { replace: true });
                window.location.reload(false);
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

    const inputClassName = "w-full h-9 mt-1 pl-5 shadow-md shadow-black/20 text-black border-solid border border-text-white/30 color-black rounded-lg";
    const sectionClassName = "h-16 w-4/5 m-auto text-xs my-5";

    return (
        <Fragment>
            <div className="w-full h-full grid col-span-10 absolute">
                <div className="h-103 w-auto self-center flex bg-form-bg-fill/20 rounded-lg shadow shadow-md m-auto sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/3 max-w-screen-xl">
                    <div className="h- w-full my-auto p-2">
                        <p className="w-full fullh-12 mt-3 text-center font-bold text-3xl">
                            Login
                        </p>

                        <form className="h-auto w-full my-auto" onSubmit={submitHandler}>
                            { isLoading && <LoadingSpinner /> }

                            <div className={sectionClassName}>
                                <label htmlFor='username' className="w-full">Username</label>
                                <br />
                                <input 
                                    type='text' 
                                    className={inputClassName} 
                                    required
                                    placeholder="username" 
                                    ref={usernameRef}
                                />
                            </div>
                            <div className={sectionClassName}>
                                <label htmlFor='password'>Password</label>
                                <br />
                                <input
                                    type='password'
                                    className={inputClassName} 
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
                                <Link to="/" className='w-full text-sm'>
                                    Login Problems? Contact Support Here!
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
            </div>
        </Fragment>
    );
};

export default LoginForm;