import { Fragment, useState } from "react";
import CastCard from "../UI/Card/CastCard";

const CastCrew = ({credits}) => {
    const [showModal, setShowModal] = useState(false);    

    return (
        <Fragment>
            <div className="w-full h-full rounded-lg px-2 py-3">
                <div className="w-full h-full mt-2 px-5">
                    <h1 className="w-2/3 float-left text-md ">Cast & Crew</h1>
                    <button onClick={() => setShowModal(true)} className="text-small float-right text-sm hover:text-input-fill/60">
                        See All
                    </button>
                    {/* {showModal && <CastCrewModal setShowModal={setShowModal} cast={credits.cast} crew={credits.crew} /> } */}
                </div>
                <div className="w-full h-auto grid grid-cols-2 gap-2 py-5">
                    {credits.map((item) => {
                        return (
                                <CastCard key={item.id} item={item} />
                            );
                        }).slice(0, 10)
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default CastCrew;