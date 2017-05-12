import { BZ_REQUESTER } from 'MIDDLEWARE/requester'
import API from 'CONSTANT/api'

export const postListAction = (currentPage, turnPageShowNum, state) => ({
  [BZ_REQUESTER]: {
    types: 'POST_QUERY',
    url: API.GET_POST_ALL_LIST_URL,
    body: {
      currentPage: currentPage || 1,
      turnPageShowNum: turnPageShowNum || 10,
      state: state || ''
    }
  }
})

export const addPostListAction = data => ({
  [BZ_REQUESTER]: {
    types: 'POST_QUERY',
    url: API.GET_POST_LIST_URL,
    body: data
  }
})

export const queryPostListAction = data => ({
  [BZ_REQUESTER]: {
    types: 'POST_QUERY',
    url: API.GET_QUERY_POST_LIST_URL,
    body: {
      postId: data
    }
  }
})

export const modifyPostAction = data => ({
  [BZ_REQUESTER]: {
    types: 'POST_QUERY',
    url: API.MODIFY_QUERY_POST_LIST_URL,
    body: data
  }
})

export const delPostAction = data => ({
  [BZ_REQUESTER]: {
    types: 'POST_QUERY',
    url: API.DELTE_POST_LIST_URL,
    body: {
      postId: data
    }
  }
})
