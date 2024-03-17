import { Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getMovieDetails } from "../lib/movie-api";
import Ratings from "../Components/UI/Ratings";
import StreamingInfo from "../Components/MediaDetails/StreamingInfo";
import Trailer from "../Components/UI/Trailer";
import CastCrew from "../Components/MediaDetails/CastCrew";
import DirProducers from "../Components/MediaDetails/DirProducers";

const Movie = () => {
    const location = useLocation();
    const {sendRequest, status, data} = useHttp(getMovieDetails, true);

    const [details, setDetails] = useState([]);
    const [streaming, setStreaming] = useState([]);
    const [poster, setPoster] = useState('');
    const [poster_img, setPosterImg] = useState('');
    const [genres, setGenres] = useState([]);
    const [rating, setRating] = useState('');
    const [ratings, setRatings] = useState([]);
    const [year, setYear] = useState('');
    const [trailerId, setTrailer] = useState('');
    const [trailerTitle, setTrailerTitle] = useState('');
    const [getCast, setCast] = useState([]);
    const [getCrew, setCrew] = useState([]);

    useEffect(() => {
        sendRequest(location.state.id);
    }, [sendRequest]);

    useEffect(() => {
        if (status === 'completed' && data) {
            setDetails(data.details);
            setStreaming(data.streaming);
            setPoster(data['backdrops'][3].file_path);
            setPosterImg(data.details.poster_path);
            setGenres(data.details.genres);
            setRating(data.rating['certification']);
            setRatings(data.ratings);
            setYear(data.year);
            setTrailer(data.details.videos['results'][0].key);
            setTrailerTitle(data.details.videos['results'][0].title);
            setCast(data.details.casts['cast']);
            setCrew(data.details.casts['crew']);
        }
    }, [status, data, setDetails, setStreaming, setPosterImg, setGenres, 
        setRating, setRatings, setYear, setTrailer, setTrailerTitle, setCast, setCrew]);

    const backgroundStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '100%',
        maxHeight: '100%', 
        objectFit: 'contain',
    };

    return (
        <Fragment>
            <div className="w-full h-full block ">
                <div className="basis-full h-103 background-container rounded-lg flex relative" style={backgroundStyle}>
                    <div className="w-full h-100 m-auto">
                        <div className="w-full h-full p-1 flex flex-row bg-light-grey/10 backdrop-blur-sm border border-solid border-light-grey/30 rounded-md">
                            <div className="basis-1/5 h-full block">
                                <img src={`https://image.tmdb.org/t/p/original/${poster_img}`} alt="Movie" className="w-fit h-5/6 object-center rounded-md" />
                                    
                                <div className="w-full h-1/6 m-auto block">
                                    <div className="w-full h-max mx-auto p-1 flex flex-row">
                                        <p className="text-xs font-thin text-form-purple pr-1 w-max mx-auto">{rating} | {details.runtime} min | {year}</p>                  
                                    </div>

                                    <ul className="w-max flex h-max mx-auto flex-row">
                                        {genres.map(g =>(
                                            <p kep={g.id} className="text-xs font-thin text-form-purple p-1">{g.name}</p>
                                        ))}
                                    </ul>
                                        
                                    <div className="w-full h-max flex flex-row pt-1">
                                        <ul className="w-max mx-auto flex text-form-purple">
                                            {ratings.map(rating => {
                                                return (
                                                    <Ratings key={rating.Source} ratings={rating} />
                                                );
                                            })}   
                                        </ul> 
                                    </div>
                                </div>
                            </div>

                            <div className="basis-4/5 block flex-row h-full text-center px-3">
                                <div className="flex flex-row w-full h-1/6 text-center mb-1">
                                    <h1 className="w-5/6 h-max m-auto text-form-purple tracking-wider font-extrabold text-4xl">{details.title}</h1>
                                </div>

                                <div className="flex flex-row w-full h-5/6 my-2 px-2">
                                    <div className="block w-1/4 h-max mx-auto">
                                        <h2 className="w-max mx-auto text-form-purple font-bold">Streaming</h2>
                                        <StreamingInfo streaming={streaming}/>
                                    </div>

                                    <div className="block w-3/4 h-max m-auto pl-5">
                                        <div className="h-max my-auto">
                                            <Trailer videoId={trailerId} title={trailerTitle} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-5/6 mx-auto h-full px-2 grid grid-cols-5 gap-2 my-3">
                    <div className="w-full h-max mx-auto bg-purple-bg/20 rounded-lg px-1 col-span-2">
                        <div className="w-full h-auto m-auto py-3">
                            <DirProducers crew={getCrew}/>
                        </div>
                        
                        <CastCrew credits={getCast}/>
                    </div>
                        
                    <div className="w-full h-max gap-1 px-1 col-span-3">
                        <div className="h-full grid grid-rows-auto gap-3">
                            <div className="h-auto w-auto py-3 bg-purple-bg/20 rounded-lg">
                                <h1 className="pl-5 text-md">Summary</h1>
                                <p className="w-5/6 p-3 text-sm h-auto m-auto text-input-fill font-light text-left">
                                    {details.overview}
                                </p>
                            </div>
                                
                                {/* <div className="w-full h-auto m-auto bg-ec-purple/20 rounded-lg">
                                    <h1 className="pl-5 pt-2 text-md">Awards</h1>
                                    <div className="h-full pb-3 text-input-fill">
                                        <Awards id={details.imdb_id} />
                                    </div>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>
                {/* {(details.series !== '' || details.series !== undefined) ? (
                    <div className="mt-10">
                        <p className="w-5/6 text-lg">Series</p>
                        <div className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent">
                            <Series series={details.series.id} media={details.media} />
                        </div>
                    </div>
                ) : ""} */}
                        
        </Fragment>
    )
}

export default Movie;