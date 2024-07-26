import styles from './cart.module.css'
import { FaShoppingCart } from 'react-icons/fa'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/router'

export default function CartNavbar() {
  const { totalQty } = useCart()
  const router = useRouter()

  return (
    <>
      <div className={styles['navbar']}>
        <div className={styles['logo']}>網站Logo</div>
        <div className={styles['header']}>
          <h2>購物車範例</h2>
        </div>
        <div className={styles['badge']}>
          <div className={styles['button']}>
            <FaShoppingCart
              onClick={() => {
                router.push('/cs-0726/checkout/cart')
              }}
            />
            <span className={styles['button__badge']}>{totalQty}</span>
          </div>
        </div>
      </div>
    </>
  )
}
