import { ADD_TODO, CLEAR_ALL_TODO, MARK_COMPLETED } from "../actionTypes";

const initialState = {
  todos: [
    // {
    //   id: new Date().getTime(),
    //   title: "TodoList 1",
    //   isCompleted: false,
    // },
    // {
    //   id: new Date().getTime() + 1,
    //   title: "TodoList 2",
    //   isCompleted: false,
    // },
    // {
    //   id: new Date().getTime() + 2,
    //   title: "TodoList 3",
    //   isCompleted: false,
    // },
  ],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const { id, title } = action.payload;
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: id,
            title: title,
            isCompleted: false,
          },
        ],
      };

    case MARK_COMPLETED:
      const { selectedTodoId } = action.payload;
      let updatedTodos = state.todos.map((item) => {
        if (item.id === selectedTodoId) {
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        } else {
          return {
            ...item,
          };
        }
      });
      return {
        ...state,
        todos: [...updatedTodos],
      };

    case CLEAR_ALL_TODO:
      return {
        ...state,
        todos: [],
      };

    default:
      return state;
  }
};
export default todoReducer;
