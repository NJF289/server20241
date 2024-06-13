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

export async function listStudants(req: Request, res: Response) {
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  const studants = await client.query(`select * from studants`)
  //retorna consulta em formato json
  return res.status(200).json(studants.rows);
}
export async function saveStudants(req: Request, res: Response) {
  const studants = req.body;
  console.log(studants)
  //conecta com o banco
  const client = await pool.connect();
  //realiza consulta sql
  const response = await client.query(`INSERT INTO studants (name, email) VALUES ('${studants.name}','${studants.email}')`)
  res.status(201).json(response.rows);
}



