import { Fragment } from "react";
import CrewCard from "../UI/Card/CrewCard";

const DirProducers = ({crew}) => {
    const directors = crew.filter(function (x) {
        return x.job === 'Director';
    });

    const producers = crew.filter(function (x) {
        return x.job === 'Producer';
    });

    return (
        
      <Fragment>
        <div className="w-full h-full grid grid-cols-2">
            <div className="w-full h-auto mx-auto">
                <h1 className="w-full pl-5 text-center text-md">Director(s)</h1>
                <div className="w-full h-auto grid grid-cols-2 mt-2 pl-3 m-auto">
                    {directors.map((item, id) => {
                        return (
                           <CrewCard key={id} item={item} />
                        );
                    }).slice(0,4)}
                </div>
            </div>
            <div className="w-full h-auto mx-auto">
                <h1 className="w-full pl-5 text-center text-md">Producer(s)</h1>
                <div className="grid grid-cols-2 pt-2 m-auto text-xs text-center text-input-fill px-3">
                    {producers.map((item, id) => (
                        <p key={id} className="mb-2">{item.name}</p>
                    )).slice(0,10)}
                </div>
            </div>
        </div>
      </Fragment>
    );
};

export default DirProducers;