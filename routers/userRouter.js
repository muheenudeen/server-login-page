import express from 'express'
import { blockStatus, getUserId, login, logOut, signUp } from '../Collection/userConroller.js'

export const userRouter=express.Router()



userRouter.post('/signup',signUp)
userRouter.post('/login',login)
userRouter.post('/users/:id',blockStatus)
userRouter.get('/users/:id',getUserId)
userRouter.post('/logout',logOut)