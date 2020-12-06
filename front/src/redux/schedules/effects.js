import {
  schedulesSetLoading,
  schedulesFetchItem,
  schedulesAddItem,
  schedulesDeleteItem,
  schedulesAsyncFailure,

} from "./actions";
import { get, post, deleteRequest } from "../../service/api";
import { formatSchedule } from "../../service/schedule";

export const asyncSchedulesFetchItem = ({ month,year }) => async dispatch => {
  // loading:true にする action を dispatch
  dispatch(schedulesSetLoading());

  try {
    const result = await get(`schedules?month=${month}&year=${year}`);
    // const result = await get(`schedules`);
    const formatedSchedule = result.map(r => formatSchedule(r));

    dispatch(schedulesFetchItem(formatedSchedule));
  }catch(err){
    console.error(err);
    dispatch(schedulesAsyncFailure(err.message));
  }
}

export const asyncSchedulesAddItem = schedule => async dispatch => {
  // loading: trueにする
  dispatch(schedulesSetLoading());

  // 非同期処理のエラーを補足できるように
  try {
    const body = { ...schedule, date: schedule.date.toISOString()}
    const result = await post("schedules", body);

    const newSchedule = formatSchedule(result);
    dispatch(schedulesAddItem(newSchedule));
  }catch(err){
    console.error(err);
    dispatch(schedulesAsyncFailure(err.message));
  }
}

export const asyncSchedulesDeleteItem = id => async(dispatch, getState) => {
  dispatch(schedulesSetLoading());
  // getState()はthunkの関数の第二引数でstoreのデータを取得する
  const currentSchedules = getState().schedules.items;

  try{
    await deleteRequest(`schedules/${id}`);

    // 成功したらローカルのstateを削除
    const newSchedules = currentSchedules.filter(s => s.id !== id);
    dispatch(schedulesDeleteItem(newSchedules));
  } catch(err) {
    console.error(err);
    dispatch(schedulesAsyncFailure(err.message));
  }
}


// try{
//   // エラーが起こりうる処理
// } catch(err){
//   // エラー処理
// }
// 上記のような公文でエラーを補足することができます

// const result = await get(`schedules?month=${month}&year=${year}`);
// このコードは通信を含むのでいくらコードを正しくしてもエラーを吐く可能性があります(サーバーが落ちているなど)
// それを補足してユーザーにエラーを知らせるために,tyr-catchで囲みました
