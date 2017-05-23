/**
 * Created by luca.lamorte on 21/05/2017.
 */

import { request } from "../utils"

export const FETCH_CAT = "FETCH_CAT"
export const FETCH_CAT_SUCCESS = "FETCH_CAT_SUCCESS"
export const FETCH_CAT_ERROR400 = "FETCH_CAT_ERROR400"
export const FETCH_CAT_ERROR500 = "FETCH_CAT_ERROR500"
export const FETCH_CAT_FAILURE = "FETCH_CAT_FAILURE"
export function fetchCategories() {
  return function (dispatch) {
    let url = "http://localhost:8000/api/v1/category/?format=json"
    dispatch({type: FETCH_CAT})
    return request(
      url, {},
      (json) => { dispatch({type: FETCH_CAT_SUCCESS, res: json}) },
      (json) => { dispatch({type: FETCH_CAT_ERROR400, res: json}) },
      (res) => { dispatch({type: FETCH_CAT_ERROR500, res: res}) },
      (ex) => { dispatch({type: FETCH_CAT_FAILURE, error: ex}) },
    )
  }
}