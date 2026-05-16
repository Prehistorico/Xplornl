const sanitizeHtml = require('sanitize-html');

const cleanString = (value) => {

  if (typeof value !== 'string') return value;

  return sanitizeHtml(value.trim(), {
    allowedTags: [],
    allowedAttributes: {}
  });
};

const sanitizeArray = (arr) => {

  if (!Array.isArray(arr)) return arr;

  return arr.map(item => cleanString(item));
};

const sanitizePlace = (req, res, next) => {

  const body = req.body;

  body.name = cleanString(body.name);
  body.description = cleanString(body.description);
  body.zone = cleanString(body.zone);

  if (body.location) {
    body.location.address = cleanString(body.location.address);
  }

  if (body.schedule) {
    body.schedule.days = sanitizeArray(body.schedule.days);
    body.schedule.open = cleanString(body.schedule.open);
    body.schedule.close = cleanString(body.schedule.close);
  }

  if (body.contact) {
    body.contact.phone = cleanString(body.contact.phone);
    body.contact.website = cleanString(body.contact.website);
  }

  if (body.details) {

    body.details.spaceType = cleanString(body.details.spaceType);
    body.details.cost = cleanString(body.details.cost);
    body.details.parking = cleanString(body.details.parking);
    body.details.shops = cleanString(body.details.shops);
    body.details.restrooms = cleanString(body.details.restrooms);

    body.details.activities =
      sanitizeArray(body.details.activities);
  }

  if (body.transport) {
    body.transport.publicTransport =
      cleanString(body.transport.publicTransport);

    body.transport.car =
      cleanString(body.transport.car);
  }

  next();
};

module.exports = sanitizePlace;