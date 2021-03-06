// 全てを一つにまとめたreducer
// 複数のreducerをまとめてstoreに登録する仕組みがcombineReducers()であり、ここではrootReducerと呼ぶ

import { combineReducers } from "redux";
import calendarReducer from "./calendar/reducer";
import addScheduleReducer from "./addSchedule/reducer";
import schedulesReducer from "./schedules/reducer";
import currentScheduleReducer from "./currentSchedule/reducer";

// conbineReducersの引数は{[state名]:[reducer]}と言う感じで
const rootReducer = combineReducers({
  calendar: calendarReducer,
  addSchedule: addScheduleReducer,
  schedules: schedulesReducer,
  currentSchedule: currentScheduleReducer,
  schedules: schedulesReducer
});

export default rootReducer;
