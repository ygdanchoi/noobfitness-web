import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export async function getExercises(authToken: string) {
  return axios({
    headers: { 'x-auth-token': authToken },
    method: 'GET',
    url: `${BASE_URL}/exercises`
  });
}

export async function getUser(authToken: string, userId: string) {
  return axios({
    headers: { 'x-auth-token': authToken },
    method: 'GET',
    url: `${BASE_URL}/users/${userId}`
  });
}

export async function postAccessToken(accessToken: string) {
  return axios({
    data: { access_token: accessToken },
    method: 'POST',
    url: `${BASE_URL}/auth/google`
  });
}