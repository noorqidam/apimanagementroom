const models = require('../models')
const customers = models.customers
const rooms = models.rooms
const orders = models.orders

exports.show = async (req, res) => {
  const room = await rooms.findAll({
    attributes: ['id', 'name'],
    order: [
      ['id', 'ASC']
    ]
  })
  res.send({
    data: room
  })
}

// exports.show = async (req, res) => {
//   const result = await customers.findAll({
//     order: [
//       ['id', 'ASC']
//     ]
//   })
//   res.send(result)
// }

exports.add = async (req, res) => {
  const data = req.body
  const result = await rooms.create({
    name: data.name,
    available: true
  })
  res.send(result)
}

exports.edit = async (req, res) => {
  const roomId = req.params.roomId
  const result = await rooms.update(req.body, { where: { id: roomId } })
  res.send(result)
}

exports.detail = async (req, res) => {
  const roomId = req.params.roomId
  const result = await rooms.findOne(
    {
      where: {
        id: roomId
      }
    }
  )
  res.send(result)
}

exports.delete = async (req, res) => {
  const roomId = req.params.roomId
  try {
    const result = await rooms.destroy({
      where: {
        id: roomId
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