import classNames from "classnames";
import React from "react";
import { MdAdd, MdSearch } from "react-icons/md";
import { ACTIVE, ALL, COMPLETED } from "../../utils/constants";
import Button from "../common/Button";
import Chip from "../common/Chip";

const TodoFooter = ({
  todos = [],
  isAdd,
  filter,
  filterClickHandler,
  actionClickHandler,
  resetClickHandler,
}) => {
  return (
    <div className="bg-slate-100 p-2 flex justify-between px-8">
      <div className="flex pr-2">
        <div className="flex pr-2 justify-center items-center">
          <div className={classNames("mr-2", { "text-slate-500": !isAdd })}>
            <MdAdd
              size="24px"
              onClick={() => actionClickHandler("isAdd")}
            ></MdAdd>
          </div>
          <div className={classNames("mr-2", { "text-slate-500": isAdd })}>
            <MdSearch
              size="24px"
              onClick={() => actionClickHandler("isSearch")}
            ></MdSearch>
          </div>
        </div>
        <div className="pl-4 border-l-4 flex justify-center items-center text-slate-500">
          <div className="flex">
            <p className="text-black pr-2">
              {todos.filter((item) => item.isCompleted !== true).length}
            </p>
            <p>Items left</p>
          </div>
        </div>
        {/* <div className="ml-3 flex justify-center items-center">
          <Button label="Reset" onClick={resetClickHandler} />
        </div> */}
      </div>
      <div className="text-slate-500">
        <Chip
          lable="All"
          isActive={filter === ALL}
          onClick={() => filterClickHandler(ALL)}
        />
        <Chip
          lable="Active"
          isActive={filter === ACTIVE}
          onClick={() => {
            filterClickHandler(ACTIVE);
          }}
        />
        <Chip
          lable="Completed"
          isActive={filter === COMPLETED}
          onClick={() => filterClickHandler(COMPLETED)}
        />
      </div>
    </div>
  );
};

export default TodoFooter;
