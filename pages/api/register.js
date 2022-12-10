import { ironOptions } from "../../lib/config"
import { withIronSessionApiRoute } from "iron-session/next";
import { saltRounds } from "../../lib/config";
import bcrypt from "bcrypt"

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export default withIronSessionApiRoute(registerRoute, ironOptions)

async function registerRoute(req, res) {
  const {username, password} = await req.body

  try {
    var user = await prisma.user.findUnique({
      where: { username: username }
    })

    if (user) 
      res.status(500).json({ message: "User already exists" })

    var user = await prisma.user.create({data: {
      username:username,
      isAdmin: false,
      passhash: bcrypt.hashSync(password, saltRounds)
    }})

    req.session.user = {
      username: user.username,
      isAdmin: user.isAdmin,
    }
    await req.session.save()
    res.json(req.session.user);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}