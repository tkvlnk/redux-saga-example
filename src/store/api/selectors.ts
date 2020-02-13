import { AppSelector } from '../types';

// eslint-disable-next-line import/prefer-default-export
export const isNetworkActive: AppSelector<boolean> = state =>
  state.api.pendingRequests > 0;
