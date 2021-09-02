import baseService from './baseService'

import userService from './userService'
import AuthService from './general/authService'

let authService = new AuthService
let UserService = new userService

export { 
  authService,
  baseService,
  UserService
}