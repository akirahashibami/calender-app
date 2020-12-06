import { connect } from "react-redux";
import AddScheduleDialog from "./presentation";

import {
  addScheduleCloseDialog,
  addScheduleSetValue,
  addScheduleStartEdit
} from "../../redux/addSchedule/actions";

import { asyncSchedulesAddItem } from "../../redux/schedules/effects";

import { isCloseDialog } from "../../service/schedule";

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
const margeProps = (stateProps, dispatchProps) => {
  const {
    schedule: { form: schedule }
  } = stateProps;
  const { saveSchedule, closeDialog } = dispatchProps;

  return{
    ...stateProps,
    ...dispatchProps,
    saveSchedule: () => {
      saveSchedule(schedule);
    },
    closeDialog: () => {
      if(isCloseDialog(schedule)){
        closeDialog();
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  margeProps
)(AddScheduleDialog);
