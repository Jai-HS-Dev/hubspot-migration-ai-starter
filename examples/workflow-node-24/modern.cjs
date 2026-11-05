// Synthetic handler contract; a real workflow runtime change is a separate operation.
exports.main = async (event) => {
  return { outputFields: { status: event.inputFields.ready ? 'READY' : 'NO_OP' } };
};
