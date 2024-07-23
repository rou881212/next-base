import { useState } from 'react'
import Star from '@/components/star'
import { FaHeartbeat, FaStarOfDavid } from 'react-icons/fa'

export default function StarTest() {
  const [r1, setR1] = useState(2)
  const [r2, setR2] = useState(3)

  return (
    <>
      <h1>星星評分元件測試頁</h1>
      <hr />
      <h2>對照組(預設屬性)</h2>
      <Star />
      <hr />
      <h2>測試組</h2>
      <Star
        maxCount={6}
        initRating={r1}
        onRatingChange={setR1}
        fillColor="green"
        emptyColor="pink"
        icon={<FaHeartbeat />}
      />
      <p>你選了{r1}分</p>
      <button
        onClick={() => {
          setR1(5)
        }}
      >
        r1設定為5
      </button>
      <button
        onClick={() => {
          setR1(0)
        }}
      >
        r1設定為0
      </button>

      <hr />
      <Star
        maxCount={4}
        initRating={r2}
        onRatingChange={setR2}
        fillColor="#ff6600"
        emptyColor="#ccc"
        icon={<FaStarOfDavid />}
      />
      <p>你選了{r2}分</p>
    </>
  )
}
