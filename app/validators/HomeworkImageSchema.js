module.exports = {
  title: 'Save Image',
  type: 'object',
  propertaries: {
    idHomework: {
      type: 'number',
    },
    urlPhoto: {
      type: 'array',
    },
  },
  required: ['idHomework', 'urlPhoto'],
};
