import React from 'react'
import { Tree } from 'antd'
const TreeNode = Tree.TreeNode

const bindDataLoop = item => {
  if (item.children.length >= 1) {
    return (
      <TreeNode key={item.roleId} title={item.roleName}>
        {item.children.map(bindDataLoop)}
      </TreeNode>
    )
  } else {
    return <TreeNode key={item.roleId} title={item.roleName} isLeaf />
  }
}

export default ({ selected, roleList, selectedKeys }) => {
  if (!roleList) {
    return null
  }

  return (
    <div className='app-barnch-tree'>
      <Tree
        autoExpandParent
        selectedKeys={selectedKeys || []}
        onSelect={(info, node) =>
          selected({
            roleId: info[0],
            title: node.node.props.title
          })
        }
      >
        {roleList.map(bindDataLoop)}
      </Tree>
    </div>
  )
}
