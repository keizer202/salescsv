export const csvFileFilter = (req, file, cb) => {
  const match = ['text/csv'];
  if (match.indexOf(file.mimetype) === -1) {
    return cb(null, false);
  }
  cb(null, true);
};
