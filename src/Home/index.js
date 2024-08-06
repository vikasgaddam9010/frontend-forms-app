import {useState} from 'react'
import Header from '../Header'
import './index.css'

const Home = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImg] = useState(null)
  const [video, setVideo] = useState(null)

  document.title = 'Upload Data'

  const onChangeTitle = event => {
    setTitle(event.target.value)
  }

  const onChangeDescription = event => {
    setDescription(event.target.value)
  }

  const onChangeToUploadImg = event => {
    setImg(event.target.files[0])
  }

  const onChangeToUploadVideo = event => {
    setVideo(event.target.files[0])
  }

  const handleUpload = async (file, type, preset) => {
    if (file !== undefined) {
      const formDetails = new FormData()
      formDetails.append('file', file)
      formDetails.append('upload_preset', preset)

      const url = `https://api.cloudinary.com/v1_1/dagtd0cm9/${type}/upload`

      const options = {
        method: 'POST',
        body: formDetails,
      }

      try {
        const response = await fetch(url, options)
        const jsonDataUrl = await response.json()
        console.log(jsonDataUrl.url) // Log the URL to ensure it is returned
        return jsonDataUrl.url
      } catch (error) {
        console.error('Error uploading file:', error)
        return null // Return null if an error occurs
      }
    } else {
      return alert('Please Upload File')
    }
  }

  const submitHandler = async event => {
    event.preventDefault()
    try {
      let thumbnailUrl = await handleUpload(image, 'image', 'image_upload')

      let videoUrl = await handleUpload(video, 'video', 'video_uploads')

      if (
        (title !== '' || title !== undefined) &&
        (description !== '' || description !== undefined) &&
        thumbnailUrl !== undefined &&
        videoUrl !== undefined
      ) {
        console.log('Title:', title)
        console.log('Description:', description)
        console.log('Thumbnail URL:', thumbnailUrl)
        console.log('Video URL:', videoUrl)

        const details = {
          title,
          description,
          thumbnailUrl,
          videoUrl,
        }
        const url = 'https://node-upload-user-data.onrender.com/upload-data'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        }

        const resDb = await fetch(url, options)
        console.log(resDb)

        alert('Files uploaded successfully!')
      } else {
        return alert(
          'All Inputs(Title, description, Image and Videos) are mandatory',
        )
      }
    } catch (error) {
      console.error(error)
      alert('Error uploading files.')
    }
  }

  return (
    <>
      <Header />

      <div className='container'>
        <form onSubmit={submitHandler} className='form-container'>
          <h1 className='heading-name'>Upload Data</h1>
          <label>Title</label>
          <input
            value={title}
            onChange={onChangeTitle}
            className='mt title-input'
            placeholder='Enter Title Here...'
            type='text'
            maxLength='50'
          />
          <label>Description</label>
          <textarea
            value={description}
            onChange={onChangeDescription}
            className='mt title-input'
            placeholder='Enter Description...'
            maxLength='200'
          />
          <label>Upload Thumbnail</label>
          <input
            onChange={onChangeToUploadImg}
            className='mt'
            type='file'
            accept='.jpg,.jpeg,.png'
          />
          <label>Upload Video</label>
          <input
            onChange={onChangeToUploadVideo}
            className='mt'
            type='file'
            accept='.mpg,.avi,.mp4'
          />
          <button className='btn' type='submit'>
            Click Here to Upload
          </button>
        </form>
      </div>
    </>
  )
}

export default Home
