import { getFetch } from 'CONSTANT/api'

export const postListAction = (currentPage, turnPageShowNum, state) => getFetch('GET_POST_ALL_LIST_URL', {
  body: {
    currentPage: currentPage || 1,
    turnPageShowNum: turnPageShowNum || 10,
    state: state || ''
  }
})

export const addPostListAction = data => getFetch('GET_POST_LIST_URL', {
  body: data
})

export const queryPostListAction = data => getFetch('GET_QUERY_POST_LIST_URL', {
  body: {
    postId: data
  }
})

export const modifyPostAction = data => getFetch('MODIFY_QUERY_POST_LIST_URL', {
  body: data
})

export const delPostAction = data => getFetch('DELTE_POST_LIST_URL', {
  body: {
    postId: data
  }
})
