"use client";

import { createContext, useContext, useState } from "react";

export const ProjectContext = createContext<{
  project: {
    projectId: string;
    projectName: string;
  } | null;
  setProject: any;
} | null>(null);

export const ProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [project, setProject] = useState<{
    projectId: string;
    projectName: string;
  } | null>(null);
  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
