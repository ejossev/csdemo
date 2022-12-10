import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../lib/config";
const { PrismaClient } = require('@prisma/client')

export default withIronSessionApiRoute(userRoute, ironOptions);

const prisma = new PrismaClient()

async function userRoute(req, res) {
  console.log("useRouter BP1")
  if (req.session.user) {
    const username = req.session.user?.username
    const user = await prisma.user.findUnique({
      where: { username: username },
      select: { username: true, isAdmin: true }
    })

    res.json({
      ...user,
      isLoggedIn: true,
    })
  } else {
    res.json({
      isLoggedIn: false,
      isAdmin: false,
      login: "",
    })
  }
}