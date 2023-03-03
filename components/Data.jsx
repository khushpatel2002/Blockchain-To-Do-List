import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import React, { useContext } from "react";
import { RiSendPlaneFill, RiCloseFill } from "react-icons/ri";

import Image from "next/image";

import { ToDoListContext } from "../context/ToDolistApp";
import Style from "../styles/index.module.css";

const Data = ({ allToDoList, allAddress, myList }) => {
  const { change } = useContext(ToDoListContext);
  return (
    <div className={Style.home_create_list}>
      {allToDoList.length === 0 ? (
        <div className={Style.noData}>No Data</div>
      ) : (
        <div>
          {allToDoList.map((el, i) => (
            <div key={i + 1} className={Style.home_create_list_app}>
              <div className={Style.lock_list}>
                <AiFillLock className={Style.lock_color} />
                <p>{el[2]}</p>
              </div>
              {el[3] === false ? (
                <RiCloseFill
                  onClick={() => change(el[0])}
                  className={Style.iconClose}
                />
              ) : (
                <p className={Style.down}>Done</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Data;
