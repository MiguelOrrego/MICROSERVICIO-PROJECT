module.exports = {
  title: 'Rewards',
  type: 'object',
  propertaries: {
    idProjects: {
      type: 'number',
    },
    description: {
      type: 'number',
    },
    idTypeRewards: {
      type: 'number',
    },
    price: {
      type: 'number',
    },
  },
  required: ['idProjects', 'description', 'idTypeRewards', 'price'],
};
