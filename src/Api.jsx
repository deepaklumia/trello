import axios from "axios";
const key = '52af232059e7ee61a08e8f00267de1f7';
const token = '62775fdf3a76de291dbe507c071304f3ff6ffac5b4319d555b2d0f33b35d533a';

export const getAllBoards =  () => {
  return axios.get(`https://api.trello.com/1/members/me/boards?key=${key}&token=${token}`)
    .then(res => res.data);
}
export  const createBoards = (name) => {
  console.log(name);
  return axios.post(`https://api.trello.com/1/boards/?name=${name}&key=${key}&token=${token}`)
    .then(res => res.data);
}

export const getList = (id) => {
  return axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`)
    .then(res => res.data);
}

export const createList = (id, name) => {
  return axios.post(`https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=${key}&token=${token}`)
    .then(res => res.data);
}

export const getCard = (listId) => {
  return axios.get(`https://api.trello.com/1/lists/${listId}/cards?key=${key}&token=${token}`)
    .then(res => res.data);
}


export const createCard = (id, name) => {
  return axios.post(`https://api.trello.com/1/cards?idList=${id}&name=${name}&key=${key}&token=${token}`)
    .then(res => res.data);
}

export const deleteCard = (cardId) => {
  return axios.delete(`https://api.trello.com/1/cards/${cardId}?key=${key}&token=${token}`)
    .then(res => res.data);
}

export const deleteList = (id, value) => {
  return axios.put(`https://api.trello.com/1/lists/${id}/closed?value=${value}&key=${key}&token=${token}`)
    .then(res => res.data);
}

export const getChecklist = (cardId) => {
  return axios.get(`https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`)
    .then(res => res.data);
}
export const createCheckList = (cardId, name) => {
  return axios.post(`https://api.trello.com/1/checklists?name=${name}&idCard=${cardId}&key=${key}&token=${token}`)
    .then(res => res.data);
}
export const deleteCheckList = (checkListId) => {
  return axios.delete(`https://api.trello.com/1/checklists/${checkListId}?key=${key}&token=${token}`)
    .then(res => res.data);
}
export const getCheckItems = (checkListId) => {
  return axios
    .get(`https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${key}&token=${token}`)
    .then(res => res.data)
}

export const createCheckItems = (checkListId, name) => {
  return axios
    .post(`https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${name}&key=${key}&token=${token}`)
    .then(res => res.data)
}

export const deleteCheckItems = (checkListId, checkItemId) => {
  return axios
    .delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${key}&token=${token}`)
    .then(res => res.data)
}

export const strikeCheckItems = (cardId, checkItemId, value) => {
  return axios
    .put(`https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?state=${value}&key=${key}&token=${token}`)
    .then(res => res.data)
}
// export default [getAllBoards, createBoards];