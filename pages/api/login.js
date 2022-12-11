import { ironOptions } from "../../lib/config"
import { withIronSessionApiRoute } from "iron-session/next";
import bcrypt from "bcrypt"
const { PrismaClient } = require('@prisma/client')

export default withIronSessionApiRoute(userRoute, ironOptions);

async function loginRoute(req, res) {
  const body = await req.body
  const {username, password} = await req.body

  if (!username || !password) {
    res.status(400).json({ message: "username or password in body are missing"})
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username: username }
    })

    if (!(user && bcrypt.compareSync(password, user.passhash))) {
      res.status(401).json({ message: "Login failed" })
      return
    }

    req.session.user = {
      username: user.username,
      isAdmin: user.isAdmin,
      isLoggedIn: true
    }
    await req.session.save()
    res.status(200).json(req.session.user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}