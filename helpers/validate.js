const validator = require("validator");

const check = (email, password) => {
  const checkMail = validator.isEmail(email);
  const checkPass = password.length > 5;
  if (checkMail && checkPass) {
    return true;
  }
  return false;
};

module.exports = check;
