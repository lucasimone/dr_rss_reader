/**
 * Created by luca.lamorte on 21/05/2017.
 */

import { Post } from "../utils"

export const POST_FEED = "POST_FEED"
export const POST_FEED_SUCCESS = "POST_FEED_SUCCESS"
export const POST_FEED_ERROR400 = "POST_FEED_ERROR400"
export const POST_FEED_ERROR500 = "POST_FEED_ERROR500"
export const POST_FEED_FAILURE = "POST_FEED_FAILURE"
export function postFeed(basicAuth, feed_url, title) {
  return function (dispatch) {
    let url = "http://localhost:8000/api/v1/feeds/"
    dispatch({type: POST_FEED})
    return Post(
      url,
      feed_url,
      title,
      {'Authorization': basicAuth},
      (json) => { dispatch({type: POST_FEED_SUCCESS, res: json}) },
      (json) => { dispatch({type: POST_FEED_ERROR400, res: json}) },
      (res) => { dispatch({type: POST_FEED_ERROR500, res: res}) },
      (ex) => { dispatch({type: POST_FEED_FAILURE, res: ex}) },
    )
  }
}