import { Fragment, useEffect } from "react";
import StreamingIcon from "./StreamingIcon";
import { Divider } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonalVideoIcon from '@mui/icons-material/PersonalVideo';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ShareIcon from '@mui/icons-material/Share';

const StreamingInfo = ({streaming}) => {
    return (
        <Fragment>
            <div className="flex flex-row my-2 w-full mx-auto">
                <div className="basis-1/4 w-full flex">
                    <button type='button' 
                        className="w-5/6 m-auto text-xs text-text-white h-10 shadow-md shadow-black/20 border-solid border border-bg-white/30 rounded-lg bg-purple-bg/10 hover:bg-purple-bg/30">
                        <PersonalVideoIcon />
                    </button>
                </div>
                <div className="basis-1/4 w-full flex">
                    <button type='button' 
                        className="w-5/6 m-auto text-xs text-text-white h-10 shadow-md shadow-black/20 border-solid border border-bg-white/30 rounded-lg bg-purple-bg/10 hover:bg-purple-bg/30">
                        <FavoriteIcon />
                    </button>
                </div>
                <div className="basis-1/4 w-full flex">
                    <button type='button' 
                        className="w-5/6 m-auto text-xs text-text-white h-10 shadow-md shadow-black/20 border-solid border border-bg-white/30 rounded-lg bg-purple-bg/10 hover:bg-purple-bg/30">
                        <PlaylistAddIcon />
                    </button>
                </div>
                <div className="basis-1/4 w-full flex">
                    <button type='button' 
                        className="w-5/6 m-auto text-xs text-text-white h-10 shadow-md shadow-black/20 border-solid border border-bg-white/30 rounded-lg bg-purple-bg/10 hover:bg-purple-bg/30">
                        <ShareIcon />
                    </button>
                </div>
            </div>

            <ul className="w-full h-max my-auto block">
                {streaming === undefined || streaming.free === undefined ? 
                    <li className="w-full h-full my-1">
                        <p className="text-sm py-1 text-center text-form-purple">Free</p>
                        <span className="w-max h-max m-auto text-form-purple text-xs">(Unavilable)</span>
                    </li>
                : 
                    <li className="w-full h-full my-1">
                        <p className="text-sm py-1 text-center text-form-purple">Free</p>
                        <div className="grid grid-cols-5 gap-1">  
                            {streaming.free.map(service => {
                                return (                                           
                                    <StreamingIcon key={service.provider_id} service={service} />
                                );
                            })}
                        </div>
                    </li>
                }
                
                <Divider orientation="vertical" flexItem />

                {streaming === undefined || streaming.rent === undefined ? 
                    <li className="w-full h-full my-1">
                        <p className="text-sm py-1 text-center text-form-purple">Rent</p>
                        <span className="w-max h-max m-auto text-form-purple text-xs">(Unavilable)</span>
                    </li>
                :         
                    <li className="w-full h-full my-1">
                        <p className="text-sm py-1 text-center text-form-purple">Rent</p>
                        <div className="grid grid-cols-5 gap-1">  
                            {streaming.rent.map(service => {
                                return (                                           
                                    <StreamingIcon key={service.provider_id} service={service} />
                                );
                            })}
                        </div>
                    </li>
                }

                <Divider orientation="vertical" flexItem />
                
                {streaming === undefined || streaming.buy === undefined ? 
                    <li className="w-full h-full my-1">
                        <p className="text-sm py-1 text-center text-form-purple">Purchase</p>
                        <span className="w-max h-max m-auto text-form-purple text-xs">(Unavilable)</span>
                    </li>
                :    
                    <li className="w-full h-full my-1">
                        <p className="text-sm py-1 text-center text-form-purple">Purchase</p>
                        <div className="grid grid-cols-5 gap-1">  
                            {streaming.buy.map(service => {
                                return (                                           
                                    <StreamingIcon key={service.provider_id} service={service} />
                                );
                            })}
                        </div>
                    </li>
                }
            </ul>
        </Fragment>
    );
};

export default StreamingInfo;