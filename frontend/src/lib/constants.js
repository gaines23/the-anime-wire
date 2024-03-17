// TMBD API
const TMBD_POSTER_w500 = 'https://image.tmdb.org/t/p/w500';
const TMBD_POSTER_w780 = 'https://image.tmdb.org/t/p/w780';
const TMBD_POSTER_w45 = 'https://image.tmdb.org/t/p/w45';

let user_token = localStorage.getItem('token');

let login_url = process.env.REACT_APP_LOGIN;
let register_url = process.env.REACT_APP_REGISTER;
let logout_url = process.env.REACT_APP_LOGOUT;
let update_password = process.env.REACT_APP_UPDATE_PASSWORD;
let auto_update_password = process.env.REACT_APP_AUTO_UPDATE_PASSWORD;


let user_signups = process.env.REACT_APP_USER_SIGNUPS;

let anime_cats = process.env.REACT_APP_CATEGORIES;
let anime_genres = process.env.REACT_APP_GENRES;
let streaming_services = process.env.REACT_APP_STREAMING_SERVICES;

let new_user_registered = process.env.REACT_APP_REGISTERED_USER_FORM;

let get_moveis_tv = process.env.REACT_APP_SEARCH_MOVIES_TV;

let get_movie_details = process.env.REACT_APP_GET_MOVIE;

export {
    login_url,
    user_token,
    register_url,
    logout_url,
    update_password,
    auto_update_password,
    user_signups,
    anime_cats,
    anime_genres,
    streaming_services,
    new_user_registered,
    get_moveis_tv,
    get_movie_details,
    TMBD_POSTER_w500,
    TMBD_POSTER_w780,
    TMBD_POSTER_w45
}