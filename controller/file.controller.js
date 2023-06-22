const { response, request } = require('express');
const uploadFile = require('../middleware/upload');
const fs = require('fs');

const upload = async (req = request, res = response) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: 'Please upload a file!' });
        }

        res.status(200).send({
            message: 'Uploaded the file successfully: ' + req.file.originalname,
        });
    } catch (err) {
        if (err.code == 'LIMIT_FILE_SIZE') {
            return res.status(500).send({
                message: 'File size cannot be larger than 2MB!',
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};

const getListFiles = (req, res = response) => {
    const directoryPath = __basedir + '/resources/static/assets/uploads/';

    try {
        const files = fs.readdirSync(directoryPath);

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: process.env.baseUrl + file
            })
        });

        res.status(200).send(fileInfos);
    } catch (err) {
        res.status(500).send({
            message: 'Unable to scan files!',
            error: err
        });
    }
};

const download = (req = request, res = response) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + '/resources/static/assets/uploads/';

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: 'Could not download the file. ',
                error: err
            });
        }
    });
};

const remove = (req = request, res = response) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + '/resources/static/assets/uploads/';

    try {
        fs.unlinkSync(directoryPath + fileName);

        res.status(200).send({
            message: 'File is deleted.',
        });
    } catch (err) {
        res.status(500).send({
            message: 'Could not delete the file.',
            error: err
        });
    }
};

module.exports = {
    upload,
    getListFiles,
    download,
    remove,
};