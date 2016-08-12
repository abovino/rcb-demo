'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Categories', [{
        name: 'Javascript',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'HTML',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'CSS',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Database',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  }
};
