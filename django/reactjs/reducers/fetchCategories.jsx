import * as catAction from "../actions/categoryAction"

const initialState = {
  isLoadingCAT: false,
  cats: undefined,
}

export default function categories(state=initialState, action={}) {
  switch (action.type) {
  case catAction.FETCH_CAT:
    return {...state, isLoadingCAT: true}
  case catAction.FETCH_CAT_SUCCESS:
    return {...state, isLoadingCAT: false, cats: action.res}
  case catAction.FETCH_CAT_ERROR400:
  case catAction.FETCH_CAT_ERROR500:
  case catAction.FETCH_CAT_FAILURE:
    return {...state, isLoadingCAT: false}
  default:
    return state
  }
}