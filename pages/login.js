import React, { useState, useContext, useCallback, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { AccountContext } from "../lib/accountContext";
import { useRouter } from "next/router";

export default function Login({ allProducts }) {
  const [errorMsg, setErrorMsg] = useState("");
  const { account, checkAccount } = useContext(AccountContext)
  const router = useRouter()

  const redirectIfLogged = useCallback(() => {
    console.log("inside redirect " + account.username)
    if (account.username && account.username !== "")
      router.push("/")
  }, [account])

  useEffect(redirectIfLogged)

  return (
    <>
      <Head>
        <title>Smoothies | Login</title>
      </Head>
      <div className="login">
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={async (event) => {
          event.preventDefault();
          const body = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
          };

          try {
            const res = await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })

            if (res.ok) {
              // setUser(await res.json(), false)
              checkAccount()
            } else {
              //setUser({isLoggedIn: false, username: ""}, false)
              checkAccount()
              setErrorMsg("Failed to log in")
            }
          } catch (error) {
            console.log("error caught, ", error)
            setErrorMsg(error.message)
          }
        }}>
          <label>
            <span>Type your username and password</span>
            <p/>
            <input type="text" name="username" required />
            <input type="password" name="password" required />
          </label>

          <button type="submit">Login</button>

          {errorMsg && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    </>
  );
}
