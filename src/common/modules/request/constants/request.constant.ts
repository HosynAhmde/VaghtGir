export const RequestMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
};

export type RequestMethods =
  (typeof RequestMethods)[keyof typeof RequestMethods];
