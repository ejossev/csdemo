
import React from 'react'

export const nullAccount = {
  username: null,
  isAdmin: false,
  isLoggedIn: false,
}

export const AccountContext = React.createContext({account: null, checkAccount: () => {}});

