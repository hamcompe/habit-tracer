import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import styled from "@emotion/styled"
import tw from "tailwind.macro"

const Button = styled.button`
  ${tw`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`};
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Button>Test</Button>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
