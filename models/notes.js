'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    content: DataTypes.TEXT
  }, {});
  Notes.associate = function(models) {
    // associations can be defined here
  };
  return Notes;
};