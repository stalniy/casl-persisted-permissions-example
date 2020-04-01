export const development = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './blog.dev.sqlite3'
  }
};

export const production = {
  ...development,
  connection: {
    filename: './blog.prod.sqlite3'
  }
};
