/* eslint-disable no-console */
const router = require('express').Router();
const {
  addUser, getUserById, getUserByUserId, updateUser, getAllUsers,
} = require('../../database/helpers');


// gets all users
router.get('/', (req, res) => {
  getAllUsers()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
    });
  console.log('Grabbing all users');
});

router.get('/firebaseId/:id', (req, res) => {
  const { id } = req.params;
  getUserById(id)
    .then(result => res.send(result));
});

// gets user at specified id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  getUserByUserId(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});


// add user
router.post('/', (req, res) => {
  const user = req.body;
  console.log(`Adding user: ${user.displayName} to db`);
  addUser(user)
    .then(result => res.status(201).send(result));
});


// update user at specified firebase uid
router.put('/:uid', (req, res) => {
  const { uid } = req.params;
  const changes = req.body;
  updateUser(uid, changes)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.error(error);
    });
});


module.exports = router;
