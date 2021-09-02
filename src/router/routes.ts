import appRouter from 'express'

import userRoutes from './userRoute'
import { UserController } from '../app/controller'

const app = appRouter.Router()

app.post('/login', (req, res) => {
  UserController.login(req, res)
})

app.use("/user", userRoutes)

export let apps = app
export default app
// module.exports = app