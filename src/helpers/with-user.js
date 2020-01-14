import React from "react"
import { navigate } from "gatsby"
import { getUser, isLoggedIn } from "../lib/auth"

const withUser = Component => props => {
  const user = getUser()

  if (!isLoggedIn()) {
    navigate("/login")
    return null
  }

  return <Component {...props} user={user} />
}

export default withUser
