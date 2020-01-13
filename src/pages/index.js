import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import tw from "tailwind.macro"

const Button = styled.button`
  ${tw`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`};
`
const Form = styled.form`
  ${tw`w-full max-w-sm`}
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Form>
      <div
        css={css`
          ${tw`md:flex md:items-center mb-6`}
        `}
      >
        <label
          css={css`
            ${tw`block text-gray-700 text-sm font-bold mb-2`}
          `}
          htmlFor="task-name"
        >
          Task name
        </label>
        <input
          css={css`
            ${tw`bg-gray-200 shadow appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
          `}
          id="task-name"
          type="text"
          placeholder="Task name"
        />
      </div>
      <div
        css={css`
          ${tw`flex items-center justify-between`}
        `}
      >
        <Button type="button">Add</Button>
      </div>
    </Form>
  </Layout>
)

export default IndexPage
