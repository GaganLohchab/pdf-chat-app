import pool from '../db';

const createProject = async (title, description, fileUrl) => {
  const result = await pool.query(
    'INSERT INTO projects (title, description, file_url, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, description, fileUrl, 'creating']
  );
  return result.rows[0];
};

const getProjects = async () => {
  const result = await pool.query('SELECT * FROM projects');
  return result.rows;
};

const updateProjectStatus = async (projectId, status) => {
  await pool.query(
    'UPDATE projects SET status = $1 WHERE id = $2',
    [status, projectId]
  );
};

const saveEmbeddingsToDatabase = async (projectId, embeddings) => {
  // Assuming there's a table 'embeddings' with project_id and embedding columns
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const deleteQuery = 'DELETE FROM embeddings WHERE project_id = $1';
    await client.query(deleteQuery, [projectId]);

    const insertQuery = 'INSERT INTO embeddings (project_id, embedding) VALUES ($1, $2)';
    for (const embedding of embeddings) {
      await client.query(insertQuery, [projectId, embedding]);
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export {
  createProject,
  getProjects,
  updateProjectStatus,
  saveEmbeddingsToDatabase,
};
