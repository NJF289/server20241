import { pool } from "../shared/database";
import { Request, Response, Router } from "express";




export async function  deleteCourse (req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id
  try {
    const response = await client.query('delete from courses where id=$(id)');
    res.status(200).json("mensagem: registro excluio")
  } catch (error) {
    res.status(404).json("mensagem: ERROR")
  }finally{
    client.release()
  }
}

export async function listStudants(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const courses = await client.query(`select * from courses`)
    if (courses.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" });
    }
    return res.status(200).json(courses.rows);
  }catch(error){
    console.log(error)
  }finally{
    client.release;
  }
}

export async function saveStudants(req: Request, res: Response) {
  const client = await pool.connect();
  const courses = req.body;
  console.log(courses);
  try {
    const response = await client.query(
      `INSERT INTO courses (name) VALUES ('${courses.name}') RETURNING *`,
    );
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error});
  } finally {
    client.release();
  }
}
