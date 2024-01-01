import { Fragment, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import { addUserRegistration } from "../../lib/aw-api";
import UserOptions from "../Home/UserOptions";
import { RegInput } from "../UI/FormStyles";


const RegisterForm = () => {
    const navigate = useNavigate();

    const [getUsername, setUsername] = useState('');
    const [getEmail, setEmail] = useState('');
    const [getPass1, setPass1] = useState('');
    const [getPass2, setPass2] = useState('');

    const [openOptions, setOptions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePass1 = (e) => {
        setPass1(e.target.value);
    }

    const handlePass2 = (e) => {
        setPass2(e.target.value);
    }

    const submitRegisterForm = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        const info = {
            username: getUsername,
            email: getEmail,
            password1: getPass1,
            password2: getPass2
        }
        
        try {
            const res = await addUserRegistration(info);
            if (res.status === 201) {
                const { id, access_token, refresh_token } = res.data;

                localStorage.setItem('user_id', id);
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);

                navigate('/home/logged_in', { replace: true });
                window.location.reload(false);
            } else {
                alert("Something went wrong! Try again");
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const sectionClassName = "h-full w-full inline-block py-2";

    return (
        <Fragment>
            <div className="h-full w-1/3 m-auto flex py-3">
                <div className="w-5/6 h-5/6 block mx-auto">
                    <p className="w-full text-center font-bold text-3xl">Register</p>

                    <form className="h-fit w-fit my-auto inline-block" onSubmit={submitRegisterForm}>
                            
                        {isLoading && (
                            <LoadingSpinner />
                        )}

                        <div className={sectionClassName}>
                            <h1 className="py-1">Username</h1>
                            <input 
                                type='text' 
                                className={RegInput} 
                                required
                                onChange={handleUsername}
                                placeholder="username" 
                            />
                        </div>
                        <div className={sectionClassName}>
                            <h1 className="py-1">Email</h1>
                            <input 
                                type="email" 
                                className={RegInput} 
                                required
                                placeholder="email" 
                                onChange={handleEmail}
                            />
                        </div>
                        <div className={sectionClassName}>
                            <h1 className="py-1">Password</h1>
                            <input
                                type='password'
                                className={RegInput} 
                                required 
                                placeholder="password" 
                                onChange={handlePass1}
                            />
                        </div>
                        <div className={sectionClassName}>
                            <h1 className="py-1">Re-Type Password</h1>
                            <input
                                type='password'
                                className={RegInput} 
                                required 
                                placeholder="password" 
                                onChange={handlePass2}
                            />
                        </div>
                        <div className="h-16 w-4/5 m-auto text-xs my-3">
                            <div className="h-full w-5/6 mx-auto">                           
                                <button 
                                    type="submit" 
                                    className="w-full text-sm h-10 shadow-md shadow-black/20 border-solid border border-text-white/30 rounded-lg hover:bg-text-white/20"
                                    onClick={submitRegisterForm}
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>

                        {/* {openOptions && <UserOptions close={setOptions} />} */}
                            
                        <div className="flex w-1/2 m-auto justify-self-center mt-5 h-5">
                            <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                            <div className="w-6 m-auto float-left text-center border-solid border border-input-fill/40 rounded-md bg-input-fill/20">    
                                <p className="text-xs">Or</p>
                            </div>
                            <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                        </div>

                        <div className="w-full h-12 mt-5 text-center">
                            <NavLink to="/user/login" className='w-full text-xs'>
                                Aleady have an account?
                            </NavLink>
                            <br />
                            <Link to="" className='w-full italic text-xs'>Forgot password?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;