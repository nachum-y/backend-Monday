const boardService = require('./board.service.js')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')


// GET LIST
async function getBoard(req, res) {
  try {
    // var page = parseInt(req.query.p) || 1
    // const boardsPerPage = 3
    // logger.debug('Getting Toys')

    const queryParams = req.query
    const boards = await boardService.query()
    res.json(boards)
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

// GET BY ID 
async function getBoardById(req, res) {

  try {
    const boardId = req.params.id
    const board = await boardService.getById(boardId)
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

// POST (add board)
async function addBoard(req, res) {
  try {
    const board = req.body
    const addedToy = await boardService.add(board)
    res.json(addedToy)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}

// PUT (Update board)
async function updateBoard(req, res) {
  try {
    const board = req.body
    const updatedBoard = await boardService.update(board)
    // socketService.broadcast({ type: 'updateBoard'})
    // socketService.emitToUser({type: 'review-about-you', data: review, userId: review.aboutUserId})

    // const fullUser = await userService.getById(loggedinUser._id)
    // socketService.emitTo({ type: 'updateBoard', data: updatedBoard })
    // socketService.emitTo({ type: 'updateGroup', data: updatedBoard })
    // socketService.emitTo({ type: 'updateBoard', updatedBoard })
    res.json(updatedBoard)

  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

// DELETE (Remove board)
async function removeBoard(req, res) {
  try {
    const boardId = req.params.id
    await boardService.remove(boardId)
    res.send('Removed')
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

module.exports = {
  getBoard,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard
}
