//@ts-nocheck

import { prisma } from "@/lib/db";
import { handleAuth } from "@workos-inc/authkit-nextjs";
import { NextRequest } from "next/server";

export const GET = handleAuth({
  async onSuccess({ user, organizationId }) {
    const workosUserId = user.id;

    // 1. Sync user
    let localUser = await prisma.user.upsert({
      where: { providerUserId: workosUserId },
      update: {},
      create: { providerUserId: workosUserId },
    });

    // 2. Sync org + membership
    let localOrg = null;
    if (organizationId) {
      localOrg = await prisma.organization.upsert({
        where: { providerOrgId: organizationId },
        update: {},
        create: { providerOrgId: organizationId },
      });

      await prisma.organizationMember.upsert({
        where: {
          userId_organizationId: {
            userId: localUser.id,
            organizationId: localOrg.id,
          },
        },
        update: {},
        create: {
          userId: localUser.id,
          organizationId: localOrg.id,
          role: "member",
        },
      });
    }

    // 3. Create your own session
    const jwt = sign(
      {
        userId: localUser.id,
        workosUserId,
        orgs: localOrg ? [{ orgId: localOrg.id }] : [],
      },
      process.env.APP_SESSION_SECRET,
      { expiresIn: "12h" },
    );

    // 4. Attach cookie to response
    return {
      cookies: {
        app_session: {
          value: jwt,
          options: {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
          },
        },
      },
    };
  },
});
