import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import tw from "tailwind.macro"

const Header = ({ siteTitle, user }) => {
  return (
    <header>
      <div className="container bg-red-500 mx-auto px-4 flex justify-between">
        <Link css={tw`text-xl`} to="/">
          {siteTitle}
        </Link>
        {user ? (
          <div css={tw`flex items-center`}>
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={user.photoURL}
              alt={user.displayName}
            />
          </div>
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
