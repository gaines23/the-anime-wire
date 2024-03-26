import { Fragment, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/UI/LoadingSpinner";
import { Box, Grid, ListItem } from "@mui/material";
import { TMBD_POSTER_w500 } from "../lib/constants";

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [getResults, setResults] = useState([]);
    const [getSearch, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const searchResults = location.state || [];

    useEffect(() => {
        if (searchResults === '') {
            setLoading(true);
        }
    }, [searchResults, setLoading]);

    useEffect(() => {
        if (searchResults !== '') {
            // setResults(location.state?.results);
            const search = location.state?.results;
            const filteredResults = search.results.map(([title, titleGenres]) => {
                // Check if titleGenres is null
                if (!titleGenres) return null;
            
                const genres = titleGenres.genres.map(genre => genre.genre.text);
                return genres.includes('Animation') ? title : null;
            }).filter(Boolean)

            setResults(filteredResults);

            setResults(filteredResults);
            setSearch(location.state?.searchTerm);
            setLoading(false);
        }
    }, [searchResults, setResults, setLoading, setSearch]);

    const handleMovie = async ({id, title}) => {
        const title_string = encodeURIComponent(title);
        navigate(`/movie/details/title/${id}/${title_string}`, {state: {id: id}});

        console.log(id)
    }

    const handleTv = async (id) => {
    
    }

    return (
        <Fragment>
            <Box className="w-2/3 mx-auto h-full py-3 flex-1">
                {getResults !== undefined ?
                    <h1 className="text-lg text-input-fill text-bold capitalize">Search Results: {`"${getSearch}"`} </h1>
                 :  <h1 className="text-lg text-input-fill text-bold">Search Results: </h1>
                }
            
                <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }} className="h-auto py-5 w-full mx-auto overflow-hidden overflow-y-auto">
                    {getResults === undefined || getResults === '' ? 
                        <>{loading && <LoadingSpinner />}</>
                    : 
                        <>
                            {getResults.map((item, index) => (
                                <Grid item xs={2} sm={3} md={3} lg={3} xl={3} key={index} className="w-full h-24 p-1">
                                    <ul 
                                        className="h-full w-full flex bg-bg-fill/10 hover:bg-bg-fill/20 hover:border rounded-md text-text-white/60 hover:border-aw-teal-border/30 cursor-pointer"
                                        onClick={() => item.titleType.text === 'series' ? handleTv(item.id) : handleMovie({'id': item.id, 'title': item.titleText.text})}
                                    >
                                        <div className="w-24 h-20 my-auto mr-auto float-left flex">
                                            { item.image !== "N/A" ? ( 
                                                <img
                                                    src={item.primaryImage.url}
                                                    alt="N/A"
                                                    className="w-full px-1 h-full rounded-md object-cover m-auto"
                                                />
                                                ) : 
                                                <div>
                                                    <p className="w-5/6 h-auto m-auto">No Image</p>
                                                </div>
                                            }
                                        </div>

                                        <div className="w-2/3 h-20 m-auto float-right px-1 inline-grid">
                                            <div className="text-text-white text-xs h-2/3 w-full flex">
                                                <p className="text-text-white text-sm h-max text-wrap text-left">{item.titleText.text}</p>
                                            </div>

                                            <div className="text-text-white text-xs h-max mt-auto w-full flex p-1">
                                                <p className="text-text-white text-xs h-max w-max mr-auto">{item.titleType.text}</p>
                                                <p className="text-text-white text-xs h-max w-max ml-auto">{item.releaseYear.year && item.releaseYear.year}</p>
                                            </div>
                                        </div>
                                    </ul>
                                </Grid>
                            ))}
                        </>
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default Search;