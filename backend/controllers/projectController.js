import { createProject, getProjects } from '../models/project';
import { uploadFileToS3 } from '../services/s3Service';
import { processPDFFile } from '../workers/pdfWorker';

const createProjectController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const file = req.file;

    // Upload file to S3
    const fileUrl = await uploadFileToS3(file);

    // Create project in database
    const project = await createProject(title, description, fileUrl);

    // Process the PDF file directly
    await processPDFFile(project.id, file.path);

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getProjectsController = async (req, res) => {
  try {
    const projects = await getProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { createProjectController, getProjectsController };
