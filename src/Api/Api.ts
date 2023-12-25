import { putAccessTokenProps, fetchWithTokenProps, loginProps, registerProps, addNoteProps, getNoteProps, getArchivedNotesProps, deleteNoteProps, unArchiveNoteProps } from "./ApiType";
import PropTypes from "prop-types";
const BASE_URL = import.meta.env.VITE_BASE_API_URL;

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken : putAccessTokenProps) {
  return localStorage.setItem('accessToken', accessToken );
}
putAccessToken.propTypes = {
  accessToken: PropTypes.string.isRequired,
}
async function fetchWithToken({ url, options = {} }: fetchWithTokenProps) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

fetchWithToken.propTypes = {
  url: PropTypes.string.isRequired,
  options: PropTypes.object,
}

async function login({ email, password } : loginProps) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

async function register({ name, email, password } : registerProps) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    alert(responseJson.message);
    return { error: true };
  }

  return { error: false };
}

register.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

async function getUserLogged() {
  const response = await fetchWithToken({ url: `${BASE_URL}/users/me` });
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function addNote({ title, body } : addNoteProps) {
  const response = await fetchWithToken({url : `${BASE_URL}/notes`, options : {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, body }),
  }});

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

addNote.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
}

async function getActiveNotes() {
  const response = await fetchWithToken({url : `${BASE_URL}/notes`});
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getArchivedNotes() {
  const response = await fetchWithToken({ url : `${BASE_URL}/notes/archived`});
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function getNote({ id } : getNoteProps) {
  const response = await fetchWithToken({url : `${BASE_URL}/notes/${id}`});
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

getNote.propTypes = {
  id: PropTypes.string.isRequired,
}

async function archiveNote({id}: getArchivedNotesProps) {
  const response = await fetchWithToken({url : `${BASE_URL}/notes/${id}/archive`, options:  {
    method: 'POST',
  }});

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

archiveNote.propTypes = {
  id: PropTypes.string.isRequired,
}

async function unarchiveNote({id}: unArchiveNoteProps) {
  const response = await fetchWithToken({url : `${BASE_URL}/notes/${id}/unarchive`, options : {
    method: 'POST',
  }});

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

unarchiveNote.propTypes = {
  id: PropTypes.string.isRequired,
}

async function deleteNote({id} : deleteNoteProps) {
  const response = await fetchWithToken({url : `${BASE_URL}/notes/${id}`, options:  {
    method: 'DELETE',
  }});

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

deleteNote.propTypes = {
  id: PropTypes.string.isRequired,
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};