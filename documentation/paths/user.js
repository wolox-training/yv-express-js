module.exports = {
  '/users': {
    post: {
      tags: ['USER operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/NewUser'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'User [NAME] has been created succesfully'
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Name is required',
                internal_code: 'invalid_parameters'
              }
            }
          }
        }
      }
    }
  }
};
