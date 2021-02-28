const createModel = (sequelize, DataTypes) => {
  const ProfessionalType = sequelize.define('ProfessionalType', {
    description: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    situation: DataTypes.BOOLEAN
  }, {})

  return ProfessionalType
}

export default createModel