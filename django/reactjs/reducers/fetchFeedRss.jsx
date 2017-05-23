import * as feedItemsActions from "../actions/feedsAction"

const initialState = {
  isLoadingRepos: false,
  rss: undefined,
}

export default function FeedRss(state=initialState, action={}) {
  switch (action.type) {
  case feedItemsActions.FETCH_REPOS:
    return {...state, isLoadingRepos: true}
  case feedItemsActions.FETCH_REPOS_SUCCESS:
    return {...state, isLoadingRepos: false, rss: action.res}
  case feedItemsActions.FETCH_REPOS_ERROR400:
  case feedItemsActions.FETCH_REPOS_ERROR500:
  case feedItemsActions.FETCH_REPOS_FAILURE:
    return {...state, isLoadingRepos: false}
  default:
    return state
  }
}