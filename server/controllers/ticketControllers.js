
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