import { useState, useEffect } from 'react'
// 導入.module.css檔案
import styles from './star.module.css'
import { fill } from 'lodash'

export default function Star({
  maxCount = 5, //最多可評的分數(幾個星星)
  initRating = 0, //初始評分(一開始要點亮幾個星星)
  onRatingChange = () => {}, // 點按後回傳評分用的函式
  fillColor = 'gold',
  emptyColor = 'gray',
  icon = <>&#9733;</>,//用<>...</>包裹起來才是React元素
}) {
  // 點按評分用，預設為0代表沒評分
  // 可能是反樣式: Props In Initial State(使用屬性值來設定元件的初始化狀態)
  // 如果單純只是初始化值，原本的使用是沒問題的。但要綁定到父母元件變動時，就會有不同步的問題
  // 參考: https://vhudyma-blog.eu/react-antipatterns-props-in-initial-state/
  // https://medium.com/@joabi/react-anti-patterns-props-in-initial-state-ad8e1060cd87
  const [rating, setRating] = useState(initRating)
  // 滑鼠游標懸停(hover)的評分，預設為0代表沒評分
  const [hoverRating, setHoverRating] = useState(0)

  // 使用useEffect作完全綁定父母元件傳入狀態
  // 解決反樣式: Props In Initial State(使用屬性值來設定元件的初始化狀態)
  // 監聽傳入的initRating屬性值的更動，一旦有更動就設定本元件的rating狀態的評分，達成完全綁定同步
  // 這種元件在官網文件中稱為controlled component(可控的/受控的 元件)
  useEffect(() => {
    setRating(initRating)
  }, [initRating])

  return (
    <>
      <div>
        {/* 使用快速產生1...N陣列的語法，參考:
      https://github.com/orgs/mfee-react/discussions/50
       */}
        {Array(maxCount)
          .fill(1)
          .map((v, i) => {
            // 分數從1到5(索引值+1)
            const score = i + 1

            return (
              <button
                // 從初次渲染到整個執行過程中，都不會有新增、刪除、修改、排序...，才能使用索引當key值(否則需要先轉為物件陣列並產生id才行)
                key={score}
                className={styles.starBtn}
                onClick={() => {
                  // 點按後設定分數
                  setRating(score)
                  // 回送評分給父母元件
                  onRatingChange(score)
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
                  // 判斷星星是否要點亮樣式。如果目前的分數(score)小於等於選中評分(rating)或hoverRating，則點亮樣式
                  // 使用css modules解決方案套用動態顏色屬性 + css3 變數 + style屬性
                  style={{
                    '--fill-color': fillColor,
                    '--empty-color': emptyColor,
                  }}
                  // 與原本的樣式是一樣的，主要要更動module.css檔案中套入css3變數
                  className={
                    score <= rating || score <= hoverRating
                      ? styles.on
                      : styles.off
                  }
                >
                  {icon}
                </span>
              </button>
            )
          })}
      </div>
    </>
  )
}
