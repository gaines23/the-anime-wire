import imdb from '../../assets/imdb.png';
import freshRT from '../../assets/rtFresh.png';
import rt from '../../assets/rt.png';
import meta from '../../assets/metacritic.png';

const Ratings = ({ratings}) => {
    const imgClassName = "h-6 w-6 m-auto rounded-md";
    const textClassName = "w-full text-xs font-thin my-auto px-1";
  
    return (
        <li className="inline-flex h-max w-max px-1 float-right text-center justify-center">
            {ratings.Source === 'Internet Movie Database' && (
                <div className="flex">
                    <img src={imdb} alt="imdb" className={imgClassName} title={ratings.Source} /> 
                    <p className={textClassName}>{ratings.Value}</p>
                </div>
                )
            }
            {ratings.Source === 'Metacritic' && (
                <div className="flex">
                    <img src={meta} alt="meta" className={imgClassName} title={ratings.Source} />
                    <p className={textClassName}>{ratings.Value}</p>
                </div>
                )
            }
            {ratings.Source === 'Rotten Tomatoes' && ( ratings.Value.slice(0, ratings.Value-1) >= 60 &&(
                <div className="flex">
                    <img src={freshRT} alt="fresh" className={imgClassName} title={ratings.Source} />
                    <p className={textClassName}>{ratings.Value}</p>
                </div>)
            )}
            
            {ratings.Source === 'Rotten Tomatoes' && ( ratings.Value.slice(0, ratings.Value-1) < 60 &&(
                <div className="flex">
                    <img src={rt} alt="rt" className={imgClassName} title={ratings.Source} />
                    <p className={textClassName}>{ratings.Value}</p>
                </div>)
            )}
        </li>
    );
};

export default Ratings;