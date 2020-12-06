import {
  SCHEDULES_ADD_ITEM,
  SCHEDULES_FETCH_ITEM,
  SCHEDULES_SET_LOADING,
  SCHEDULES_DELETE_ITEM,
  SCHEDULES_ASYNC_FAILURE,
  SCHEDULES_RESET_ERROR
} from "./actions";
import dayjs from "dayjs";

// 初期化
const init = {
  // schedule.formのデータ構造を配列でもつ必要があるためitem:[]とする
  items: [],
  // 今後サーバーからデータを取得するのでisLoadingと言うload中かどうかを判定するフラグを持たせる
  isLoading: false,
  error: null
}

const schedulesReducer = (state = init, action) => {
  const { type, payload, error} = action;

  switch (type) {
    case SCHEDULES_ADD_ITEM:
    // itemsは前回のitemsにpayloadとして渡ってきた式の予定を追加した配列を返しています
      return {
        ...state,
        items: [...state.items, payload]
      };
    case SCHEDULES_SET_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case SCHEDULES_FETCH_ITEM:
      return {
        ...state,
        isLoading: false,
        items: payload
      }
    case SCHEDULES_DELETE_ITEM:
      return {
        ...state,
        isLoading: false,
        items: payload
      }
    case SCHEDULES_ASYNC_FAILURE:
      return {
        ...state,
        error
      }
    case SCHEDULES_RESET_ERROR:
      return {
        ...state,
        error: null
    }
    default:
      return state;
  }
}

export default schedulesReducer;
