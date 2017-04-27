import React from 'react'
import Lazy from 'COMPONENT/Lazy'
import Loading from 'COMPONENT/Loading'
import loadPostManage from 'bundle-loader?lazy&name=postManage!./index'

const PostManage = () => (
  <Lazy load={loadPostManage}>
    {PostManage => PostManage ? <PostManage /> : <Loading />}
  </Lazy>
)

export default PostManage
