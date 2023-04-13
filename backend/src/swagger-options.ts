//Swagger Configuration
export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Github Profile API with Swagger',
      version: '0.1.0',
      description:
        'Show Github profile with repos, Github OAuth app',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'memoryInject',
        url: 'https://www.memoryinject.io',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/api/v1',
      },
    ],
    tags: [
      { name: 'user', description: 'Operations about user' },
      { name: 'auth', description: 'Operations about auth' },
    ],
    components: {
      securutySchemas: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'session',
        },
      },
      schemas: {
        Profile: {
          type: 'object',
          properties: {
            login: {
              type: 'string',
              example: 'memoryInject',
            },
            avatarUrl: {
              type: 'string',
              example: 'https://github.com/user/avatar',
            },
            htmlUrl: {
              type: 'string',
              example: 'https://github.com/memoryInject',
            },
            name: {
              type: 'string',
              example: 'Mahesh MS',
            },
            email: {
              type: 'string',
              example: 'someone@email.com',
            },
            bio: {
              type: 'string',
              example: 'full-stack developer'
            },
            publicRepos: {
              type: 'integer',
              example: 12,
            },
            privateRepos: {
              type: 'integer',
              example: 0
            }
          },
        },
        Repo: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'project1',
            },
            fullName: {
              type: 'string',
              example: 'foo/project1',
            },
            description: {
              type: 'string',
              example: 'cuda ninja',
            },
            private: {
              type: 'boolean',
              example: false,
            },
            language: {
              type: 'string',
              example: 'CUDA',
            },
            followers: {
              type: 'integer',
              example: 1,
            },
          },
        },
      },
    },
    security: [{ cookieAuth: [] }],
  },
  apis: ['src/controllers/*.ts'],
};

