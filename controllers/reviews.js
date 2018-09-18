const Review = require('../models/review');

module.exports = function(app) {

// ADD
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
  })
  
  // EDIT
app.get('/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
      res.render('reviews-edit', {review: review});
    })
  })
  
  // SHOW
  app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      res.render('reviews-show', { review: review })
    }).catch((err) => {
      console.log(err.message);
    })
  })
  
  // UPDATE
  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })
  
  // DELETE
  app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
  
  // VIEW DETAIL
  app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((review) => {
            res.redirect(`/reviews/${review._id}`);
        })
        .catch((err) => {
            console.log(err.message)
    })
  });

}