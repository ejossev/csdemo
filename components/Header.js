import Link from "next/link";
import { useContext } from "react";
import styles from "../styles/components/Header.module.css"
import { AccountContext } from "../lib/accountContext";
import { useRouter } from "next/router";

const Header = () => {
  const x = useContext(AccountContext)
  console.log(x)
  const { account, checkAccount } = useContext(AccountContext)
  const router = useRouter()

  return (
    <nav className
    ={styles.navbar}>
      <Link href="/">
        <div className={styles.logo}>
          <p>
            Smoothies <span className={styles.logo_span}>☘</span>
          </p>
        </div>
      </Link>
      {(!account || account?.isLoggedIn === false) && (
        <Link href="/login">
          Login
        </Link>
      )}
      {account?.isLoggedIn === true && (
        <>
          <div className={styles.nav_price}>
            <span>🛒</span>
            <p>$0.00</p>
          </div>
          <Link href="/logout" onClick={async (e) => {
            e.preventDefault()
            const res = await fetch("/api/logout")
            // setUser({username: "", isLoggedIn: false})
            checkAccount()
            router.push("/login")
          }}>
            Logout
          </Link>
        </>
      )}
      
    </nav>
  );
};

export default Header