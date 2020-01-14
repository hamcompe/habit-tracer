import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import tw from "tailwind.macro"

const Header = ({ siteTitle }) => {
  return (
    <header>
      <div className="container bg-red-500 mx-auto px-4 flex justify-between">
        <Link css={tw`text-xl`} to="/">
          {siteTitle}
        </Link>
        <Link css={tw`text-xl`} to="/">
          login
        </Link>
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
