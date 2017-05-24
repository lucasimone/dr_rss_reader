import * as fetchFeedRss from "../actions/sourceFeed"

const initialState = {
  isLoadingRepos: false,
  rss: undefined
}

export default function FeedRss(state=initialState, action={}) {


  switch (action.type) {
  case fetchFeedRss.FETCH_RSS:
    return {...state, isLoadingRepos: true}
  case fetchFeedRss.FETCH_RSS_SUCCESS: {
      return {...state, isLoadingRepos: false, rss: action.res}
  }
  case fetchFeedRss.FETCH_RSS_ERROR400:
  case fetchFeedRss.FETCH_RSS_ERROR500:
  case fetchFeedRss.FETCH_RSS_FAILURE:
    return {...state, isLoadingRepos: false}
  default:
    return state
  }
}