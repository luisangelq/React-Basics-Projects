import React from "react"
import Layout from "../components/layout"
import ImageHotel from "../components/image"
import HomeContent from "../components/homeContent"
import RoomPreview from "../components/roomPreview"

const IndexPage = () => {
  return (
    <Layout>
      <ImageHotel />
      <HomeContent />
      <RoomPreview />

      {/* <ul>
        {rooms.map(room => (
          <RoomPreview 
            key={room.id}
            room={room}
          />
        ))}
      </ul> */}
    </Layout>
  )
}

export default IndexPage
