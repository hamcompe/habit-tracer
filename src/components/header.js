import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FirebaseContext } from "gatsby-plugin-firebase"
import { ChevronLeft } from "react-feather"
import { logout } from "../lib/auth"

const MenuWrapper = styled.ul`
  ${tw`absolute mt-4 right-0 py-1 bg-white rounded border shadow`};
  bottom: -0.625rem;
  ${props =>
    props.isShow ? tw`visible opacity-100` : tw`invisible opacity-0`};
  transition: opacity 0.2s ease;
  transform: translateY(100%);
`
const Backdrop = styled.div`
  position: fixed;
  ${tw`inset-0`};
`
const MenuItem = styled.li`
  > * {
    ${tw`px-4 py-2 hover:bg-gray-300`};
  }
`

const Header = ({ siteTitle, user, isHome }) => {
  const firebase = React.useContext(FirebaseContext)
  const [isShow, setIsShow] = React.useState(false)

  const handleLogout = () => {
    return logout(firebase).then(() => {
      navigate("/login")
    })
  }

  return (
    <header css={tw`fixed bg-red-500 top-0 w-full h-16 shadow`}>
      <div className="container mx-auto h-full px-4 py-2 flex justify-between items-center">
        {isHome ? (
          <Link css={tw`text-xl font-extrabold text-gray-100`} to="/">
            {siteTitle}
          </Link>
        ) : (
          <Link
            className="text-white hover:bg-red-400 p-1 rounded-full"
            to="/"
            css={css`
              margin-left: -0.75rem;
            `}
          >
            <ChevronLeft size={32} />
          </Link>
        )}
        {user.isLoggedIn ? (
          <div css={tw`relative`}>
            <button
              className="align-middle hover:bg-gray-400 rounded-full"
              onClick={() => {
                setIsShow(!isShow)
              }}
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

            {isShow && (
              <Backdrop
                onClick={() => {
                  setIsShow(false)
                }}
              />
            )}
            <MenuWrapper isShow={isShow}>
              <MenuItem>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout()
                  }}
                >
                  Logout
                </button>
              </MenuItem>
            </MenuWrapper>
          </div>
        ) : (
          <Link css={tw`font-semibold text-gray-100`} to="/">
            Login
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
