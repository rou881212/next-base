import { useState } from 'react'

export default function ImageUpload() {
  // 記錄選擇的圖片檔案，特殊物件初始值使用null
  const [selectedFile, setSelectedFile] = useState(null)
  // 預覽圖片的網址(呼叫URL.createObjectURL產生的網址)
  const [previewURL, setPreviewURL] = useState('')
  // 記錄伺服器回應的json字串
  const [message, setMessage] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    console.log(file)

    // 要判斷使用者是否在點開選項圖片對話盒時，按下取消，file會返回undefined
    if (file) {
      // 設定檔案(上傳到伺服器用)
      setSelectedFile(file)
      // 產生預覽網址
      setPreviewURL(URL.createObjectURL(file))
    } else {
      // 回復預設值
      setSelectedFile(null)
      setPreviewURL('')
    }
  }

  // 處理檔案上傳
  const handleFileUpload = async () => {
    const fd = new FormData()

    // 對照伺服器要接收的檔案欄位名稱，加入要上傳的檔案物件
    fd.append('avatar', selectedFile)

    // 傳送到伺服器
    const res = await fetch('http://localhost:5555/upload-avatar', {
      method: 'POST',
      body: fd,
    })

    //獲得伺服器回應
    const data = await res.json()

    // 設定到訊息狀態(轉為JSON字串)
    setMessage(JSON.stringify(data))
  }

  return (
    <>
      <h1>圖片預覽與上傳</h1>
      <hr />
      <div>
        {/* 檔案上傳元件必定是不可控元件(唯讀的)，只有onChange可用，沒有value屬性能設定值 */}
        <input type="file" onChange={handleImageChange} />
      </div>
      <div>
        <button onClick={handleFileUpload}>上傳到伺服器</button>
      </div>
      <div>伺服器回應: {message}</div>
      <div>
        預覽:
        <img src={previewURL} alt="" />
      </div>
    </>
  )
}
