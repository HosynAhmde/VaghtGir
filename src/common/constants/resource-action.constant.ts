export const Resource = {
  User:'user',
  Profile:'profile',
} as const;

export type Resource = (typeof Resource)[keyof typeof Resource];

export const Action = {
  Any: 'any',
  Create: 'create',
  Delete: 'delete',
  Read: 'read',
  Update: 'update',
} as const;

export type Action = (typeof Action)[keyof typeof Action];


