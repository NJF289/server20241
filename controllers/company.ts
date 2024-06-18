import { pool } from "../shared/database";
import { Request, Response, Router } from "express";



export async function listCompany(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const companys  = await client.query(`select * from company`)
    if (companys.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" });
    }
    return res.status(200).json(companys.rows);
  }catch(error){
    console.log(error)
  }finally{
    client.release;
  }
}

export async function saveCompany(req: Request, res: Response) {
  const client = await pool.connect();
  const companys = req.body;
  console.log(companys);
  try {
    const response = await client.query(
      `insert INTO company (name, endereco) VALUES ('${companys.name}','${companys.endereco}' ) RETURNING *`,
    );
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error});
  } finally {
    client.release();
  }
}


