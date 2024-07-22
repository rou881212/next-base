import { useState } from 'react'
// 導入.module.css檔案
import styles from '@/styles/star.module.css'

export default function Star() {
  // 點按評分用，預設為0代表沒評分
  const [rating, setRating] = useState(0)
  // 滑鼠游標懸停(hover)的評分，預設為0代表沒評分
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <>
      <h1>星星評分範例</h1>
      <div>
        {/* 使用快速產生1...N陣列的語法，參考:
      https://github.com/orgs/mfee-react/discussions/50
       */}
        {Array(5)
          .fill(1)
          .map((v, i) => {
            // 分數從1到5(索引值+1)
            const score = i + 1

            return (
              //從初次渲染到整個執行過程中,都不會有新增 刪除 修改 排序... 才能使用索引值當key值(否則)
              <button
                key={score}
                className={styles.starBtn}
                onClick={() => {
                  // 點按後設定分數
                  setRating(score)
                }}
                onMouseEnter={() => {
                  // 進入時設定分數
                  setHoverRating(score)
                }}
                onMouseLeave={() => {
                  // 離開時設定回預設值
                  setHoverRating(0)
                }}
              >
                <span
                  // 判斷星星是否要點亮樣式。如果目前的分數(score)小於等於選中評分(rating)或hoverRating，則點亮樣式 .
                  className={
                    score <= rating || score <= hoverRating
                      ? styles.on
                      : styles.off
                  }
                >
                  &#9733;
                </span>
              </button>
            )
          })}
        你選了{rating}分
      </div>
    </>
  )
}