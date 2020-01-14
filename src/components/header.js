import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import tw from "tailwind.macro"
import styled from "@emotion/styled"
import { css } from "@emotion/core"
import { FirebaseContext } from "gatsby-plugin-firebase"
import { logout } from "../lib/auth"

const MenuWrapper = styled.ul`
  ${tw`absolute bottom-0 right-0 py-1 bg-white border shadow`};
  ${props =>
    props.isShow ? tw`visible opacity-100` : tw`invisible opacity-0`};
  transition: opacity 0.2s ease;
  transform: translateY(100%);
`
const Backdrop = styled.div`
  position: fixed;
  ${tw`inset-0`};
  /* background: hotpink; */
`
const MenuItem = styled.li`
  > * {
    ${tw`px-4 py-2 hover:bg-gray-300`};
  }
`

const Header = ({ siteTitle, user }) => {
  const firebase = React.useContext(FirebaseContext)
  const [isShow, setIsShow] = React.useState(false)

  const handleLogout = () => {
    return logout(firebase).then(() => {
      navigate("/login")
    })
  }

  return (
    <header>
      <div className="container bg-red-500 mx-auto px-4 py-2 flex justify-between items-center">
        <Link css={tw`text-xl font-extrabold text-gray-100`} to="/">
          {siteTitle}
        </Link>
        {user.isLoggedIn ? (
          <div css={tw`relative`}>
            <button
              className="hover:bg-gray-400 rounded-full"
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
