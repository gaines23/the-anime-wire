const StreamingIcon = ({service}) => {
    const imgURL = require(`../../assets/ServicesImages/${service.provider_id}.jpg`);

    return (
        <div className="h-10 w-10 p-1">
            <img 
                id={"service_img_" + service.provider_name}
                src={imgURL} 
                //src={`${TMBD_POSTER_w45}${service.logo_path}`}
                alt={service.provider_id}
                className="rounded-xl cursor-pointer"
                title={service.provider_name}
            />
        </div>
    )
}

export default StreamingIcon;