const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Simple Wallet API',
    version: '1.0.0',
    description: 'A simple fintech wallet backend',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      LoginDto: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'aA!12345678',
          },
        },
      },
      CreateAccountDto: {
        type: 'object',
        required: [
          'firstname',
          'lastname',
          'email',
          'password',
          'nid',
          'nid_expire_date',
          'government',
          'city',
          'address',
        ],
        properties: {
          firstname: { type: 'string', example: 'John' },
          lastname: { type: 'string', example: 'Doe' },
          email: {
            type: 'string',
            format: 'email',
            example: 'user@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'password123',
          },
          nid: { type: 'string', example: '1234567890123456' },
          nid_expire_date: { type: 'string', example: '01/2023' },
          government: { type: 'string', example: 'Government' },
          city: { type: 'string', example: 'City' },
          address: { type: 'string', example: 'Address' },
          job: { type: 'string', example: 'Job' },
        },
      },
      Account: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '123456' },
          email: { type: 'string', example: 'user@example.com' },
          firstname: { type: 'string', example: 'John' },
          lastname: { type: 'string', example: 'Doe' },
          nid: { type: 'string', example: '1234567890123456' },
          nid_expire_date: { type: 'string', example: '01/2023' },
          government: { type: 'string', example: 'Government' },
          city: { type: 'string', example: 'City' },
          address: { type: 'string', example: 'Address' },
          job: { type: 'string', example: 'Job' },
        },
      },
      CreateTransactionDto: {
        type: 'object',
        required: ['amount'],
        properties: {
          amount: { type: 'number', example: 100 },
        },
      },
      Transaction: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '123456' },
          amount: { type: 'number', example: 100 },
          type: { type: 'string', example: 'withdraw' },
          createdAt: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
        },
      },
    },
  },
};

export default swaggerDef;
