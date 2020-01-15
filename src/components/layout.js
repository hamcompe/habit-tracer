/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import { getUser, isLoggedIn } from "../lib/auth"
import "normalize.css"
import "./layout.scss"
import tw from "tailwind.macro"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        user={{ ...getUser(), isLoggedIn: isLoggedIn() }}
      />
      <div className="container" css={tw`mx-auto px-4`}>
        <main>{children}</main>
        <footer className="mt-4">
          © {new Date().getFullYear()}, Built with ❤️ by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/hamcompe/habit-tracer"
          >
            HamComPe
          </a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
