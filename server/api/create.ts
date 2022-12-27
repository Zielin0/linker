import prisma from '@/lib/db';
import { createError } from 'h3';

export default defineEventHandler(async (event) => {
  const { req } = event.node;
  if (req.method !== 'POST') {
    createError({
      statusCode: 405,
      statusMessage: `Method not allowed: ${req.method}`,
    });
  }

  const config = useRuntimeConfig();

  const { password, ...link } = await readBody(event);

  if (config.dbPassword !== password) {
    return {
      success: false,
      message: 'Cannot create Link. Invalid password',
      validPassword: false,
    };
  }

  try {
    await prisma.link.create({ data: { ...link } });
  } catch (err) {
    return {
      success: false,
      message: `Failed to create Link with alias '${link.alias}'.`,
      validPassword: true,
    };
  }

  await prisma.$disconnect();

  return {
    success: true,
    message: `Link with alias '${link.alias}' successfully created!`,
    validPassword: true,
  };
});
