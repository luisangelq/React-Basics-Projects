import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import styled from "@emotion/styled"
import { css } from "@emotion/react"

const HomeText = styled.div`
  padding-top: 4rem;
  margin: 5rem auto;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 3rem;
  }
  p {
    line-height: 2;
    text-align: justify;
  }
`

const HomeContent = () => {
  const information = useStaticQuery(graphql`
    query {
      allDatoCmsPage(filter: { slug: { eq: "home" } }) {
        nodes {
          title
          content
          image {
            fluid {
              ...GatsbyDatoCmsFluid
            }
          }
        }
      }
    }
  `)
  const { title, content, image } = information.allDatoCmsPage.nodes[0]
  return (
    <div
      css={css`
        max-width: 1200px;
        width: 95%;
        margin: 5rem auto;
        border-bottom: 1px solid #c1c1c1;
        box-shadow: 0px 11px 9px -8px rgba(0, 0, 0, 0.2);
      `}
    >
      <h2
        css={css`
          text-align: center;
          font-size: 4rem;
          margin-top: 4rem;
        `}
      >
        {title}
      </h2>

      <HomeText>
        <p>{content}</p>
        <Img fluid={image.fluid} />
      </HomeText>
    </div>
  )
}

export default HomeContent
