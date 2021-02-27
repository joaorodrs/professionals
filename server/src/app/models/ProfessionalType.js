export default (sequelize, DataTypes) => {
  const ProfessionalType = sequelize.define("ProfessionalType", {
    description: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    situation: DataTypes.BOOLEAN
  })

  return ProfessionalType
}