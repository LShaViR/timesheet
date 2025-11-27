"use client";

import { useProject } from "@/provider/ProjectProvider";

function Page() {
  const { project, setProject } = useProject();

  return (
    <div className="h-full w-full">
      {project && (
        <>
          <div>{project.projectId}</div>
          <div>{project.projectName}</div>
        </>
      )}
      <div></div>
    </div>
  );
}

export default Page;
