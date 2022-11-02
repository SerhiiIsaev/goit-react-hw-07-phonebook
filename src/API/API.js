import axios from 'axios';

const BASE_URL = 'https://6362ac6237f2167d6f6a8216.mockapi.io/contacts/contacts';



export async function getData() {
    const data = await axios.get(`${BASE_URL}`)
    return data.data;
}

export async function addData(newContact) {
  const data = await axios.post(BASE_URL, newContact);
  return data.data;
}

export async function removeData(id) {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
}