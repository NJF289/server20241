import { pool } from "../shared/database";
import { Request, Response, Router } from "express";


export async function  deleteStudants (req: Request, res: Response) {
  const client = await pool.connect();
  const id = req.params.id
  try {
    const response = await client.query('delete from studants where id=$(id)');
    res.status(200).json("mensagem: registro excluio")
  } catch (error) {
    res.status(404).json("mensagem: ERROR")
  }finally{
    client.release()
  }
}

export async function listStudant(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    const studants = await client.query(`select * from students`)
    if (studants.rowCount === 0) {
      return res.status(404).json({ message: "não encontrado" });
    }
    return res.status(200).json(studants.rows);
  }catch(error){
    console.log(error)
  }finally{
    client.release;
  }
}

export async function saveStudant(req: Request, res: Response) {
  const client = await pool.connect();
  const studant = req.body;
  console.log(studant);
  try {
    const response = await client.query(
      `insert INTO studants (name, email) VALUES ('${studant.name}','${studant.email}' ) RETURNING *`,
    );
    console.log(response.rows[0]);
    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos:', error});
  } finally {
    client.release();
  }
}


