import './App.css'
import {useState} from 'react'

const App = () => {
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
    const formDetails = new FormData()
    formDetails.append('file', file)
    formDetails.append('upload_preset', preset)

    const url = `https://api.cloudinary.com/v1_1/dysqgk8ph/${type}/upload`

    const options = {
      method: 'POST',
      body: formDetails,
    }

    const response = await fetch(url, options)
    const jsonDataUrl = await response.json()
    console.log(jsonDataUrl.url)

    return jsonDataUrl.url
  }

  const submitHandler = async event => {
    event.preventDefault()
    try {
      //const text = await handleUpload(title, 'text_upload')
      //const des = await handleUpload(description, 'description_upload')
      const thumbnailUrl = await handleUpload(image, 'image', 'image_upload')
      const videoUrl = await handleUpload(video, 'video', 'video_upload')

      //console.log('Title:', text)
      //console.log('Description:', des)
      console.log('Thumbnail URL:', thumbnailUrl)
      console.log('Video URL:', videoUrl)

      alert('Files uploaded successfully!')
    } catch (error) {
      console.error(error)
      alert('Error uploading files.')
    }
  }

  return (
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
  )
}

export default App
