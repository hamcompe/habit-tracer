import React from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { useFirebase } from "gatsby-plugin-firebase"
import { setUser, isLoggedIn } from "../lib/auth"

const IndexPage = ({ location }) => {
  const [firebase, setFirebase] = React.useState()

  useFirebase(firebase => {
    setFirebase(firebase)
  }, [])

  if (isLoggedIn()) {
    navigate(`/`)
    return null
  }

  function getUiConfig(auth) {
    return {
      signInFlow: "popup",
      signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
      callbacks: {
        signInSuccessWithAuthResult: result => {
          setUser(result.user)
          navigate("/")
        },
      },
    }
  }

  return (
    <Layout>
      <SEO title="Login" />
      {firebase && (
        <StyledFirebaseAuth
          uiConfig={getUiConfig(firebase.auth)}
          firebaseAuth={firebase.auth()}
        />
      )}
    </Layout>
  )
}

export default IndexPage
