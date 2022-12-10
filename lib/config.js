export const ironOptions = {
  cookieName: "UserCookie",
  password: String(process.env.SECRET_COOKIE_KEY || "abcdefghijklmnopqrstuvwxyz1234567890"),
  cookieOptions: {
    secure: process.env.NODE_ENV == "production"
  }
}

export const saltRounds = 10