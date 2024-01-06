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
            <div className="w-full h-screen md:h-5/6 m-auto inline-block overflow-hidden">
                <h1 className="w-max h-fit center align-center m-auto">Under Construction</h1>

                <div className="w-full md:w-2/3 h-max m-auto">
                    <span className="hidden md:w-full h-max flex mx-auto center text-center my-5">
                        <p className="w-fit h-max mx-auto text-lg md:text-2xl font-semibold">
                            Anime Wire’s building an app where fans create lists,
                            build community, and share their passion for anime in one unified space.
                        </p>
                    </span>
                        
                    <span className="hidden md:w-4/5 h-max md:block text-center mx-auto my-6 whitespace-normal tracking-normal leading-relaxed">                            
                        Anime Wire is fans' new home for building anime lists, community, and sharing anime with friends.
                    
                        Today, sharing anime with friends is done with too many apps and not enough focus on the community-at-large. 
                        
                        Anime Wire is designed to fix that by building unique, shareable lists that link out to your favorite streaming services.
                            
                        We’re building in public right now, and we hope you will follow us along in our journey.
                    </span>

                    <span className="w-full block md:hidden h-max font-semibold text-center mx-auto my-3 whitespace-normal tracking-normal leading-relaxed">                            
                        Anime Wire is a dedicated platform where fans can create and share anime lists, 
                        fostering a vibrant community centered around the love for anime.
                    </span>
                    <span className="w-full block md:hidden h-max text-center mx-auto my-3 whitespace-normal tracking-normal leading-relaxed">                            
                        Our focus is on simplifying the process by providing a unique, 
                        shareable list format that seamlessly connects to your preferred streaming services.
                    </span>

                    <div className="h-max mt-auto block">
                        <span className="w-max h-max flex mx-auto text-xl">
                            <p className="w-max h-max mx-auto">Want to learn more?</p>
                        </span>
                        <span className="w-full h-max flex mt-3">
                            <p className="text-lg text-center w-max mx-auto">
                                Fill out the form to sign up for our upcoming beta and receive updates on new features we release!
                            </p>
                        </span>

                        <div className="w-full h-fit flex mx-auto mt-2">
                            <form className="w-max h-full inline-block md:flex mx-auto mt-2">
                                <input 
                                    className="bg-bg-fill/20 text-text-white text-sm rounded-md h-12 w-64 md:w-80 mx-2 my-auto text-center outline-none border-none hover:border hover:border-solid hover:border-light-grey"
                                    type="email"
                                    name="email"
                                    placeholder="@email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className="w-max mx-auto mt-3 md:mt-0">
                                    <Button 
                                        type="submit" 
                                        className="w-28 h-full rounded-md mx-auto flex "
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
                                </div>
                            </form>
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
            </div>
        </Fragment>
    );
}

export default UnderConstructionPage;