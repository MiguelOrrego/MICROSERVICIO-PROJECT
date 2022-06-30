module.exports = {
  title: 'QualificationProject register',
  type: 'object',
  propertaries: {
    id: {
      type: 'number',
    },
    idUser: {
      type: 'number',
    },
    idProject: {
      type: 'number',
    },
    stars: {
      type: 'number',
    },
  },
  required: ['idUser', 'idProject', 'stars'],
};
