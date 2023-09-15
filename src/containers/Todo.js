import React, { useEffect, useMemo, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import TodoFooter from "../components/Todo/TodoFooter";
import TodoHeader from "../components/Todo/TodoHeader";
import TodoList from "../components/Todo/TodoList";
import { useTodos } from "../hooks/selectorHooks";
import { addNewTodo, markTodoCompleted } from "../redux/actions";
import {
  ALL,
  COMPLETED,
  ACTIVE,
  ADD_ERROR_MESSAGE,
  SEARCH_ERROR_MESSAGE,
} from "../utils/constants";

const initialState = {
  todoValue: "",
  todoError: "",
  isAdd: true,
  filter: ALL,
};
const TodoReducer = (state, action) => {
  switch (action.type) {
    case "todoValue":
      return { ...state, todoValue: action.payload };
    case "todoError":
      return { ...state, todoError: action.payload };
    case "isAdd":
      return { ...state, isAdd: action.payload };
    case "filter":
      return { ...state, filter: action.payload };
    case "custom":
      return { ...state, ...action.payload };
    case "reset": {
      return { initialState };
    }
    default:
      return state;
  }
};
const Todo = () => {
  const [todoState, todoDispatch] = useReducer(TodoReducer, initialState);
  const { todoValue, todoError, isAdd, filter } = todoState;
  const dispatch = useDispatch();
  const { todos = [] } = useTodos();
  const [filterTodo, setFilterTodo] = useState(todos);

  useEffect(() => {
    setFilterTodo(todos);
  }, [todos]);

  useEffect(() => {
    if (filter === ALL) {
      setFilterTodo(todos.filter((item) => item.title.includes(todoValue)));
    }
    if (filter === COMPLETED) {
      setFilterTodo(
        todos.filter(
          (item) => item.isCompleted === true && item.title.includes(todoValue)
        )
      );
    }
    if (filter === ACTIVE) {
      setFilterTodo(
        todos.filter(
          (item) => item.isCompleted !== true && item.title.includes(todoValue)
        )
      );
    }
  }, [filter]);

  const todoChangeHandler = (e) => {
    const { value } = e.target;
    todoDispatch({
      type: "custom",
      payload: {
        ...todoState,
        todoValue: value,
        todoError: "",
      },
    });
  };

  const filterClickHandler = (filter) => {
    todoDispatch({ type: "filter", payload: filter });
  };

  const actionClickHandler = (action) => {
    if (action === "isAdd") {
      todoDispatch({ type: "isAdd", payload: true });
      if (todoValue === "" || null || undefined) {
        todoDispatch({
          type: "todoError",
          payload: ADD_ERROR_MESSAGE,
        });
        setFilterTodo(todos);
        return;
      }
      dispatch(addNewTodo(todoValue));
      todoDispatch({ type: "todoValue", payload: "" });
      return;
    } else {
      todoDispatch({ type: "isAdd", payload: false });
      if (todoValue === "" || null || undefined) {
        todoDispatch({
          type: "todoError",
          payload: SEARCH_ERROR_MESSAGE,
        });
        setFilterTodo(todos);
        return;
      }
      setFilterTodo(
        filterTodo.filter((item) => item.title.includes(todoValue))
      );
    }
  };

  const checkboxClickHandler = (selectedId) => {
    dispatch(markTodoCompleted(selectedId));
  };

  const clearClickHandler = () => {
    todoDispatch({
      type: "custom",
      payload: {
        ...todoState,
        todoValue: "",
        todoError: "",
      },
    });
    if (filter === ALL) {
      setFilterTodo(todos);
    }
    if (filter === COMPLETED) {
      setFilterTodo(todos.filter((item) => item.isCompleted === true));
    }
    if (filter === ACTIVE) {
      setFilterTodo(todos.filter((item) => item.isCompleted !== true));
    }
  };

  const resetClickHandler = () => {
    todoDispatch({
      type: "reset",
    });
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-container flex flex-col justify-between">
        <div className="px-8">
          <TodoHeader></TodoHeader>
          <div className="mt-4 w-full">
            <div className="flex">
              <div className="w-full">
                <InputField
                  name="input"
                  value={todoValue}
                  placeholder={isAdd ? "Add New" : "Search Todos"}
                  onChange={todoChangeHandler}
                  isError={!!todoError}
                  errorMessage={todoError}
                />
              </div>
              <Button label="Clear" onClick={clearClickHandler} />
            </div>
            <div>
              <TodoList
                list={filterTodo}
                checkboxClickHandler={checkboxClickHandler}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <TodoFooter
            isAdd={isAdd}
            filter={filter}
            todos={todos}
            filterClickHandler={filterClickHandler}
            actionClickHandler={actionClickHandler}
            resetClickHandler={resetClickHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
