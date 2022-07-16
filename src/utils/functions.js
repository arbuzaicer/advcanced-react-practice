import { STORAGE_KEY } from "./constants";

export function getLocalTodos() {
  return new Promise((res) => {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    res(todos);
  });
}

export function setLocalTodos(array) {
  return new Promise((res) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array));

    res();
  });
}
