module.exports = {
  title: 'Save Image',
  type: 'object',
  propertaries: {
    idDeliverie: {
      type: 'number',
    },
    urlPhoto: {
      type: 'string',
    },
  },
  required: ['idDeliverie', 'urlPhoto'],
};
