import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MdDeleteForever} from 'react-icons/md'

import Header from '../Header'
import './index.css'

const UploadedData = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const url = 'https://node-upload-user-data.onrender.com/all-items'
    const options = {method: 'GET'}
    getDataFrom(url, options)
  }, [])

  const getDataFrom = async (url, options) => {
    const res = await fetch(url, options)

    const jsonresData = await res.json()

    setList(jsonresData)
  }

  const doDelOperation = id => {

    const url = `https://node-upload-user-data.onrender.com/del/${id}`
    const options = {method: 'DELETE'}
    getDataFrom(url, options)
  }

  return (
    <>
      <Header />
      <div className='container-of-ul'>
        <ul className='ul'>
          {list.map(each => {
            const onClickToDelete = () => {
              doDelOperation(each.id)
            }
            return (
              <li key={each.id} className='d-flex-space-between'>
                <Link className='link' to={`/id/${each.id}`}>
                  <img className='img' alt={each.title} src={each.img_url} />
                  <p className='para'>
                    Title: <span className='title'>{each.title}</span>
                  </p>
                </Link>
                <MdDeleteForever className='icon' onClick={onClickToDelete} />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
export default UploadedData
