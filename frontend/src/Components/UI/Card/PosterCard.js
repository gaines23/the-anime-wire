import { Fragment, useState } from 'react';

import { TMBD_POSTER_w500 } from '../../../lib/constants';

const PosterCard = ({item}) => {
    const [isActive, setIsActive] = useState(false);

    // const handleClick = (e) => {
    //     setIsActive(current => !current);
    // }

    const id = item.id;
    const media_type = item.media_type;

    return (
        <Fragment>
            <div
                className="group flex-shrink-0 w-36 mt-3 h-48 rounded-md"
                //onClick={handleClick}
            >
                {item.poster_path ?
                    <img
                        src={TMBD_POSTER_w500+ item.poster_path}
                        alt= {item.name ? item.name : item.title}
                        className={isActive ? 
                            "w-24 h-32 rounded-md object-cover m-auto relative top-4 scale-150 shadow-lg shadow-input-fill/30" :
                            "w-24 h-32 rounded-md object-cover m-auto relative top-4 group-hover:rounded-md group-hover:scale-150 group-hover:shadow-md ease-in-out duration-700 shadow-lg shadow-input-fill/20"
                        }
                        
                    /> : 
                    <div className="w-24 h-32">
                        <p className="my-auto text-sm text-center">Image N/A</p>
                    </div>
                } 
                    
                <div className="h-12 w-36 static rounded-md bg-bg-fill/10 group-hover:display-hidden rounded-md text-input-fill/60">
                    <p className={isActive ? 
                        "hidden" :
                        "w-full relative text-center text-xs group-hover:hidden font-base pt-6 px-2 text-input-fill/60 truncate"
                    }>
                        {item.name ? item.name : item.title}
                    </p>
                </div>
            </div>
        </Fragment>
            
    );
};

export default PosterCard;