const SUPPORTED_CLIENTS = ['mysql2', 'sqlite3', 'pg', 'mssql'];

function buildKnexConfig() {
  const client = process.env.DB_CLIENT || 'mysql2';

  if (!SUPPORTED_CLIENTS.includes(client)) {
    throw new Error(
      `Unsupported DB_CLIENT "${client}". Supported: ${SUPPORTED_CLIENTS.join(', ')}`
    );
  }

  if (client === 'sqlite3') {
    return {
      client: 'sqlite3',
      connection: {
        filename: process.env.DB_FILENAME || './dev.sqlite3',
      },
      useNullAsDefault: true,
    };
  }

  return {
    client,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    },
  };
}

module.exports = buildKnexConfig;
