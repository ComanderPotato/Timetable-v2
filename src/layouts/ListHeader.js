import React, { useContext, useReducer, useState } from "react";
import "./ListHeader.css";
import arrow from "../assets/arrow.svg";
import {
  useAssignmentsState,
  useAssignmentsStateDispatch,
  ACTIONS,
} from "../context/AssignmentContext";

export default function ListHeader() {
  const { viewCompleted, sortedState } = useAssignmentsState();

  const dispatch = useAssignmentsStateDispatch();

  function sortArrayId() {
    dispatch({
      type: ACTIONS.SORT_BY_ID,
    });
  }

  function sortArrayDate() {
    dispatch({
      type: ACTIONS.SORT_BY_DATE,
    });
  }

  return (
    <>
      {viewCompleted ? (
        <div className='list__header__complete'>
          <div className="list__option">
            <span>Subject ID</span>
          </div>
          <div className="list__option">Subject Name</div>
          <div className="list__option">
            Mark
          </div>
          <div className="list__option">Total</div>
          <div className="list__option">Grade</div>
        </div>
      ) : (
        <div className="list__header">
          <div className="list__option header__filter" onClick={sortArrayId}>
            <span>Subject ID</span>
            <img
              src={arrow}
              className={`chevron ${!sortedState.id && "active-icon"}`}
              alt=""
            />
          </div>
          <div className="list__option">Assignment Name</div>
          <div className="list__option header__filter" onClick={sortArrayDate}>
            <span>Due In</span>
            <img
              src={arrow}
              className={`chevron ${!sortedState.date && "active-icon"}`}
              alt=""
            />
          </div>
          <div className="list__option">
            <span>%</span>
          </div>
        </div>
      )}
    </>
  );
}
{/* <div className='list__header__complete'>
          <div className="list__option header__filter" onClick={sortArrayId}>
            <span>Subject ID</span>
            <img
              src={arrow}
              className={`chevron ${!sortedState.id && "active-icon"}`}
              alt=""
            />
          </div>
          <div className="list__option">Mark</div>
          <div className="list__option header__filter" onClick={sortArrayDate}>
            Total
          </div>
          <div className="list__option">%(Recieved)</div>
          <div className="list__option">%(weighted)</div>
        </div> */}