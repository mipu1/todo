import { pool } from "../helper/db";

const insertUser = async (email, hashedPassword) => {
    return await pool.query('INSER INTO account (email,password) values ($1,$2) returning *', [email, hashedPassword])
}

const selectUserByEmail = async (email) => {
    return await pool.query('SELECT * FROM account WHERE email=$1', [email])
}

export { insertUser, selectUserByEmail }