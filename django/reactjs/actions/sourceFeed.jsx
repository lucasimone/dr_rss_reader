/**
 * Created by luca.lamorte on 21/05/2017.
 */

import { request } from "../utils"

export const FETCH_RSS = "FETCH_RSS"
export const FETCH_RSS_SUCCESS = "FETCH_RSS_SUCCESS"
export const FETCH_RSS_ERROR400 = "FETCH_RSS_ERROR400"
export const FETCH_RSS_ERROR500 = "FETCH_RSS_ERROR500"
export const FETCH_RSS_FAILURE = "FETCH_RSS_FAILURE"
export function fetchFeedRss() {
  return function (dispatch) {
    let url = "http://localhost:8000/api/v1/feeds/?format=json"
    dispatch({type: FETCH_RSS})
    return request(
       url, {},
      (json) => { dispatch({type: FETCH_RSS_SUCCESS, res: json}) },
      (json) => { dispatch({type: FETCH_RSS_ERROR400, res: json}) },
      (res) => { dispatch({type: FETCH_RSS_ERROR500, res: res}) },
      (ex) => { dispatch({type: FETCH_RSS_FAILURE, error: ex}) },
    )
  }
}