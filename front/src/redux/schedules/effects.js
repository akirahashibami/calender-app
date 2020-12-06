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

  // 指定された月の予定を取得するAPIを叩く
  // 月年の指定が必須なのでこのように指定
  // awaitで受け取ることによって非同期処理が終わるまで処理をブロックし、Promisの中身だけをresuleに格納
  // 帰ってきた結果のdateはただのstring(正確にはISOStringと言う規格)で帰ってくるので日付の操作ができない
  // そこでformatSchedule(schedule)と言う関数を実装してdateをdayjsインスタンスに変換する処理を行う
  const result = await get(`schedules?month=${month}&year=${year}`);

  // 結果の中の全ての要素に対して同じ処理をして新しい配列を返す必要がある為map()で実装
  const formatedSchedule = result.map(r => formatSchedule(r));

  // 最後にreduxの状態として扱えるようになったformatedScheduleをdispatchして終了
  dispatch(schedulesFetchItem(formatedSchedule));
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

  const body = { ...schedule, date: schedule.date.toISOString()}
  const result = await post("schedules",body);

  const newSchedule = formatSchedule(result);
  dispatch(schedulesAddItem(newSchedule));
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

  await deleteRequest(`schedules/${id}`);

  // 成功したらローカルのstateを削除
  const newSchedules = currentSchedules.filter(s => s.id !== id);
  dispatch(schedulesDeleteItem(newSchedules));
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
