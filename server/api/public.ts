import prisma from '@/lib/db';

export default defineEventHandler(async (event) => {
  const { req } = event.node;
  if (req.method !== 'GET') {
    createError({
      statusCode: 405,
      statusMessage: `Method not allowed: ${req.method}`,
    });
  }

  const links = await prisma.link.findMany({
    where: {
      public: true,
    },
  });

  if (links.length <= 0) {
    return {
      success: false,
      message: 'There are no Links in database.',
    };
  }

  prisma.$disconnect();

  return { success: true, links };
});
