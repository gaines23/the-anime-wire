import {
    user_token,
    register_url,
    logout_url,
    update_password,
    auto_update_password,
    user_signups,
    anime_cats,
    
} from './constants';

// Send email verification before setting new password //
export async function getUpdatePassword({user, newPassword, old}) {
    const response = await fetch(`${update_password}`, {
        method: 'PUT',
        body: JSON.stringify({ user, old, newPassword }), // Pass the old and new values in the request body
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user_token}`
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message);
    }

    return null;
}

export async function getAutoUpdatePassword({ old_password, new_password }) {
    const response = await fetch(`${auto_update_password}`, {
        method: 'PUT',
        body: JSON.stringify({old_password, new_password}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user_token}`
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message);
    }

    return null;
}


export async function getLogoutUrl() {
    const response = await fetch(`${logout_url}`, {
        method: 'POST',
        body: JSON.stringify(user_token),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Login Credentials Rejected');
    }

    return null;
}


export async function addUserRegistration(info) {
    const response = await fetch(register_url, {
        method: 'POST',
        body: JSON.stringify(info),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Login Credentials Rejected');
    }

    return data;
} 


export async function postUserSignups(email) {
    const response = await fetch(user_signups, {
        method: 'POST',
        body: JSON.stringify(email),
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message);
    }

    return null;
}



// HOME PAGE //
export async function getAnimeCats() {
    const response = await fetch(anime_cats, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user_token}`
        }
    });

    const soap = await response.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    return soap;
}