import { ProjectProvider } from "@/provider/ProjectProvider";
import { withAuth } from "@workos-inc/authkit-nextjs";

async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await withAuth({ ensureSignedIn: true });

  return (
    <ProjectProvider>
      <div>
        <div className="h-16 flex justify-between">
          <div>{user.firstName}</div>
        </div>
        <div>{children}</div>
      </div>
    </ProjectProvider>
  );
}

export default Layout;
