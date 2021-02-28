const createModel = (sequelize, DataTypes) => {
  const Professional = sequelize.define('Professional', {
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    professionalType: DataTypes.STRING,
    situation: DataTypes.BOOLEAN
  }, {})
  Professional.associate = model => {
    Professional.belongsTo(models.ProfessionalType, { foreignKey: 'professionalType', as: 'professionalType' })
  }
  return Professional
}
export default createModel