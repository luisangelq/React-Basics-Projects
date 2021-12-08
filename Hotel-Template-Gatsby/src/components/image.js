import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import styled from "@emotion/styled"

const ImageBackground = styled(BackgroundImage)`
  height: 70rem;
`

const TextImage = styled.div`
  background-image: linear-gradient(
    to top,
    rgba(34, 49, 63, 0.8),
    rgba(34, 49, 63, 0.8)
  );
  color: #ffffff;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 4rem;
    margin: 0;
    padding: 1rem;

    @media (min-width: 778px) {
      font-size: 6rem;
    }
  }
  p {
    font-size: 2rem;
    margin: 0;
    padding: 1rem;
    @media (min-width: 778px) {
      font-size: 3rem;
    }
  }
`

const ImageHotel = () => {
  const { image } = useStaticQuery(graphql`
    query {
      image: file(relativePath: { eq: "8.jpg" }) {
        sharp: childImageSharp {
          fluid {
            srcSet
          }
        }
      }
    }
  `)
  return (
    <ImageBackground tag="section" fluid={image.sharp.fluid} fadeIn="soft">
      <TextImage>
        <h1>Welcome To Umbral Hotel</h1>
        <p>The Best Hotel For Your Vacations</p>
      </TextImage>
    </ImageBackground>
  )
}

export default ImageHotel
