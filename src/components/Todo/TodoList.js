import classNames from "classnames";
import React from "react";
import { NO_DATA } from "../../utils/constants";

const TodoList = ({ list = [], checkboxClickHandler }) => {
  if (!list.length) {
    return (
      <div className="flex justify-center items-center font-bold text-3xl text-slate-500 pt-5">
        <p>{NO_DATA}</p>
      </div>
    );
  }
  return (
    <div>
      {list.map((item) => {
        return (
          <div className="flex py-2 border-b-2" key={item.id}>
            <div className="pr-4">
              <input
                type="checkbox"
                name="completed"
                // disabled={item.isCompleted}
                value={item?.isCompleted}
                checked={item?.isCompleted}
                onChange={() => checkboxClickHandler(item.id)}
              />
            </div>
            <p
              className={classNames("text-slate-600", {
                "line-through text-slate-400": item.isCompleted,
              })}
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
