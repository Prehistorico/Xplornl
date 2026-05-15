const pickPlaceFields = (body) => {

  const allowedFields = {};

  if (body.name !== undefined)
    allowedFields.name = body.name;

  if (body.description !== undefined)
    allowedFields.description = body.description;

  if (body.category !== undefined)
    allowedFields.category = body.category;

  if (body.zone !== undefined)
    allowedFields.zone = body.zone;

  if (body.location !== undefined)
    allowedFields.location = body.location;

  if (body.schedule !== undefined)
    allowedFields.schedule = body.schedule;

  if (body.contact !== undefined)
    allowedFields.contact = body.contact;

  if (body.details !== undefined)
    allowedFields.details = body.details;

  if (body.transport !== undefined)
    allowedFields.transport = body.transport;

  return allowedFields;
};

module.exports = pickPlaceFields;