import React, { Fragment } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import Img from "gatsby-image"
import useRooms from "../hooks/useRooms"
import { Link } from "gatsby"

const RoomsList = styled.ul`
  max-width: 1200px;
  width: 95%;
  margin: 4rem auto 0 auto;
  height: 100%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 3rem;
  }

  h3 {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 5rem;
  }
`

const Button = styled(Link)`
  margin: 2rem;
  padding: 1rem;
  background-color: #435160;
  color: #fff;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
`

const RoomPreview = () => {
  const rooms = useRooms()

  return (
    <Fragment>
      <h2
        css={css`
          text-align: center;
          margin-top: 5rem;
          font-size: 3rem;
        `}
      >
        Our Rooms
      </h2>

      <RoomsList>
        {rooms.map(({ title, id, image, content, slug }) => (
          <div
            key={id}
            css={css`
              display: grid;
              grid-template-rows: 1fr 1fr;
              border: 1px solid #e1e1e1;
              margin-bottom: 2rem;
            `}
          >
            <Img fluid={image.fluid} />
            <div
              css={css`
                padding: 3rem;
              `}
            >
              <h3>{title}</h3>
              <p>{content}</p>
            </div>
            <Button to={slug}>See Room</Button>
          </div>
        ))}
      </RoomsList>
    </Fragment>
  )
}

export default RoomPreview
