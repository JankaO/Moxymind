export interface CreateUserPayload {
  name: string;
  job: string;
}

export const createUsers: CreateUserPayload[] = [
  { name: 'morpheus', job: 'leader' },
];
