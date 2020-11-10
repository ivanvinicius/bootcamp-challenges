const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');
const app = express();
const repositories = [];

app.use(express.json());
app.use(cors());


app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(newRepo);

  return response.json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex === -1 ) {
    return response.status(400).json({ error: 'Repository does not exists' })
  }

  const update = {
    id:  repositories[repoIndex].id,
    title,
    url, 
    techs,
    likes: repositories[repoIndex].likes,
  }

  repositories[repoIndex] = update;

  return response.json(update);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } =  request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex === -1) {
    return response.status(400).json({error: 'Repository does not exists.'})
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

  const repoIndex = repositories.findIndex(repo => repo.id === id);

  if(repoIndex === -1) {
    return response.status(400).json({error: 'Repository does not exists.'})
  } 

  repositories[repoIndex].likes++;

  return response.json(repositories[repoIndex]);
});

module.exports = app;
