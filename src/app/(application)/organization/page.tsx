"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function OrganizationPage({ orgId }: { orgId: string }) {
  const [org, setOrg] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [o, m, t, p] = await Promise.all([
          axios.get(`/api/organization/${orgId}`),
          axios.get(`/api/organization/${orgId}/members`),
          axios.get(`/api/organization/${orgId}/teams`),
          axios.get(`/api/organization/${orgId}/projects`),
        ]);

        setOrg(o.data);
        setMembers(m.data);
        setTeams(t.data);
        setProjects(p.data);
      } catch (err) {
        console.error("Failed to load organization info", err);
      }
    }

    load();
  }, [orgId]);
  if (!org) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{org.name}</h1>
      <p className="text-sm opacity-70">{org.description}</p>

      <Tabs defaultValue="members" className="w-full mt-6">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4">
          <table className="w-full text-sm border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} className="border-b">
                  <td className="p-2">{m.displayName}</td>
                  <td className="p-2">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="teams" className="mt-4">
          <table className="w-full text-sm border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Team Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t) => (
                <tr key={t.id} className="border-b">
                  <td className="p-2">{t.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <table className="w-full text-sm border">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="p-2">Project ID</th>
                <th className="p-2">Team</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.team?.name ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
      </Tabs>
    </div>
  );
}
