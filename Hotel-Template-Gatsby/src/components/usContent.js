import React, { Fragment } from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

const UsText = styled.main`
  padding-top: 4rem;
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
    justify-items: center;
  }

  p {
    line-height: 2;
    text-align: justify;
  }
`

const AboutUsContent = () => {
  const information = useStaticQuery(graphql`
    query {
      allDatoCmsPage(filter: { slug: { eq: "us" } }) {
        nodes {
          title
          content
          image {
            fluid(maxWidth: 1200) {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  `)

  const { title, content, image } = information.allDatoCmsPage.nodes[0]
  return (
    <Fragment>
      <h2
        css={css`
          text-align: center;
          font-size: 4rem;
          margin-top: 4rem;
        `}
      >
        {title}
      </h2>

      <UsText>
        <div>
          <p>{content}</p>
        </div>

        <Img
          fluid={image.fluid}
          css={css`
            width: 70%;
            margin-bottom: 10rem;
          `}
        />
      </UsText>
    </Fragment>
  )
}

export default AboutUsContent
