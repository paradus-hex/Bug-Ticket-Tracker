const tickets=[
  {
    "_id": "5c8a34ed14eb5c17645c9108",
    "description": "Cras mollis nisi parturient mi nec aliquet suspendisse sagittis eros condimentum scelerisque taciti mattis praesent feugiat eu nascetur a tincidunt",
    "rating": 5,
    "user": "5c8a1dfa2f8fb814b56fa181",
    "tags": "5c88fa8cf4afda39709c2955"
  },
  {
    "_id": "5c8a355b14eb5c17645c9109",
    "description": "Tempus curabitur faucibus auctor bibendum duis gravida tincidunt litora himenaeos facilisis vivamus vehicula potenti semper fusce suspendisse sagittis!",
    "rating": 4,
    "user": "5c8a1dfa2f8fb814b56fa181",
    "tags": "5c88fa8cf4afda39709c295a"
  },
  {
    "_id": "5c8a359914eb5c17645c910a",
    "description": "Convallis turpis porttitor sapien ad urna efficitur dui vivamus in praesent nulla hac non potenti!",
    "rating": 5,
    "user": "5c8a1dfa2f8fb814b56fa181",
    "tags": "5c88fa8cf4afda39709c295d"
  },
  {
    "_id": "5c8a35b614eb5c17645c910b",
    "description": "Habitasse scelerisque class quam primis convallis integer eros congue nulla proin nam faucibus parturient.",
    "rating": 4,
    "user": "5c8a1dfa2f8fb814b56fa181",
    "tags": "5c88fa8cf4afda39709c296c"
  },
]

exports.checkID = (req, res, next, val) => {
  console.log(`Ticket id is: ${val}`);

  if (req.params.id * 1 > tickets.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTickets = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tickets.length,
    data: {
      tickets
    }
  });
};

exports.getTicket = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const Ticket = tickets.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      Ticket
    }
  });
};

exports.createTicket = (req, res) => {
  // console.log(req.body);

  const newId = Tickets[tickets.length - 1].id + 1;
  const newTicket = Object.assign({ id: newId }, req.body);

  tickets.push(newTicket);
};

exports.updateTicket = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      Ticket: '<Updated Ticket here...>'
    }
  });
};

exports.deleteTicket = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};