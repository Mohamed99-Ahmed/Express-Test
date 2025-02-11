const fs = require('fs');

// Reading file of tours
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/reviews.json`, 'utf8'),
);

//start Crud operation
// Functions
// get All Rev
exports.getAllRev = (req, res) => {
  res.status(200).json({
    message: 'success',
    data: reviews,
  });
};
// create New Rev
exports.createNewRev = (req, res) => {
  const newReviewId = reviews[reviews.length - 1]._id + 1;
  const newReview = { _id: newReviewId, ...req.body };
  // Add newReview to file and then send it
  reviews.push(newReview);
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/reviews.json`,
    JSON.stringify(reviews),
  );
  res.status(200).json({
    message: 'seccess',
    createdAt: req.requestTime,
    data: {
      ...newReview,
    },
  });
};
//Get Specific Rev
exports.getSpRev = (req, res) => {
  const id = req.params.id; // Extract and  the id from req.params
  const review = reviews.find((review) => review._id === id); // Find the review with the specified id

  if (review) {
    res.status(200).json({
      message: 'success',
      data: {
        ...review,
      },
    });
  } else {
    res.status(404).json({
      message: 'Review not found',
    });
  }
};
//Update specific Rev
exports.updateSpRev = (req, res) => {
  const id = req.params.id;
  const updatedRev = reviews.find((rev) => rev._id === id);
  const numberRev = reviews.findIndex((rev) => rev._id === id);
  const newRev = Object.assign(updatedRev, req.body);
  // change in reviews array and file
  reviews.splice(numberRev, 0, newRev);
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/reviews.json`,
    JSON.stringify(reviews),
  );
  //
  if (updatedRev) {
    res.status(200).json({
      message: 'success',
      data: {
        ...newRev,
      },
    });
  } else {
    res.status(404).json({
      message: 'not found id of review',
    });
  }
};
//Delete specific Rev
exports.delteSpRev = (req, res) => {
  const id = req.params.id;
  const Rev = reviews.find((rev) => rev._id === id);
  const numberRev = reviews.findIndex((rev) => rev._id === id);
  reviews.splice(numberRev, 1);
  fs.writeFileSync(
    `${__dirname}/../dev-data/data/reviews.json`,
    JSON.stringify(reviews),
  );
  //
  if (Rev) {
    res.status(200).json({
      message: 'success',
      data: {
        reviews,
      },
    });
  } else {
    res.status(404).json({
      message: 'not found id of review',
    });
  }
};
