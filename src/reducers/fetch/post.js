import { getFetch } from 'CONSTANT/api'

export const postListAction = (currentPage, turnPageShowNum, state) => getFetch('GET_POST_ALL_LIST', {
  body: {
    currentPage: currentPage || 1,
    turnPageShowNum: turnPageShowNum || 10,
    state: state || ''
  }
})

export const addPostListAction = data => getFetch('GET_POST_LIST', {
  body: data
})

export const queryPostListAction = data => getFetch('GET_POST_QUERY_LIST', {
  body: {
    postId: data
  }
})

export const modifyPostAction = data => getFetch('SET_POST_QUERY_LIST', {
  body: data
})

export const delPostAction = data => getFetch('DEL_POST_LIST', {
  body: {
    postId: data
  }
})
