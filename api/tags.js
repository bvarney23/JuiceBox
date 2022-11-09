const express = require('express');
const tagRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagRouter.use((req, res, next) => {
    console.log("A request is being made to /alltas");

    next();
}) 

tagRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    })
});

tagRouter.get('/:tagName/posts', async (req, res, next) => {
    const tagName = req.params.tagName
    try {
        const posts = await getPostsByTagName(tagName);
        res.send({posts})
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = tagRouter