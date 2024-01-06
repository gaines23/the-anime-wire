let user_token = localStorage.getItem('token');

let login_url = process.env.REACT_APP_LOGIN;
let register_url = process.env.REACT_APP_REGISTER;
let logout_url = process.env.REACT_APP_LOGOUT;
let update_password = process.env.REACT_APP_UPDATE_PASSWORD;
let auto_update_password = process.env.REACT_APP_AUTO_UPDATE_PASSWORD;


let user_signups = process.env.REACT_APP_USER_SIGNUPS;

let anime_cats = process.env.REACT_APP_CATEGORIES;

export {
    login_url,
    user_token,
    register_url,
    logout_url,
    update_password,
    auto_update_password,
    user_signups,
    anime_cats,
}