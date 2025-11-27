import { ProjectProvider } from "@/provider/ProjectProvider";
import { withAuth } from "@workos-inc/authkit-nextjs";

async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <ProjectProvider>
      <div className="h-16 flex justify-between pl-2 pt-4">
        <div className="text-lg font-bold">{user.firstName}</div>
      </div>
      <div>{children}</div>
    </ProjectProvider>
  );
}

export default Layout;
