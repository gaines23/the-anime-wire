import { Fragment, useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { getStreamingList } from "../../../lib/aw-api";
import useHttp from "../../../hooks/use-http";

const StreamingServiceButton = () => {
    const { sendRequest, status, data } = useHttp(getStreamingList, true);
    const [getServices, setServices] = useState([]);

    // const handleClick = (id) => {
    //     if (!getServices.includes(id)) {
    //         getServices.push(parseInt(id));
    //     } else {
    //         const x = getServices.indexOf(id);
    //         getServices.splice(x, 1);
    //         setServices(getServices => [...getServices]);
    //     }

    //     setServices(getServices => [...getServices]);
    // };

    // useEffect(() => {
    //     const x = getServices.map(y => parseInt(y));
    //     setServiceList(x);
    // }, [getServices]);

    return (
        <Fragment>                               
            {/* {loadedServices.map((service) => {
                return (
                    <li className="inline-flex h-10 w-12 my-1 mx-auto space-x-0.5 " key={service.id}>
                        <button 
                            onClick={() => handleClick(service.id)}
                                key={service.id}
                                className= "w-10 h-10 mx-auto rounded-xl outline-none hover:scale-125 ease-in-out duration-700"
                            >
                            <img
                                id={"service_img_" + service.streaming_name} 
                                //src={TMBD_POSTER_w45 + service.logo_path}
                                src={'/ServicesImages/' + service.id + '.jpg'} 
                                alt={service.id}
                                className={getServices.includes(service.id) ? 
                                    "transition w-10 h-10 mx-auto rounded-xl outline outline-2 outline-ec-purple-text shadow-sm shadow-ec-purple-text" : 
                                    "transition w-10 h-10 mx-auto rounded-xl outline-none opacity-60 foucs:outline-none hover:outline hover:outline-1 hover:outline-input-fill hover:opacity-100"
                                }
                                title={service.streaming_name}
                            />
                        </button>
                    </li>
                )
            })} */}
        </Fragment>
    );
}

export default StreamingServiceButton;