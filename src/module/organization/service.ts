import { prisma } from "@/lib/db";

export const OrganizationService = {
  create: (data: { name: string; description?: string }) =>
    prisma.organization.create({ data }),

  get: (id: string) => prisma.organization.findUnique({ where: { id } }),

  list: () => prisma.organization.findMany(),

  update: (id: string, data: Partial<{ name: string; description?: string }>) =>
    prisma.organization.update({ where: { id }, data }),

  delete: (id: string) => prisma.organization.delete({ where: { id } }),
};

export const UserService = {
  get: (id: string) => prisma.tMember.findUnique({ where: { id } }),

  list: (teamId?: string) =>
    prisma.tMember.findMany({ where: teamId ? { teamId } : {} }),

  update: (
    id: string,
    data: Partial<{ userId: string; teamId: string; role: string }>,
  ) => prisma.tMember.update({ where: { id }, data }),

  delete: (id: string) => prisma.tMember.delete({ where: { id } }),
};

// -----------------------
// PROJECT CRUD
// -----------------------
export const ProjectService = {
  create: (data: { teamId?: string; orgId: string }) =>
    prisma.project.create({ data }),

  get: (id: string) => prisma.project.findUnique({ where: { id } }),

  list: (orgId?: string) =>
    prisma.project.findMany({ where: orgId ? { orgId } : {} }),

  update: (id: string, data: Partial<{ teamId?: string; orgId: string }>) =>
    prisma.project.update({ where: { id }, data }),

  delete: (id: string) => prisma.project.delete({ where: { id } }),
};

// -----------------------
// TIMESHEET CRUD
// -----------------------
export const TimesheetService = {
  create: (data: {
    projectId: string;
    userId: string;
    monday_duration?: number;
    tuesday_duration?: number;
    wednesday_duration?: number;
    thursday_duration?: number;
    friday_duration?: number;
    saturday_duration?: number;
    sunday_duration?: number;
  }) => prisma.timesheet.create({ data }),

  get: (id: string) => prisma.timesheet.findUnique({ where: { id } }),

  list: (userId?: string) =>
    prisma.timesheet.findMany({ where: userId ? { userId } : {} }),

  update: (
    id: string,
    data: Partial<{
      status: any;
      monday_duration?: number;
      tuesday_duration?: number;
      wednesday_duration?: number;
      thursday_duration?: number;
      friday_duration?: number;
      saturday_duration?: number;
      sunday_duration?: number;
    }>,
  ) => prisma.timesheet.update({ where: { id }, data }),

  delete: (id: string) => prisma.timesheet.delete({ where: { id } }),
};
