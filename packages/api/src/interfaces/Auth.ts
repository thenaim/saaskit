import { User } from '@repo/database/index';

import { ActionStatus } from './Common';

export interface AuthState {
  user: User | null;
  status: ActionStatus;
}
