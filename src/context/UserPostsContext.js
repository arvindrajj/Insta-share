import React from 'react'

const UserPostsContext = React.createContext({
  userPosts: [],
  updatePosts: () => {},
})

export default UserPostsContext
