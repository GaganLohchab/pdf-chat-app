import  { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [messages, setMessages] = useState([]);

  const fetchProjects = async () => {
    const response = await fetch('/api/projects');
    const data = await response.json();
    setProjects(data);
  };

  const handleCreateProject = async (formData) => {
    await fetch('/api/projects', {
      method: 'POST',
      body: formData,
    });
    fetchProjects();
  };

  const handleOpenProject = async (projectId) => {
    setCurrentProject(projectId);
    const response = await fetch(`/api/projects/${projectId}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  const handleSendMessage = async (projectId, message) => {
    await fetch(`/api/projects/${projectId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const response = await fetch(`/api/projects/${projectId}/messages`);
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {!currentProject ? (
        <>
          <ProjectForm onSubmit={handleCreateProject} />
          <Dashboard projects={projects} onOpenProject={handleOpenProject} />
        </>
      ) : (
        <ChatInterface
          projectId={currentProject}
          onSendMessage={handleSendMessage}
          messages={messages}
        />
      )}
    </div>
  );
};

export default App;
