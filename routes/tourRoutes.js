// ruquires

const express = require('express');
const router = express.Router(); // router instead of app
const {
  getAllRev,
  createNewRev,
  getSpRev,
  updateSpRev,
  delteSpRev,
} = require('../Controller/tourController');

// cheker body miiddleWare
const checkerBody = (req, res, next) => {
  if (!req.body.review || !req.body.rating) {
    res.status(404).json({
      message: 'you should wiret reviuw and raiting in body request',
    });
  }
  next();
};
//  start routes
router.route('/').get(getAllRev).post(checkerBody, createNewRev);
router
  .route('/:id')
  .get(getSpRev)
  .patch(checkerBody, updateSpRev)
  .delete(delteSpRev);
module.exports = router;
