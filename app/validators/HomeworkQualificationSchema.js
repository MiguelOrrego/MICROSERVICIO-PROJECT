module.exports = {
  title: 'QuilifictionHomeWork register',
  type: 'object',
  propertaries: {
    idUser: {
      type: 'number',
    },
    idHomework: {
      type: 'number',
    },
    stars: {
      type: 'number',
    },
  },
  required: ['idUser', 'idHomework', 'stars'],
};
