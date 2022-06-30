module.exports = {
  title: 'ProjectRegister',
  type: 'object',
  propertaries: {
    project_id: {
      type: 'number',
    },
    title: {
      type: 'string',
    },
    idUser: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    qualification: {
      type: 'number',
    },
    targetAudience: {
      type: 'number',
    },
    minimalCost: {
      type: 'number',
    },
    optimalCost: {
      type: 'number',
    },
    process: {
      type: 'number',
    },
    state: {
      type: 'boolean',
    },
    location: {
      type: 'string',
    },
  },
  required: ['idUser', 'title', 'objectives', 'description', 'targetAudience',
    'minimal_cost', 'optimal_cost', 'location', 'process'],
};
