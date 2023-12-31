import { Fragment, useRef } from "react";
import { NavLink, Link } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";


const RegisterForm = (props) => {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordOneRef = useRef();
    const passwordTwoRef = useRef();

    function submitRegisterForm(e) {
        e.preventDefault();

        const usernameInput = usernameRef.current.value;
        const emailInput = emailRef.current.value;
        const passwordOneInput = passwordOneRef.current.value;
        const passwordTwoInput = passwordTwoRef.current.value;

        props.onRegisterUser(
            { 
                username: usernameInput,
                email: emailInput,
                password1: passwordOneInput,
                password2: passwordTwoInput,
            }
        );
    }

    const inputClassName = "w-full h-9 mt-1 pl-5 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 focus:border-input-fill hover:bg-input-fill/10 focus:text-sm focus:outline-none focus:bg-input-fill/10";
    const sectionClassName = "h-16 w-4/5 m-auto text-xs my-1";

    return (
        <Fragment>
            <div className="h-5/6 w-1/3 m-auto flex text-input-fill/60">
                <div className="w-5/6 h-4/6 flex m-auto self-center bg-bg-fill/30 rounded-lg shadow shadow-md shadow-bg-fill/40">
                    <div className="h-auto w-full my-auto p-2">
                        <p className="w-full text-center font-bold text-3xl">Register</p>

                        <form className="h-auto w-full my-auto" onSubmit={submitRegisterForm}>
                            
                            {props.isLoading && (
                                    <LoadingSpinner />
                            )}

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
                                <label htmlFor='email' className="w-full">Email</label>
                                <br />
                                <input 
                                    type='email' 
                                    className={inputClassName} 
                                    required
                                    placeholder="email" 
                                    ref={emailRef}
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
                                    ref={passwordOneRef}    
                                />
                            </div>
                            <div className={sectionClassName}>
                                <label htmlFor='password'>Re-Type Password</label>
                                <br />
                                <input
                                    type='password'
                                    className={inputClassName} 
                                    required 
                                    placeholder="password" 
                                    ref={passwordTwoRef}    
                                />
                            </div>
                            <div className="h-16 w-4/5 m-auto text-xs my-3">
                                <div className="h-full w-5/6 mx-auto">                           
                                    <button type='submit' className="w-full text-sm h-10 shadow-md shadow-black/20 border-solid border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10">
                                        Create Account
                                    </button>
                                </div>
                            </div>
                            

                            <div className="flex w-1/2 m-auto justify-self-center mt-5 h-5">
                                <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                                <div className="w-6 m-auto float-left text-center border-solid border border-input-fill/40 rounded-md bg-input-fill/20">    
                                    <p className="text-xs">Or</p>
                                </div>
                                <p className="w-16 h-3 float-left border-b-2 border-solid border-white/30"></p>
                            </div>

                            <div className="w-full h-12 mt-5 text-center">
                                <NavLink to="/fahrenheit/user/login/" className='w-full text-xs'>
                                    Aleady have an account?
                                </NavLink>
                                <br />
                                <Link to="" className='w-full italic text-xs'>Forgot password?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default RegisterForm;