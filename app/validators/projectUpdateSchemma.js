module.exports = {
  title: 'ProjectRegister',
  type: 'object',
  propertaries: {
    title: {
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
  required: ['title', 'objectives', 'description', 'targetAudience',
    'minimal_cost', 'optimal_cost', 'location', 'process'],
};
