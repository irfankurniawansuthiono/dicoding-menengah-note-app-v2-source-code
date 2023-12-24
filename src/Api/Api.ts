import { putAccessTokenProps, fetchWithTokenProps, loginProps, registerProps, addNoteProps, getNoteProps, getArchivedNotesProps, deleteNoteProps, unArchiveNoteProps } from "./ApiType";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken : putAccessTokenProps) {
  return localStorage.setItem('accessToken', accessToken );
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