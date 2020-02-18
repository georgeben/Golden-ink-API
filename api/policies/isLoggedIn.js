

module.exports = async function (req, res, proceed) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.unauthorized();
  }
  try {
    const requestToken = authorizationHeader.split('Bearer').pop().trim();
    const payload = await sails.helpers.decodeAuthToken(requestToken);
    const user = await Users.findOne({
      id: payload.id
    });
    if (!user) {
      return res.unauthorized();
    }
    req.user = user;
    return proceed();
  } catch (error) {
    console.log(error);
    switch (error.name) {
      case 'JsonWebTokenError':
        return res.unauthorized();
      case 'TokenExpiredError':
        return res.unauthorized();
      default:
        return res.serverError();
    }
  }
};
