import {
    get_movie_details
}  from './constants';

export async function getMovieDetails(movie_id) {
    const response = await fetch(`${get_movie_details}${movie_id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(response.status_message);
    }

    return data;
}