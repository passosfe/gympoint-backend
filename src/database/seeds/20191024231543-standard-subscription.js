'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'subscriptions',
      [
        {
          title: 'Start',
          duration: 1,
          price: 129.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          duration: 3,
          price: 109.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamond',
          duration: 6,
          price: 89.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('subscriptions', null, {});
  },
};