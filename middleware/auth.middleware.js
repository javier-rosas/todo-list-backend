const jwt = require("jsonwebtoken");

const checkUserValidity = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
		try {
			const decoded = jwt.verify(req.token, process.env.JWT_SECRET)
			req.user = decoded
			next();
		} catch (error) {
			console.log(error)
			return res.status(401).send('Unauthorized');
		}
	} else {
		return res.status(401).send('Unauthorized');
	}
}

module.exports = {
  checkUserValidity
}