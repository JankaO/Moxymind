export const PASSWORD = 'secret_sauce';

export const USERS = {
  standard: 'standard_user',
  locked: 'locked_out_user',
  problem: 'problem_user',
  performance: 'performance_glitch_user',
  error: 'error_user',
  visual: 'visual_user',
} as const;

export const LOGIN_OK_USERS = [
  USERS.standard,
  USERS.problem,
  USERS.performance,
  USERS.error,
  USERS.visual,
] as const;