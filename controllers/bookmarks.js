const express = require('express');
const router = express.Router();

// import the bookmark model
const Bookmark = require('../models/bookmark');

// Index: GET all the bookmarks
router.get('/', (req, res, next) => {
	// 1. Get all of the bookmarks from the DB
	Bookmark.find({})
		.populate('owner')
		// 2. Send them back to the client as JSON
		.then((bookmarks) => res.json(bookmarks))
		// 3. If there's an error pass it on!
		.catch(next);
});

// Show: Get a Bookmark by ID
router.get('/:id', (req, res, next) => {
	// 1. Find the Bookmark by its unique ID
	Bookmark.findById(req.params.id)
		.populate('owner')
		// 2. Send it back to the client as JSON
		.then((bookmark) => res.json(bookmark))
		// 3. If there's an error pass it on!
		.catch(next);
});

// Create: Create a new resource in the DB and return it
router.post('/', (req, res, next) => {
	// 1. Use the data in the req body to create a new bookmark
	Bookmark.create(req.body)
		// 2. If the create is successful, send back the record that was inserted
		.then((bookmark) => res.json(bookmark))
		// 3. If there was an error, pass it on!
		.catch(next);
});

// Update: Update a resource in the DB and return the update
router.put('/:id', (req, res, next) => {
	// 1. Use the data in the req body to an existing bookmark
	Bookmark.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
		// 2. If the update is successful, send back the record that was inserted
		.then((bookmark) => res.json(bookmark))
		// 3. If there was an error, pass it on!
		.catch(next);
});

// Delete: Delete a resource in the DB

router.delete('/:id', (req, res, next) => {
	// 1. Find the resource to delete
	Bookmark.findOneAndDelete({ _id: req.params.id })
		// 2. If the delete is successful, send back the record that was inserted
		.then((bookmark) => res.json(bookmark))
		// 3. If there was an error, pass it on!
		.catch(next);
});

module.exports = router;
