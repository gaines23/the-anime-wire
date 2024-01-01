import { Button, TextField } from "@mui/material";
import { Fragment, useState } from "react";
import { postUserSignups } from "../../lib/aw-api";
import { Link } from "react-router-dom";

const UnderConstructionPage = () => {
    const [new_email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await postUserSignups({email: new_email});
            alert("Thanks for the submission! Keep an eye out for new updates.");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <div className="w-3/4 h-fit mx-auto inline-block overflow-none space-y-3 scroll-smooth scrollbar scrollbar-height:sm scrollbar-width:thin scrollbar-thumb-light-grey scrollbar-track-transparent">
                <h1 className="w-max h-fit center align-center m-auto">Under Construction</h1>

                <div className="p-5 w-full flex h-fit m-auto">
                    <div className="w-max h-max m-auto inline-block">
                        <span className="w-full h-max flex mx-auto mb-8 center text-center">
                            <p className="w-fit h-max mx-auto text-2xl">
                                <b>
                                    Anime Wire’s building an app where fans create lists, <br/>
                                    build community, and share their passion for anime in one unified space.
                                </b>
                            </p>
                        </span>

                        <span className="w-full h-max block text-center mx-auto my-10 whitespace-normal tracking-normal  leading-relaxed ">
                            Anime Wire is fans' new home for building anime lists, community, and sharing anime with friends.
                        
                            Today, sharing anime with friends is done with too many apps and not enough focus on the community-at-large. 
                            
                            Anime Wire is designed to fix that by building unique, shareable lists that link out to your favorite streaming services.
                            
                            We’re building in public right now, and we hope you will follow us along in our journey.
                        </span>

                        <span className="w-max h-max flex mx-auto text-xl">
                            <p className="w-max h-max mx-auto">Want to learn more?</p>
                        </span>
                        <span className="w-max h-max flex mx-auto mt-3 text-xl">
                            <p>
                                Fill out the form to sign up for our upcoming beta and receive updates on new features we release!
                            </p>
                        </span>

                        <div className="w-2/3 h-fit flex mx-auto mt-2">
                            <form className="w-max h-full flex mx-auto">
                                <input 
                                    className="bg-bg-fill/20 text-text-white rounded-md h-12 w-96 mx-2 my-auto text-center outline-none border-none hover:border hover:border-solid hover:border-light-grey"
                                    type="email"
                                    name="email"
                                    placeholder="@email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Button 
                                    type="submit" 
                                    className="w-28 mr-auto rounded-md"
                                    variant="outlined"
                                    sx={{
                                        backgroundColor: '#44354e',
                                        border: 'none',
                                        borderRadius: '6px',
                                        color: '#BABABA',
                                        "&:hover": {
                                            backgroundColor: '#44354e',
                                            border: '1px solid #BABABA',
                                            borderRadius: '6px',
                                            color: '#BABABA',                              
                                        },
                                    }}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>

                    
                </div>

                <div className="w-full h-max float-right">
                    <Link 
                        to="/login"
                        className="h-full w-full"
                    >
                        <p className="h-full w-max my-auto p-1 float-right rounded-l-lg text-dark-purple">
                            Login
                        </p>
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}

export default UnderConstructionPage;