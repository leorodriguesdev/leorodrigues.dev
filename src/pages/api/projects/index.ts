import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Método GET para listar projetos
    try {
      const { data, error } = await supabase.from("projects").select("*");

      if (error) {
        return res.status(500).json({ error: "Erro ao buscar os projetos." });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "POST") {
    // Método POST para adicionar um novo projeto
    try {
      const { title, description, image, link } = req.body;

      if (!title || !description || !image || !link) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      }

      const { data, error } = await supabase
        .from("projects")
        .insert([{ title, description, image, link }]);

      if (error) {
        return res.status(500).json({ error: "Erro ao inserir o projeto." });
      }

      res.status(201).json({ message: "Projeto adicionado com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "DELETE") {
    // Método DELETE para remover um projeto
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório para deletar um registro." });
      }

      const { data, error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: "Erro ao deletar o projeto." });
      }

      // if (data.length === 0) {
      //   return res.status(404).json({ error: "Projeto não encontrado." });
      // }

      res.status(200).json({ message: "Projeto deletado com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "PUT") {
    // Método PUT para atualizar um projeto
    try {
      const { id } = req.query;
      const { title, description, image, link } = req.body;

      if (!id) {
        return res.status(400).json({ error: "ID é obrigatório para atualizar um registro." });
      }

      if (!title && !description && !image && !link) {
        return res.status(400).json({ error: "Pelo menos um dos campos deve ser fornecido para atualização." });
      }

      const updates: Record<string, any> = {};
      if (title) updates.title = title;
      if (description) updates.description = description;
      if (image) updates.image = image;
      if (link) updates.link = link;

      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: "Erro ao atualizar o projeto." });
      }

      // if (data.length === 0) {
      //   return res.status(404).json({ error: "Projeto não encontrado." });
      // }

      res.status(200).json({ message: "Projeto atualizado com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else {
    // Método não permitido
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}