import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Método GET para listar experiências
    try {
      const { data, error } = await supabase.from("experiences").select("*");

      if (error) {
        return res.status(500).json({ error: "Erro ao buscar os dados." });
      }

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "POST") {
    // Método POST para adicionar uma nova experiência
    try {
      const { title, duration, description, achievements } = req.body;

      if (!title || !duration || !description || !achievements) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios." });
      }

      const { data, error } = await supabase
        .from("experiences")
        .insert([{ title, duration, description, achievements }]);

      if (error) {
        return res.status(500).json({ error: "Erro ao inserir os dados." });
      }

      res
        .status(201)
        .json({ message: "Experiência adicionada com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "DELETE") {
    // Método DELETE para remover uma experiência
    try {
      const { id } = req.query;

      if (!id) {
        return res
          .status(400)
          .json({ error: "ID é obrigatório para deletar um registro." });
      }

      const { data, error } = await supabase
        .from("experiences")
        .delete()
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: "Erro ao deletar o registro." });
      }

      res
        .status(200)
        .json({ message: "Experiência deletada com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else if (req.method === "PUT") {
    // Método PUT para atualizar uma experiência
    try {
      const { id } = req.query;
      const { title, duration, description, achievements } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ error: "ID é obrigatório para atualizar um registro." });
      }

      const updates = {};
      if (title) updates.title = title;
      if (duration) updates.duration = duration;
      if (description) updates.description = description;
      if (achievements) updates.achievements = achievements;

      const { data, error } = await supabase
        .from("experiences")
        .update(updates)
        .eq("id", id);

      if (error) {
        return res.status(500).json({ error: "Erro ao atualizar o registro." });
      }

      res
        .status(200)
        .json({ message: "Experiência atualizada com sucesso.", data });
    } catch (error) {
      res.status(500).json({ error: "Erro interno do servidor." });
    }
  } else {
    // Caso o método não seja GET, POST, DELETE ou PUT
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
