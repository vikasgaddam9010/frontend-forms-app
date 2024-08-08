import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <>
    <div className='header-con'>
      <Link className='heaeders-text' to='/'>
        Home
      </Link>
      <Link className='heaeders-text' to='/uploaded-data'>
        Uploaded Data
      </Link>
    </div>
    <hr />
  </>
)
export default Header
