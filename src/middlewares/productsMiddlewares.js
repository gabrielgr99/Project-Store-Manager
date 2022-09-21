const isValidId = (req, res, next) => {
  if (!Number(req.params.id)) {
    return res.status(404).json({ message: 'ID invalid' });
  }

  next();
};

const isValidBody = (req, res, next) => {
  if (!('name' in req.body)) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (req.body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  
  if ((Object.keys(req.body).length !== 1)) {
    return res.status(400).json({ message: 'Body invalid' });
  }

  next();
};

module.exports = {
  isValidId,
  isValidBody,
};