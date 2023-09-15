import { ADD_TODO, CLEAR_ALL_TODO, MARK_COMPLETED } from "../actionTypes";

export const addNewTodo = (todo) => {
  return {
    type: ADD_TODO,
    payload: {
      id: new Date().getTime(),
      title: todo,
    },
  };
};

export const clearAlltodo = () => {
  return {
    type: CLEAR_ALL_TODO,
  };
};

export const markTodoCompleted = (id) => {
  return {
    type: MARK_COMPLETED,
    payload: {
      selectedTodoId: id,
    },
  };
};
