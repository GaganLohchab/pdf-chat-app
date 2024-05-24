import { processPDF } from '../services/pdfService';
import { updateProjectStatus } from '../models/project';

const processPDFFile = async (projectId, filePath) => {
  try {
    await processPDF(projectId, filePath);
    await updateProjectStatus(projectId, 'created');
  } catch (error) {
    console.error('Error processing PDF:', error);
    await updateProjectStatus(projectId, 'failed');
  }
};

export { processPDFFile };
