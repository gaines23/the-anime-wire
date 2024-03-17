import { Fragment } from "react";
import { TMBD_POSTER_w45 } from "../../../lib/constants";

const CrewCard = ({item}) => {
    return (
        <Fragment>
            <div className="h-16 w-5/6 my-1 mx-1 flex bg-input-fill/10 hover:border rounded-md text-input-fill/60 hover:border-input-fill/30">
                <div className="w-1/3 h-12 my-auto mx-1 float-left flex">
                    {(item.profile_path || item.image) ? 
                        <img 
                            src={item.profile_path ? `${TMBD_POSTER_w45}${item.profile_path}` : `${item.image.url}`}
                            alt="crewimg" 
                            className="h-12 w-full object-cover m-auto rounded-md"
                        /> : 
                        <p className="m-auto text-sm text-center">Image N/A</p>
                    }
                </div>
                <div className="w-2/3 h-auto float-right m-auto px-1">
                    <p className="w-full text-xs text-center">{item.name}</p>
                </div>
            </div>
        </Fragment>
    );
};

export default CrewCard;