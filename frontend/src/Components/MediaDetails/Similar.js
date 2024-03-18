import { Fragment, useState } from "react";
import PosterCard from "../UI/Card/PosterCard";

const Similar = ({similar}) => {
    const [showDetails, setShowDetails] = useState(false);
    const [cardInfo, setCardInfo] = useState([]);

// Have to add useRef for current card location

    const handleClick = async (e, id, media) => {
        e.preventDefault();

        const info = {id, media};
        setShowDetails(true);
        setCardInfo(info);
    }
    
    return (
        <Fragment>
            <div className="mt-10">
                    <p className="w-5/6 text-lg">Similar</p>
                <div
                    className="h-full flex items-center px-5 py-1 overflow-x-auto space-x-3 scroll-smooth scrollbar scrollbar-width:thin scrollbar-thumb-ec-orange scrollbar-track-transparent"
                >
                    {similar.map(item => {
                        return (
                            <div onClick={(e) => handleClick(e, item.id, item.media_type)} key={item.id}>
                                <PosterCard key={item.id} item={item} />
                            </div>
                        );
                    })}
                </div>
                {/* {(showDetails && cardInfo.media === 'tv') && (
                    <TvCardDropdown key={cardInfo.id} setShowDetails={setShowDetails} id={cardInfo.id} />
                )}
                {(showDetails && cardInfo.media === 'movie') && (
                    <MovieCardDropdown key={cardInfo.id} setShowDetails={setShowDetails} id={cardInfo.id} />
                )} */}
            </div>
        </Fragment>
    );
};

export default Similar;