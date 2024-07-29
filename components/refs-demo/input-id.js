export default function InputId() {
  return (
    <>
      <h2>input-text使用id</h2>
      <input type="text" id="my-input" />
      <button
        onClick={() => {
          document.getElementById('my-input').focus()
        }}
      >
        聚焦
      </button>
      <button
        onClick={() => {
          document.getElementById('my-input').blur()
        }}
      >
        失焦
      </button>
      <button
        onClick={() => {
          alert(document.getElementById('my-input').value)
        }}
      >
        獲得值
      </button>
    </>
  )
}
