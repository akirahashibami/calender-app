import { connect } from "react-redux";
import AddScheduleDialog from "./presentation";

import {
  addScheduleCloseDialog,
  addScheduleSetValue,
  addScheduleStartEdit
} from "../../redux/addSchedule/actions";

import { asyncSchedulesAddItem } from "../../redux/schedules/effects";

const mapStateToProps = state => ({ schedule: state.addSchedule });

const mapDispatchToProps = dispatch => ({
  closeDialog: () => {
    dispatch(addScheduleCloseDialog());
  },
  setSchedule: value => {
    dispatch(addScheduleSetValue(value));
  },
  // saveSchedule()としてscheduleAddItem()とaddScheduleCloseDialog()を呼び出し
  // scheduleAddItem()は引数にscheduleが必要だが、ここでは取得できないため、値をそのままdispatch
  saveSchedule: schedule => {
    dispatch(asyncSchedulesAddItem(schedule));
    dispatch(addScheduleCloseDialog());
  },
  setIsEditStart: () => {
    dispatch(addScheduleStartEdit());
  }
})

// ここでは必要なscheduleをstatePropsから取得できるため、saveScheduleに渡す
// formと言う名前だと何を表しているか分かりづらいため、変数名scheduleで受け取っている
const margeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  saveSchedule: () => {
    const {
      schedule: { form: schedule }
    } = stateProps;
    dispatchProps.saveSchedule(schedule);
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  margeProps
)(AddScheduleDialog);
