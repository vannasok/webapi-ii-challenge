const express = require('express');
const db = require('../data/db.js');
const router = express.Router();

router.get('/', (req, res) => {
   db.find()
      .then(allPosts => res.status(200).json(allPosts))
      .catch(err => {
         console.log(err);
         res.status(500).json({ error: 'Could Not Find Posts' });
      });
});

router.get('/:id', (req, res) => {
   db.findById(req.params.id)
      .then(post => {
         res.status(200).json(post);
      })
      .catch(error => {
         console.log(error);
         res.status(500).json({
            message: 'Error retrieving post'
         });
      });
});

router.get('/:id/comments', (req, res) => {
   const { id } = req.params;
   db.findPostComments(id)
      .then(comment => {
         res.status(200).json(comment);
      })
      .catch(err => {
         res.status(500).json({ error: 'Error finding post comment' });
      });
});

router.post('/', (req, res) => {
   const { title, contents } = req.body;
   if (title && contents) {
      db.insert({ title, contents }).then(({ id }) => {
         db.findById(id).then(([post]) => {
            res.status(200).json(post);
         });
      });
   } else {
      res.status(400).json({ error: 'title and contents are required' });
   }
});

router.put('/:id', (req, res) => {
   const { title, contents } = req.body;
   const { id } = req.params;

   if (title && contents) {
      db.update(id, { title, contents }).then(({ id }) => {
         db.findById(id).then(([post]) => {
            res.status(200).json(post);
         });
      });
   } else {
      res.status(400).json({ error: 'title and contents are required' });
   }
});

router.delete('/:id', (req, res) => {
   const { id } = req.params;
   db.remove(id)
      .then(removed => {
         if (removed) {
            res.status(200).json({ message: 'post deleted.' });
         } else {
            res.status(404).json({ error: 'Post was not found' });
         }
      })
      .catch(err => {
         res.status(500).json({ error: 'Could not delete post' });
      });
});

module.exports = router;
