import { PrismaClient } from '@prisma/client';
import {
  analyticsSeed,
  authProvidersSeed,
  emailSeed,
  emailProvidersSeed,
  paymentSeed,
  paymentProvidersSeed,
  reCaptchaSeed,
  projectSeed,
} from './data';

const prisma = new PrismaClient();

const main = async () => {
  const project = await prisma.project.upsert({
    where: {
      isActive: true,
    },
    create: {
      ...projectSeed,
      analytics: {
        create: analyticsSeed,
      },
      authProviders: {
        createMany: {
          data: authProvidersSeed,
          skipDuplicates: true,
        },
      },
      email: {
        create: {
          ...emailSeed,
          providers: {
            createMany: {
              data: emailProvidersSeed,
              skipDuplicates: true,
            },
          },
        },
      },
      payment: {
        create: {
          ...paymentSeed,
          providers: {
            createMany: {
              data: paymentProvidersSeed,
              skipDuplicates: true,
            },
          },
        },
      },
      reCaptcha: {
        create: reCaptchaSeed,
      },
    },
    update: {},
  });

  console.log(`${project.name} project successfully initialized!`);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
