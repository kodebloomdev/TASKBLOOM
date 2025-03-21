import express from 'express'
import userRoutes from './user.js'
import taskRoutes from './task.js'
import attendanceRoutes from './attendanceRoutes.js'
import leaveRoutes from './leaveRoutes.js'

const router = express.Router()

router.use('/user',userRoutes)
router.use('/task',taskRoutes)
router.use("/api/attendance", attendanceRoutes);
router.use('/api/leave',leaveRoutes)

 export default router