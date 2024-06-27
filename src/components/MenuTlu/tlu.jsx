import './tlu.css'

function header() {
  return (
    <div>
        <div className='menu'>
            <div className='menu-title'>
                <span className='logo'>TLU</span>
                <span>TRANG CHỦ</span>
                <span>Nhiệm vụ</span>
            </div>
            <div className='search'>
            <input type='text' placeholder='Nhập nội dung tìm kiếm' />
            <button type='submit'>Tìm</button>
        </div>
      </div>
    </div>
  )
}

export default header