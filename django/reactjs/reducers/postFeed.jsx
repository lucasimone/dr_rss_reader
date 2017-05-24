import * as postFeedActions from "../actions/feedPostAction"

const initialState = {
  feed_isCreated: false,
   error_post_feed : false,
  feed: undefined,
}

export default function createFeed(state=initialState, action={}) {
  switch (action.type) {
  case postFeedActions.POST_FEED:
    return {...state, feed_isCreated: false}
  case postFeedActions.POST_FEED_SUCCESS:
    return {...state, feed_isCreated: true, feed: action.res}
  case postFeedActions.POST_FEED_ERROR400:
  case postFeedActions.POST_FEED_ERROR500:
  case postFeedActions.POST_FEED_FAILURE:
    return {...state, feed_isCreated: false, error_post_feed: true}
  default:
    return state
  }
}