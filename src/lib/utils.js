import React from "react"

export const withDebug = Component => props => {
  console.log("props :", props)
  return <Component {...props} />
}
