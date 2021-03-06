// スケジュールを追加するアクション
// 必要なアクションはフォームの値を更新するものと、dialogを開けるもの、dialogを閉じるもの
// 入力が終わった時はフォームをクリアしてダイアログも閉じたいのでまとめて実行できるアクションを作成

// constants
export const ADD_SCHEDULE_SET_VALUE = "ADD_SCHEDULE_SET_VALUE";
export const ADD_SCHEDULE_OPEN_DIALOG = "ADD_SCHEDULE_OPEN_DIALOG";
export const ADD_SCHEDULE_CLOSE_DIALOG = "ADD_SCHEDULE_CLOSE_DIALOG";
export const ADD_SCHEDULE_START_EDIT = "ADD_SCHEDULE_START_EDIT";

// actions
// payloadとして、{ [key]: value }のobjectを受け取る
export const addScheduleSetValue = payload => ({
  type: ADD_SCHEDULE_SET_VALUE,
  payload
})

export const addScheduleOpenDialog = () => ({
  type: ADD_SCHEDULE_OPEN_DIALOG
})

export const addScheduleCloseDialog = () => ({
  type: ADD_SCHEDULE_CLOSE_DIALOG
})

export const addScheduleStartEdit = () => ({
  type: ADD_SCHEDULE_START_EDIT
})
