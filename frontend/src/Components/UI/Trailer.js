import React from 'react';

const Trailer = ({ videoId, title }) => {
    return (
        <iframe
            className="w-full rounded-md my-auto ml-auto"
            height="350"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
            title={title}
        >
        </iframe>
    );
};

export default Trailer;