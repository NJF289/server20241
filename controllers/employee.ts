import { pool } from "../shared/database";
import { Request, Response, Router } from "express";



export async function listEmployees(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const employees  = await client.query(`select * from employees`)
    if (employees.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" });
    }
    return res.status(200).json(employees.rows);
  }catch(error){
    console.log(error)
  }finally{
    client.release;
  }
}

export async function saveEmployees(req: Request, res: Response) {
  const client = await pool.connect();
  const employees = req.body;
  console.log(employees);
  try {
    const response = await client.query(
      `insert INTO employees (name, email) VALUES ('${employees.name}','${employees.email}' ) RETURNING *`,
    );
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error});
  } finally {
    client.release();
  }
}


