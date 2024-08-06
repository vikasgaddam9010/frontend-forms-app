import {Routes, Route} from 'react-router-dom'

import Home from './Home'
import UploadedData from './UploadedData'
import EachItem from './EachItem'

const App = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/uploaded-data' element={<UploadedData />} />
      <Route exact path='/id/:id' element={<EachItem />} />
    </Routes>
  )
}

export default App
