module.exports = {
  title: 'HomeworkRegister',
  type: 'object',
  propertaries: {
    idProject: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    objectives: {
      type: 'number',
    },
    minimalCost: {
      type: 'number',
    },
    optimalCost: {
      type: 'number',
    },
    idTypeHomework: {
      type: 'number',
    },
  },
  required: ['idProject', 'name', 'objectives', 'description',
    'minimal_cost', 'optimal_cost', 'idTypeHomework'],
};
