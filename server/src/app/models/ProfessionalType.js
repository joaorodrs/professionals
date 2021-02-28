const createModel = (sequelize, DataTypes) => {
  const ProfessionalType = sequelize.define('ProfessionalType', {
    description: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    situation: DataTypes.BOOLEAN
  }, {});
  ProfessionalType.associate = function(models) {
    // associations can be defined here
  };
  return ProfessionalType;
};
export default createModel;