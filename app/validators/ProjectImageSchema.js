module.exports = {
  title: 'Save Image',
  type: 'object',
  propertaries: {
    idProject: {
      type: 'number',
    },
    urlPhoto: {
      type: 'array',
    },
  },
  required: ['idProject', 'urlPhoto'],
};
