import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { AccountContext, nullAccount } from '../lib/accountContext'

const AccountUpdater = (props) => {
  const [account, setAccount] = useState(nullAccount)
 
  const checkAccount = useCallback(async () => {
    console.log("getting user account info")
    const res = await fetch("/api/user")

    if (!res.ok) {
      setAccount(nullAccount)
      return
    }

    const user = await res.json()
    if (!user.username || user.username === "") {
      setAccount(nullAccount)
      return
    }

    setAccount(user)
  }, [setAccount])

  useEffect(() => {
    checkAccount()
  }, [checkAccount])

  const contextValue = useMemo(() => ({account, checkAccount}), [account, checkAccount])

  return <AccountContext.Provider value={contextValue}>{props.children}</AccountContext.Provider>
}

export default AccountUpdater
