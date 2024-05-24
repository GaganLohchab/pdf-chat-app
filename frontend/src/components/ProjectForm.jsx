import { useState } from 'react';
import PropTypes from 'prop-types';

const ProjectForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    onSubmit(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Create Project
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label font-semibold text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered input-primary w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-control mb-6">
            <label className="label font-semibold text-gray-700">
              Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-control mb-6">
            <label className="label font-semibold text-gray-700">
              Upload PDF
            </label>
            <input
              type="file"
              className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-gradient-to-l hover:scale-105 transition-all duration-300"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectForm;