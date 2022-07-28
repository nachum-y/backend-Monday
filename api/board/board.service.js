const { log } = require('../../middlewares/logger.middleware')
// const { paginatedResults } = require('../../middlewares/pagination.middleware')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId


async function query() {
    var params = {}
    // if (queryParams.filterData) params = JSON.parse(queryParams.filterData)
    try {
        // const page = params.data.page || 1
        // const boardsPerPage = 3
        // var sortByParams = {}

        const criteria = _buildCriteria()
        const collection = await dbService.getCollection('boards')
        var boards = await collection
            .find(criteria)
            .toArray()

        // const ressults = {}
        // ressults.boards = boards.slice((page - 1) * boardsPerPage, (page) * boardsPerPage)
        // ressults.data = await paginatedResults(collection, page, boardsPerPage, boards)
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('boards')
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('boards')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('boards')
        const addedBoard = await collection.insertOne(board)
        return addedBoard
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}
async function update(board) {
    try {
        var id = ObjectId(board._id)
        delete board._id
        const collection = await dbService.getCollection('boards')
        await collection.updateOne({ _id: id }, { $set: { ...board } })
        
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
}

function _buildCriteria(filterBy) {
    var criteria = {}
    return criteria


}
