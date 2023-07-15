import { Router } from "express";
import * as userController from "../../controllers/userController"
const router = Router()

router.get('/') 
router.get('/:id') 
router.post('/', userController.create) 
router.put('/:id') 
router.delete('/:id')

export default router