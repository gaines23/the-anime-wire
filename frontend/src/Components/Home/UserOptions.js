import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const UserOptions = () => {
    // const { sendRequest, status, error } = useHttp(postEcProfile, true);

    // const [getServices, setServiceList] = useState([]);
    
    // useEffect(() => {
    //     if(status === 'completed' && !error) {
    //         setIsOpen(false);
    //         localStorage.getItem('newFollower', false);
    //     };
    // }, [status, error, setIsOpen]);

    const [isLoading, setIsLoading] = useState(false);

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
            <div id="modalWrapper" className="text-input-fill flex h-5/6 sm:w-96 md:w-[32rem] mx-auto z-50 justify-center items-center overflow-hidden outline-none focus:outline-none">
                <div className="relative h-5/6 w-4/5 m-auto border-0 rounded-lg shadow-lg bg-gradient-to-br from-ec-purple to-ec-orange rounded-lg bg-white outline-none focus:outline-none">
                    <div className="h-1/6 flex items-start justify-center text-left px-5 py-2 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="w-full text-xl font-semibold text-input-fill">
                            Select your streaming services for the best experience
                        </h3>
                    </div>

                    <div className="h-2/3 w-full grid p-5 overflow-x-hidden">
                        {isLoading && <LoadingSpinner />}
                        <ul className="w-11/12 h-full mx-auto grid-flow-colitems-center justify-center auto-cols-max grid-rows-auto my-4">
                            {/* <StreamingServiceButton setServiceList={setServiceList} /> */}
                        </ul>
                    </div>

                    <div className="h-1/6 flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        {/* <button
                            className="w-28 h-7 text-input-fill background-transparent font-bold lowercase text-sm outline-none focus:outline-none hover:bg-input-fill/10 rounded-lg mr-1 mb-1"
                            type="button"
                           // onClick={() => setIsOpen(false)}
                        >
                            {newFollower ? 'Skip' : 'Close'}
                        </button> */}
                        <button
                            className='w-28 text-xs h-7 shadow-sm shadow-black/20 font-bold border-solid uppercase border border-input-fill/30 rounded-lg bg-input-fill/30 hover:bg-input-fill/10'
                            type="submit"
                           // onClick={submitProfile}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>

            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

        </Fragment>
    );
};

export default UserOptions;