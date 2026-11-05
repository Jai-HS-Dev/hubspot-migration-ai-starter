// Legacy input fixture only. Never deploy this callback-based handler on Node.js 24.
exports.main = async (event, callback) => {
  callback({ outputFields: { status: event.inputFields.ready ? 'READY' : 'NO_OP' } });
};
