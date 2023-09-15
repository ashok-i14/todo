import React from "react";
import { TODO_APP_HEADER } from "../../utils/constants";

const TodoHeader = () => {
  return (
    <div className="uppercase flex justify-center text-5xl font-bold text-gray-500 pt-4">
      {TODO_APP_HEADER}
    </div>
  );
};

export default TodoHeader;
