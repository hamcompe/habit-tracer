import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import tw from "tailwind.macro"
import { css } from "@emotion/core"

const Header = ({ siteTitle, user }) => {
  return (
    <header>
      <div className="container bg-red-500 mx-auto px-4 py-2 flex justify-between items-center">
        <Link css={tw`text-xl font-semibold`} to="/">
          {siteTitle}
        </Link>
        {user ? (
          <button
            className="hover:bg-gray-400 rounded-full"
            css={css`
              transition: background-color 0.3s ease;
              padding: 0.125rem;
            `}
          >
            <img
              css={tw`w-10 h-10 rounded-full`}
              src={user.photoURL}
              alt={user.displayName}
            />
          </button>
        ) : (
          <Link css={tw`text-xl`} to="/">
            login
          </Link>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
