import * as postFeedActions from "../actions/feedPostAction"

const initialState = {
  isCreated: false,
  feed: undefined,
}

export default function createFeed(state=initialState, action={}) {
  switch (action.type) {
  case postFeedActions.POST_FEED:
    return {...state, isCreated: false}
  case postFeedActions.POST_FEED_SUCCESS:
    return {...state, isCreated: true, feed: action.res}
  case postFeedActions.POST_FEED_ERROR400:
  case postFeedActions.POST_FEED_ERROR500:
  case postFeedActions.POST_FEED_FAILURE:
    return {...state, isCreated: false}
  default:
    return state
  }
}