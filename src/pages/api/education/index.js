/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */

// src/pages/api/education/index.js


import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Método GET para obter os dados
    try {
      const { data, error } = await supabase.from("education").select("*");

      if (error) {
        return res.status(500).json({ error: "Erro ao buscar os dados." });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "POST") {
    // Método POST para adicionar novos registros
    try {
      const { title, institution, year, description } = req.body;

      if (!title || !institution || !year || !description) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      const { data, error } = await supabase
        .from("education")
        .insert([{ title, institution, year, description }]);

      if (error) {
        return res.status(500).json({ error: "Erro ao inserir os dados." });
      }

      res.status(201).json({ message: "Registro inserido com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "DELETE") {
    // Método DELETE para remover registros
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório para deletar um registro." });
      }

      const { data, error } = await supabase
        .from("education")
        .delete()
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: "Erro ao deletar o registro." });
      }

      res.status(200).json({ message: "Registro deletado com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "PUT") {
    // Método PUT para atualizar registros
    try {
      const { id } = req.query;
      const { title, institution, year, description } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório para atualizar um registro." });
      }

      const updates = {};
      if (title) updates.title = title;
      if (institution) updates.institution = institution;
      if (year) updates.year = year;
      if (description) updates.description = description;

      const { data, error } = await supabase
        .from("education")
        .update(updates)
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: "Erro ao atualizar o registro." });
      }

      res.status(200).json({ message: "Registro atualizado com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else {
    // Caso o método não seja GET, POST, DELETE ou PUT
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
