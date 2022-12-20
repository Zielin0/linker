export default defineEventHandler(async (event) => {
  const { req } = event.node;
  if (req.method !== 'post') return {};

  const body = await readBody(event);
  return { body };
});
