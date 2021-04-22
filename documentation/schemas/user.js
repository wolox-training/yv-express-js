module.exports = {
  id: {
    type: 'integer',
    description: 'Unique and auto-increment user ID',
    example: 7
  },
  name: {
    type: 'string',
    description: 'User name',
    example: 'tom99'
  },
  lastName: {
    type: 'string',
    description: 'User lastName',
    example: 'thompson'
  },
  mail: {
    type: 'string',
    description: 'User email',
    example: 'tom.thompson@wolox.co'
  },
  password: {
    type: 'string',
    description: 'User password',
    example: 'MyPassword123'
  },
  NewUser: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      mail: {
        $ref: '#/components/schemas/mail'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  User: {
    type: 'object',
    properties: {
      id: {
        $ref: '#/components/schemas/id'
      },
      name: {
        $ref: '#/components/schemas/name'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      mail: {
        $ref: '#/components/schemas/mail'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
