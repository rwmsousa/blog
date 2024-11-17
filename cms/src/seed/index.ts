import type { Payload } from 'payload';

export const seed = async (payload: Payload): Promise<void> => {
  const user = await payload.find({
    collection: 'usuarios',
    where: {
      email: { equals: process.env.PAYLOAD_USER_ADMIN },
    },
  });

  payload.logger.info(`----> Checking if admin exists: ${user.docs.length}`);

  if (!user.docs.length) {
    payload.logger.info('----> Running seed');
    
    await payload.create({
      collection: 'usuarios',
      data: {
        email: process.env.PAYLOAD_USER_ADMIN,
        password: process.env.PAYLOAD_PASSWORD_ADMIN,
        enableAPIKey: true,
        name: 'Tech',
        lastname: 'Hype',
        roles: ['admin'],
      },
    });
  }
};
