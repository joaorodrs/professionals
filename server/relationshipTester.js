import models from './src/app/models/index.js'

const ProfessionalType = models.ProfessionalType
const Professional = models.Professional

// ProfessionalType.sync().then(() => {
//   ProfessionalType.create({
//     description: 'Algum trabalho',
//     situation: true,
//     phoneNumber: '123456789'
//   }).then(newProfessionalType => {
//     console.log(newProfessionalType.get())
//   }).catch(err => {
//     console.log('Error creating professional type: ', err)
//   })
// })

// Professional.sync().then(() => {
//   Professional.bulkCreate([
//     {
//       name: 'João Paulo', phoneNumber: '123456789', email: 'joaopaulo@gmail.com', professionalType: 'Algum trabalho', situation: true
//     },
//     {
//       name: 'Pedro Alencar', phoneNumber: '987654321', email: 'pedro@gmail.com', professionalType: 'Algum trabalho', situation: true
//     },
//     {
//       name: 'Alguma pessoa n sei quem', phoneNumber: '123123123', email: 'someone@gmail.com', professionalType: 'Algum trabalho', situation: true
//     },
//   ]).then(newProfessional => {
//     console.log(newProfessional)
//   }).catch(err => console.log('Error creating professionals: ', err))
// })

Professional.findOne({
  where: { email: 'joaopaulo@gmail.com' }, include: 'professional_type'
}).then(foundProfession => console.log(foundProfession))
.catch(err => console.log('ERROR: ', err))