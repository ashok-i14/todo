import classNames from "classnames";
import React from "react";

const Chip = ({ lable, isActive, onClick }) => {
  return (
    <div
      className={classNames("w-auto chip", {
        "border font-semibold text-black": isActive,
      })}
      onClick={onClick}
    >
      {lable}
    </div>
  );
};

export default Chip;
