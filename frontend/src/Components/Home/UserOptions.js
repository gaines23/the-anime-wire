import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { getAnimeCats } from "../../lib/aw-api";
import useHttp from "../../hooks/use-http";
import CloseIcon from '@mui/icons-material/Close';
import { CheckBox } from "@mui/icons-material";

const UserOptions = ({handleClose}) => {
    const [getCats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedIds, setExpandedIds] = useState([]);

    const { sendRequest, status, error, data } = useHttp(getAnimeCats, true);
   
    useEffect(() => {
        if (localStorage.getItem('new_auth')) {
            sendRequest();
        }
    }, [sendRequest]);

    useEffect(() => {
        if (data) {
            setCats(data);
            
        }
    }, [setCats, data]);

    const toggleExpand = (id) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };


    // const submitProfile = (e) => {
    //     e.preventDefault();
    //     const services = getServices.map(y => parseInt(y));
    //     setIsLoading(true);

    //     sendRequest({ 
    //         streaming_services: services
    //     });

    //     localStorage.removeItem('newFollower');
    // };

    return (
        <Fragment>
            <Box className="w-2/3 h-5/6 inline-grid border p-1 border-solid border-2 border-aw-teal fixed overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-form-purple text-text-white rounded-lg">
                <div className="w-full h-full m-auto px-1">
                    <div className="w-max h-max my-auto float-left flex mt-3 mb-5 p-1">
                        <h2 className="text-xl font-extrabold w-max px-1">
                            For the best experience, tell us about yourself 
                        </h2>
                    </div>
                    <div className="w-max h-max my-auto float-right flex mt-1 mb-5 p-1">
                        <CloseIcon 
                            className="w-6 h-6 float-right cursor-pointer m-auto hover:bg-bg-white hover:text-text-purple rounded-2xl"
                            onClick={handleClose} 
                        />
                    </div>
                </div>
                
                <form className="p-2 rounded-md">
                    <div className="w-full h-auto flex">
                        <div className="w-full h-max grid grid-cols-1 grid-rows-auto pb-3">
                            
                            <div className="w-full h-max grid grid-rows-1 gap-2 row-span-3">
                                <h3 className="w-full text-lg font-semibold">
                                    What anime categories do you watch/follow?
                                </h3>

                                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                                    {getCats.map((item) => (
                                        <div key={item.id} className="col-span-1 row-span-1">
                                            <Card 
                                                className="w-full h-full" 
                                                sx={{
                                                    backdropFilter: 'blur(8px)',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                                    overflow: 'hidden',
                                                    transition: 'background-color 0.3s ease',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    },
                                                    color: '#F7F8FD',
                                                }}
                                            >
                                                <CardContent sx={{padding: '4px'}}>
                                                    <div className="w-full h-max inline-block border-b border-b-white">
                                                        <div className="w-max float-left">
                                                            <Typography className="text-lg text-bold w-max" gutterBottom>{item.category}</Typography>
                                                        </div>
                                                        <div className="float-right w-max">
                                                            <CheckBox />
                                                        </div>
                                                    </div>

                                                    <div 
                                                        style={{ 
                                                            display: 'flex', 
                                                            justifyContent: 'space-between', 
                                                            position: 'relative',
                                                            marginBottom: '6px'
                                                        }}
                                                    >
                                                        {item.examples.split(',').map((id) => id.trim()).map((id) => (
                                                            <img
                                                            key={id}
                                                            src={require(`./images/${id}.jpg`)}
                                                            alt={`${id}`}
                                                            style={{ width: '32%', height: 'auto', borderRadius: '8px', position: 'relative', zIndex: 1 }}
                                                            className="rounded-md shadow-md transition-shadow shadow-aw-teal/50"
                                                            />
                                                        ))}
                                                    </div>

                                                    {expandedIds.includes(item.id) ? (
                                                        <>
                                                            <Typography className="text-left p-1 text-sm">{item.description}</Typography>
                                                            <span onClick={() => toggleExpand(item.id)} className="text-light-grey cursor-pointer">
                                                                {' '}
                                                                Hide
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography className="text-left p-1 text-sm">
                                                                {item.description.split(' ').slice(0, 20).join(' ')}
                                                                {item.description.split(' ').length > 20 && (
                                                                <span onClick={() => toggleExpand(item.id)} className="text-light-grey cursor-pointer">
                                                                    {' '}
                                                                    ...more
                                                                </span>
                                                                )}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-max grid grid-rows-1 gap-2 row-span-3">
                                <h3 className="w-full text-lg font-semibold text-input-fill">
                                    What anime genres do you enjoy the most?
                                </h3>
                            </div>

                            <div className="w-full h-max grid grid-rows-1 gap-2 row-span-3">
                                <h3 className="w-full text-lg font-semibold text-input-fill">
                                    Lastly, what streaming services do you use to watch anime?
                                </h3>
                            </div>
                        </div>
                    </div>
                </form>
            </Box>
        </Fragment>
    );
};

export default UserOptions;