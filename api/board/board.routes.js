const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { log } = require('../../middlewares/logger.middleware')
const { getBoard, getBoardById, addBoard, updateBoard, removeBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoard)
router.get('/:id', getBoardById)
router.post('/', addBoard)
router.put('/:id', updateBoard)
// router.delete('/:id', requireAuth, requireAdmin, removeBoard)

module.exports = router