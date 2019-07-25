var express = require('express');
var router = express.Router();

var queries = require('../db/validator_queries');


// *** GET all validators *** //
router.get('/validators', function(req, res, next) {
  queries.getAll()
  .then(function(validators) {
    res.status(200).json({status: "success",data:validators});
  })
  .catch(function(error) {
    next(error);
  });
});

// *** GET single validator *** //
router.get('/validator/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
  .then(function(validator) {
    res.status(200).json({status: "success",data:validator});
  })
  .catch(function(error) {
    next(error);
  });
});

// *** add validator *** //
router.post('/validator', function(req, res, next) {
  queries.add(req.body)
  .then(function(validatorId) {
    return queries.getSingle(validatorId);
  })
  .then(function(validator) {
    res.json(validator);
  })
  .catch(function(error) {
    next(error);
  });
});

// *** update validator *** //
router.put('/validator/:id', function(req, res, next) {
  if(req.body.hasOwnProperty('id')) {
    return res.status(422).json({
      error: 'You cannot update the id field',status: "fail"
    });
  }
  queries.update(req.params.id, req.body)
  .then(function() {
    return queries.getSingle(req.params.id);
  })
  .then(function(validator) {
    res.status(200).json({status: "success",data:validator});
  })
  .catch(function(error) {
    next(error);
  });
});

// *** delete validator *** //
router.delete('/validator/:id', function(req, res, next) {
  queries.getSingle(req.params.id)
  .then(function(validator) {
    queries.deleteItem(req.params.id)
    .then(function() {
      res.status(200).json(validator);
    })
    .catch(function(error) {
      next(error);
    });
  }).catch(function(error) {
    next(error);
  });
});


module.exports = router;