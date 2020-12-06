// constants
export const SCHEDULES_ADD_ITEM = "SCHEDULES_ADD_ITEM";
export const SCHEDULES_FETCH_ITEM = "SCHEDULES_FETCH_ITEM";
export const SCHEDULES_SET_LOADING = "SCHEDULES_SET_LOADING";
export const SCHEDULES_DELETE_ITEM = "SCHEDULE_DELETE_ITEM";
export const SCHEDULES_ASYNC_FAILURE = "SCHEDULES_ASYNC_FAILURE";
export const SCHEDULES_RESET_ERROR = "SCHEDULES_RESET_ERROR";

// actions
export const schedulesAddItem = payload => ({
  type: SCHEDULES_ADD_ITEM,
  // payloadにはdialogから作成したschedule.formを渡すことを想定
  payload
});

export const schedulesFetchItem = payload => ({
  type: SCHEDULES_FETCH_ITEM,
  payload
})

export const schedulesSetLoading = () => ({
  type: SCHEDULES_SET_LOADING
})

// 削除したscheduleを排除した配列をpayloadとして渡す
export const schedulesDeleteItem = payload => ({
  type: SCHEDULES_DELETE_ITEM,
  payload
})

// エラーが起きた場合はSCHEDULE_ASYNC_FAILUREを呼ぶことでエラーをstateに更新できるように
export const schedulesAsyncFailure = error => ({
  type: SCHEDULES_ASYNC_FAILURE,
  error
});

// 表示したエラーをそれ以上状態として保持しておく必要はないのでリセットするactionも作ります
export const schedulesResetError = () => ({
  type: SCHEDULES_RESET_ERROR
})
