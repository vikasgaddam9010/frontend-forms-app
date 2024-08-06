import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {useEffect, useState} from 'react'

import Header from '../Header'

const EachItem = () => {
  const [itemDetails, setItemDetails] = useState({})
  useEffect(() => {
    getEachData()
  }, [])
  const id = useParams()
  const getEachData = async () => {
    const url = `https://node-upload-user-data.onrender.com/get-uploded-by-id/${id.id}`
    const options = {method: 'GET'}
    const res = await fetch(url, options)
    console.log(res)
    const jsonReq = await res.json()
    console.log(jsonReq)
    setItemDetails(jsonReq)
  }
  console.log(itemDetails.video_url)
  return (
    <div>
      <Header />

      <h1>VIKAS</h1>
      {itemDetails.video_url ? (
        <>
          <ReactPlayer
            url={itemDetails.video_url}
            controls
            playing={false} // Controls autoplay manually
          />

          <ReactPlayer
            url='https://www.youtube.com/watch?v=VYDGESsbFfU'
            controls
            playing={false} // Controls autoplay manually
          />
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  )
}

export default EachItem
