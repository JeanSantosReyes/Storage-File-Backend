const { Router } = require('express');
const {
    upload,
    getListFiles,
    download,
    remove
} = require('../controller/file.controller.js');
const router = Router();

// Upload File
router.post('/upload', upload);

// Get All Files
router.get('/files', getListFiles);

// Download File
router.get('/files/:name', download);

// Delete File
router.delete('/files/:name', remove);

module.exports = router;