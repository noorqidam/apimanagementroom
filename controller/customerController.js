const models = require('../models')
const customers = models.customers

exports.show = async (req, res) => {
  const result = await customers.findAll({
    order: [
      ['id', 'ASC']
    ]
  })
  res.send(result)
}

exports.detail = async (req, res) => {
  const customerId = req.params.customerId
  const result = await customers.findOne({ where: { id: customerId } })
  res.send(result)
}

exports.add = async (req, res) => {
  const result = await customers.create({
    name: req.body.name,
    id_card: req.body.id_card,
    phone_number: req.body.phone_number,
    image: req.file.path
  })
  res.send(result)
}

// exports.edit = async (req, res) => {
//   const customerId = req.params.customerId
//   const result = await customers.update({
//     name: req.body.name,
//     id_card: req.body.id_card,
//     phone_number: req.body.phone_number,
//     image: ((req.hasOwnProperty('file') == false) ? req.body.prevPic : req.file.path)
//   },
//     {
//       where: { id: customerId }
//     })
//   res.send({
//     status: 'success',
//     result: {
//       id: req.params.id,
//       name: req.body.name,
//       id_card: req.body.id_card,
//       phone_number: req.body.phone_number,
//       image: ((req.hasOwnProperty('file') == false) ? req.body.prevPic : req.file.path)
//     }
//   })
// } 

exports.edit = async (req, res) => {
  const customerId = req.params.customerId
  const result = await customers.update({
    name: req.body.name,
    id_card: req.body.id_card,
    phone_number: req.body.phone_number,
    image: req.body.image
  },
    {
      where: { id: customerId }
    })
  res.send({
    status: 'success',
    result: {
      id: req.params.id,
      name: req.body.name,
      id_card: req.body.id_card,
      phone_number: req.body.phone_number,
      image: req.body.image
    }
  })
}

exports.delete = async (req, res) => {
  const customerId = req.params.customerId
  try {
    const result = await customers.destroy({
      where: {
        id: customerId
      }
    })
    res.send({
      message: "delete success",
      result
    })
  }
  catch (error) {
    res.send(error)
  }
}