// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Dashboard = ({ projects, onOpenProject }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Projects</h2>
      <ul className="list-none p-0">
        {projects.map((project) => (
          <li key={project.id} className="mb-2">
            <div className="card shadow-lg p-4">
              <h3 className="text-xl">{project.title}</h3>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
              <button
                className="btn btn-primary mt-2"
                onClick={() => onOpenProject(project.id)}
              >
                Open Project
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Dashboard.propTypes = {
    projects: PropTypes.array.isRequired,
    onOpenProject: PropTypes.func.isRequired,
  };

export default Dashboard;
