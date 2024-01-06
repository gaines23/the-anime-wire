import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControlLabel, MenuItem, Stack, Typography } from "@mui/material";
import { getAnimeCats, getGenresList, getStreamingList, postNewUserRegs } from "../../lib/aw-api";
import CloseIcon from '@mui/icons-material/Close';

const UserOptions = ({handleClose}) => {
    const [getCats, setCats] = useState([]);
    const [getGenres, setGenres] = useState([]);
    const [getStreaming, setStreaming] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [expandedIds, setExpandedIds] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    useEffect(() => {
        let isMounted = true;
      
        const fetchData = async () => {
          try {
            const cats = await getAnimeCats();
            const genres = await getGenresList();
            const streaming = await getStreamingList();
      
            // Check if the component is still mounted before updating state
            if (isMounted) {
              setCats(cats);
              setGenres(genres);
              setStreaming(streaming);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        // Call the fetchData function
        fetchData();
      
        // Cleanup function to set isMounted to false when component unmounts
        return () => {
          isMounted = false;
        };
    }, []);

    const toggleExpand = (id) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter((itemId) => itemId !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };

    const handleCategoryClick = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories((prevCategories) => prevCategories.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
        }
    };
    
    const handleGenreClick = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres((prevGenres) => prevGenres.filter((id) => id !== genreId));
        } else {
            setSelectedGenres((prevGenres) => [...prevGenres, genreId]);
        }
    };
    
    const handleServiceClick = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices((prevServices) => prevServices.filter((id) => id !== serviceId));
        } else {
            setSelectedServices((prevServices) => [...prevServices, serviceId]);
        }
    };
    
    const handleSave = async (e) => {
        e.preventDefault();

        const info = {
            'anime_categories': selectedCategories || [],
            'streaming_services': selectedServices || [],
            'anime_genres': selectedGenres || []
        }

        try {
            //await postNewUserRegs({info});
            localStorage.removeItem('new_auth');
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    // console.log(selectedCategories)
    // console.log(selectedGenres)
    // console.log(selectedServices)

    return (
        <Fragment>
            <Box className="w-2/3 h-5/6 inline-grid border p-1 border-solid border-1 border-bg-fill/50 fixed overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl bg-form-purple text-text-white rounded-lg">
                <div className="w-full h-full m-auto px-1 flex">
                    <div className="w-full h-max m-auto flex mt-3 mb-5 p-1 text-center">
                        <h2 className="text-xl font-bold w-max px-1 mx-auto">
                            For the best experience, tell us about yourself 
                        </h2>
                    </div>
                    <div className="w-max h-max my-auto ml-auto flex mt-1 mb-5 p-1">
                        <CloseIcon 
                            className="w-6 h-6 float-right cursor-pointer m-auto hover:bg-bg-white hover:text-text-purple rounded-2xl"
                            onClick={handleClose} 
                        />
                    </div>
                </div>

                <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                
                <form className="p-2 rounded-md" onSubmit={handleSave}>
                    <div className="w-full h-auto flex">
                        <div className="w-full h-max grid grid-cols-1 grid-rows-auto pb-3">
                            
                            <div className="w-full h-max grid gap-2 row-span-1 px-2">
                                <h3 className="w-full text-lg font-medium py-2">
                                    What anime categories do you watch/follow?
                                </h3>

                                <div className="grid grid-cols-3 grid-rows-auto gap-4">
                                    {getCats.map((item) => (
                                        <div key={item.id} className="col-span-1 row-span-1">
                                           <Card
                                                className="w-full h-full"
                                                sx={{
                                                    backdropFilter: 'blur(8px)',
                                                    backgroundColor: selectedCategories.includes(item.id)
                                                        ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
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
                                                    <div className="w-full h-max flex">
                                                        <div className="h-full w-max my-auto mr-auto px-2 flex">
                                                            <span className="text-xl font-bold">{item.category}</span>
                                                        </div>
                                                        <div className="ml-auto">
                                                            <Checkbox 
                                                            sx={{
                                                                color: '#5FDCE1',
                                                                '&.Mui-checked': {
                                                                    color: '#5FDCE1',
                                                                },
                                                            }}
                                                            size="large"
                                                            onClick={() => handleCategoryClick(item.id)}
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <Divider variant="middle" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

                                                    <div className="flex space-x-1 relative my-3">
                                                        {item.examples.split(',').map((id) => id.trim()).map((id) => (
                                                            <img
                                                                key={id}
                                                                src={require(`./images/${id}.jpg`)}
                                                                alt={`${id}`}
                                                                style={{ width: '32%', height: 'auto', borderRadius: '8px', position: 'relative', zIndex: 1 }}
                                                                className="rounded-md shadow-md transition-shadow shadow-bg-white/30"
                                                            />
                                                        ))}
                                                    </div>

                                                    {expandedIds.includes(item.id) ? (
                                                        <>
                                                            <Typography className="text-center p-1 text-sm">{item.description}
                                                                <span onClick={() => toggleExpand(item.id)} className="text-light-grey text-center cursor-pointer">
                                                                    {' '}
                                                                </span>
                                                            </Typography>
                                                            <Typography className="text-center p-1 text-sm">
                                                                <span onClick={() => toggleExpand(item.id)} className="text-light-grey text-center cursor-pointer">
                                                                    Hide
                                                                </span>
                                                            </Typography>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography className="text-center p-1 text-sm">
                                                                <span onClick={() => toggleExpand(item.id)} className="text-light-grey cursor-pointer">
                                                                    {' '}
                                                                    Learn More
                                                                </span>
                                                            </Typography>
                                                        </>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-max flex-root gap-2 row-span-1 my-5 px-2">
                                <h3 className="w-full text-lg font-medium  text-input-fill py-2">
                                    What anime genres do you enjoy the most?
                                </h3>

                                <div className="flex flex-wrap h-full w-full mx-auto py-2 px-3 rounded-md bg-bg-fill/10">
                                    {getGenres.map((g) => (
                                        <div key={g.id} className="w-max h-max flex">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        sx={{
                                                            color: '#5FDCE1',
                                                            '&.Mui-checked': {
                                                                color: '#5FDCE1',
                                                            },
                                                            fontSize: '12px',
                                                        }}
                                                        checked={selectedGenres.includes(g.id)}
                                                        onChange={() => handleGenreClick(g.id)}
                                                    />
                                                }
                                                label={g.genre}
                                                value={g.id}
                                                labelPlacement="end"
                                                size="small"
                                                className="w-full"
                                                sx={{
                                                    whiteSpace: 'normal',
                                                    overflow: 'hidden',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full h-max grid grid-rows-1 gap-2 row-span-1 px-2">
                                <h3 className="w-full text-lg font-medium text-input-fill py-2">
                                    Lastly, what streaming services do you use to watch anime?
                                </h3>

                                <div className="rounded-md bg-bg-fill/10 p-3">
                                    <div className="grid grid-cols-7 grid-rows-auto h-full w-5/6 gap-3 mx-auto">
                                    {getStreaming.map((service) => (
                                        <div key={service.id} sx={{ paddingX: '1px' }}>
                                            <div
                                                key={service.id}
                                                title={service.streaming_name}
                                                onClick={() => handleServiceClick(service.id)}
                                                className="p-1"
                                            >
                                                <img
                                                    id={"service_img_" + service.streaming_name}
                                                    src={require(`../../${service.logo_url}`)}
                                                    alt={service.id}
                                                    className={`w-10 h-10 mx-auto rounded-lg outline-none hover:scale-125 ease-in-out duration-500 ${
                                                        selectedServices.includes(service.id)
                                                            ? 'outline-2 outline-aw-teal shadow-sm shadow-aw-teal scale-125'
                                                            : 'outline-none opacity-60 foucs:outline-none hover:outline hover:outline-1 hover:outline-input-fill hover:opacity-100'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full h-12 flex px-2">
                        <div className="w-max h-max ml-auto">
                            <button 
                                type="submit" 
                                onClick={handleSave}
                                className="text-text-white font-light p-2 capitalize w-20 h-10 bg-aw-teal/90 rounded-md hover:bg-aw-teal"
                            >
                               Save
                            </button>
                        </div>
                    </div>
                    
                </form>
            </Box>
        </Fragment>
    );
};

export default UserOptions;