import { EventEntity } from '@paddle/paddle-node-sdk';
import { Prisma } from '@repo/database/index';
import { Request } from 'express';

declare module 'express' {
  // Inject additional properties on express.Request
  interface Request {
    session?: Prisma.SessionGetPayload<{
      include: {
        user: true;
      };
    }>;
    project?: Prisma.ProjectGetPayload<{}> | null;
  }
}

export interface RequestWithPaddle extends Request {
  eventEntity: EventEntity;
}
