module.exports = {
  title: 'Qualification Deliverie',
  type: 'object',
  propertaries: {
    id: {
      type: 'number',
    },
    idUser: {
      type: 'number',
    },
    idDeliverie: {
      type: 'number',
    },
    starts: {
      type: 'number',
    },
  },
  required: ['idUser', 'idDeliverie'],
};
