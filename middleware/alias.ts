import prisma from '@/lib/db';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware(async (to, _from) => {
  const link = await prisma.link.findFirst({
    where: {
      alias: to.params.alias[0],
    },
  });

  if (link === null) {
    return createError({
      statusCode: 404,
      statusMessage: `Page not found: /${to.params.alias[0]}`,
    });
  }

  prisma.$disconnect();

  return navigateTo(link.original, { external: true, redirectCode: 301 });
});
