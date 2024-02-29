import { Fragment, useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getMovieDetails } from "../lib/movie-api";

const Movie = () => {
    const location = useLocation();
    const {sendRequest, status, data} = useHttp(getMovieDetails, true);

    const [details, setDetails] = useState([]);
    const [streaming, setStreaming] = useState([]);
    const [poster, setPoster] = useState('');
    const [poster_img, setPosterImg] = useState('');

    useEffect(() => {
        sendRequest(location.state.id);
    }, [sendRequest]);

    useEffect(() => {
        if (status === 'completed' && data) {
            setDetails(data.details);
            setStreaming(data.streaming['US']);
            setPoster(data['backdrops'][3].file_path);
            setPosterImg(data.details.poster_path);
        }
    }, [status, data, setDetails, setStreaming, setPosterImg]);

    const backgroundStyle = {
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maxWidth: '100%',  // Adjust this value as needed
        maxHeight: '100%', // Adjust this value as needed
        objectFit: 'contain', // or 'fill' if you want the image
    };
    
    return (
        <Fragment>
            <div className="bg-purple-bg/30 rounded-3xl w-5/6 mx-auto flex flex-row h-full overflow-y-auto my-3">
                <div className="basis-full h-96 background-container rounded-lg m-1 flex relative" style={backgroundStyle}>
                    <div className="w-5/6 h-56 mx-auto bg-white/10 border border-solid absolute inset-x-0 top-2/3 border-white rounded-md backdrop-blur-sm">
                        <div className="w-full h-full p-2 flex flex-row">
                            <div className="basis-1/5 h-full flex">
                                <img src={`https://image.tmdb.org/t/p/original/${poster_img}`} alt="Movie" className="w-full h-full object-center rounded-sm" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Movie;