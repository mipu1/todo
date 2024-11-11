import { insertTask, selectAllTasks, deleteTask } from "../models/Task.js";
import { emptyOrRows } from "../helper/utils.js";


const getTasks = async (req, res) => {
    try {
        const result = await selectAllTasks()
        return res.status(200).json(emptyOrRows(result))
    } catch (error) {
        return next(error)
    }
}

const postTask = async (req,res,next) => {
    try{
        if(!req.body.description || req.body.description.length === 0){
            const error = new Error('Invalid description for task')
            error.statusCode = 400
            return next(error)
        }
        const result = await insertTask(req.body.description)
        return res.status(200).json({id: result.rows[0].id})
    }catch (error) {
        return next(error)
    }
}

const removeTask = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (id > 0 !== true) {
            const error = new Error('Invalid id for task')
            error.statusCode = 400
            return next(error)
        }
        const result = await deleteTask(id)
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Task not found' })
        }
        return res.status(200).json({ id, message: 'Task deleted' })
    } catch (error) {
        return next(error)
    }
}

export {getTasks, postTask, removeTask}