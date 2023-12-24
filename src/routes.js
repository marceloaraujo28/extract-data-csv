import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title.trim() || !description.trim()) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ error: "Verifique se algum campo está vazio!" })
          );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title.trim() || !description.trim()) {
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ error: "Verifique se algum campo está vazio!" })
          );
      }
      const { id } = req.params;

      const task = {
        title,
        description,
      };

      const update = database.update("tasks", id, task);

      if (!update)
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "ID não encontrado!" }));

      res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const deleteTask = database.delete("tasks", id);

      if (!deleteTask)
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "ID não encontrado!" }));

      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const update = database.updateCompleted("tasks", id);

      if (!update)
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "ID não encontrado!" }));

      return res.writeHead(204).end();
    },
  },
];
