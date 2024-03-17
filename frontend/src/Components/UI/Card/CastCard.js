import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { TMBD_POSTER_w45 } from "../../../lib/constants";

const CastCard = ({item}) => {
        return (
            <Fragment>
                <Link 
                    to={{
                        // pathname: `/credit-details/${tmdb_id}/${imdb_id}`,
                        // state: {
                        //     tmdbId: tmdb_id,
                        //     imdbId: imdb_id,
                        // }
                    }}
                >
                    <div className="h-20 w-full flex bg-bg-fill/10 hover:bg-bg-fill/20 hover:backdrop-blur-lg hover:bg-opacity-10 hover:border rounded-md text-input-fill/60 hover:border-input-fill/30">
                        <div className="h-16 my-auto mx-1 float-left flex">
                            {item.profile_path ?
                                <img 
                                    src={TMBD_POSTER_w45 + item.profile_path}
                                    alt="castimg" 
                                    className="h-full w-full object-cover m-auto rounded-md"
                            /> : <p className="m-auto text-sm text-center">Image N/A</p>
                            }
                        </div>
                        <div className="w-2/3 h-auto float-right m-auto px-1">
                            <p className="w-full text-sm font-bold text-center px-1 truncate">{item.name}</p>
                            <p className="w-full text-xs font-thin text-center px-1">{item.character ? item.character : item.roles[0].character}</p>
                            <p className="w-full text-xs font-thin text-center px-1">{item.roles && `(${item.total_episode_count} Eps)`}</p>
                        </div>
                    </div>
                </Link>
            
            </Fragment>

        );
    }

export default CastCard;