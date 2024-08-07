import {useParams} from 'react-router-dom'
import ReactPlayer from 'react-player'
import {useEffect, useState} from 'react'

import Header from '../Header'
import './index.css'

const EachItem = () => {
  const [itemDetails, setItemDetails] = useState({})
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    getEachData()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const id = useParams()

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  const getEachData = async () => {
    const url = `https://node-upload-user-data.onrender.com/get-uploded-by-id/${id.id}`
    const options = {method: 'GET'}
    const res = await fetch(url, options)
    console.log(res)
    const jsonReq = await res.json()

    setItemDetails(jsonReq)
  }

  const playerWidth = dimensions.width <= 576 ? 300 : '70%'
  const playerHeight = dimensions.width <= 576 ? 150 : '70%'

  return (
    <div className='cont'>
      <Header />
      <div className='d-flex'>
        <h1>Video</h1>

        {itemDetails.video_url ? (
          <div>
            <ReactPlayer
              className='player'
              width={playerWidth}
              height={playerHeight}
              url={itemDetails.video_url}
              controls
              playing={true}
            />
          </div>
        ) : (
          <p>Loading video...</p>
        )}
        <h1>Description</h1>
        <p className='des'>{itemDetails.description}</p>
      </div>
    </div>
  )
}

export default EachItem
