import CartList from '@/components/checkout/cart-list'
import styles from '@/components/checkout/cart.module.css'
import { useCart } from '@/hooks/use-cart'
import CartNavbar from '@/components/checkout/navbar'
import Link from 'next/link'

export default function Cart() {
  const { totalPrice, totalQty } = useCart()

  return (
    <>
      <div className={styles['container']}>
        <CartNavbar />
        <h1>購物車</h1>
        <hr />
        <p>
          <Link href="/cs-0726/checkout/product">連至 商品頁面</Link>
        </p>
        <div className={styles['cart']}>
          <CartList />
        </div>
        <hr />
        <div>
          總數量: {totalQty} / 總金額: {totalPrice}
        </div>
      </div>
    </>
  )
}
