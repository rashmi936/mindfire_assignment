const multer = require('multer')
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });
const azureStorage = require('azure-storage');
const getStream = require('into-stream');
const config = require('../config/Config')
const async = require("async");
const azureStorageConfig = {
    accountName: config.blobConfig.accountName,
    accountKey: config.blobConfig.accountKey,
    blobURL: config.blobConfig.blobURL,
    containerName: config.blobConfig.containerName
};
const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    newPipeline
} = require('@azure/storage-blob');

const uploadStrategy = multer({ storage: inMemoryStorage }).single('file');



const Util = require("./CustomFunctions");



uploadFileToBlob = async (directoryPath, file) => {

    return new Promise((resolve, reject) => {

        try {

            const fileName = file.originalname.toString().replace(' ', '-');
            const blobName = getBlobName(fileName);
            const stream = getStream(file.buffer);
            const streamLength = file.buffer.length;
            var options = { contentSettings: { contentType: file.mimetype } }
            const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
            blobService.createBlockBlobFromStream(azureStorageConfig.containerName, `${directoryPath}/${blobName}`, stream, streamLength, options, createBlockBlobFromStream => {
                if (err) {
                    reject(err);
                } else {

                    resolve({
                        filename: blobName,
                        originalname: file.originalname,
                        size: file.buffer.length,
                        blobSize: file.buffer.length,
                        path: `${azureStorageConfig.containerName}/${directoryPath}/${blobName}`,
                        url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${directoryPath}/${blobName}`
                    });
                }
            });
        }
        catch (err) {
            console.log(err)
            reject(err)
        }


    });
};





uploadFileToBlobInStream = async (directoryPath, file) => {

    return new Promise(async (resolve, reject) => {

        const ONE_MEGABYTE = 1024 * 1024;
        const uploadOptions = { bufferSize: 1 * ONE_MEGABYTE, maxBuffers: 20 };
        const ONE_MINUTE = 60 * 1000;
        const sharedKeyCredential = new StorageSharedKeyCredential(
            config.blobConfig.accountName,
            config.blobConfig.accountKey);
        const pipeline = newPipeline(sharedKeyCredential);
        const blobServiceClient = new BlobServiceClient(
            `https://${azureStorageConfig.accountName}.blob.core.windows.net`,
            pipeline
        );
        // const directoryPath = 'files';
        // const file = req.file;
        const fileTempName = getBlobName(file.originalname)
        const blobName = directoryPath + '/' + fileTempName;
        const stream = getStream(file.buffer);
        const containerClient = blobServiceClient.getContainerClient(azureStorageConfig.containerName);;
        const blockBlobClient = containerClient.getBlockBlobClient(`${blobName}`);

        try {
            await blockBlobClient.uploadStream(stream,
                uploadOptions.bufferSize, uploadOptions.maxBuffers,
                { blobHTTPHeaders: { blobContentType: file.mimetype } });

            const Azuredata = {
                filename: fileTempName,
                originalname: fileTempName,
                size: file.length,
                blobSize: file.length,
                path: `${azureStorageConfig.containerName}/${blobName}`,
                url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${blobName}`
            };

            resolve(Azuredata)
            // return Util.MakeJsonResponse(res, true, config.Constant.APIResCode.Success, 'File uploaded to Azure Blob storage.', [Azuredata]);
        } catch (err) {
            console.log(err)
            reject(err)
            // res.render('error', { message: err.message });
        }


    });
};

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};


const imageUpload = async (req, res, next) => {
    try {
        const image = await uploadFileToBlob('images', req.file).catch((err) => {

        }); // images is a directory in the Azure container
        return res.json(image);
    } catch (error) {
        next(error);
    }
}


const multiplefileUpload = async (req, res, next) => {
    try {
        const LangMsg = config.Msg[req.app.get("lang")];
        let azureUrls = [];
        await Promise.all(req.files.map(async (file) => {
            let result = await uploadFileToBlobInStream(`files`, file);
            azureUrls.push(result)
        }));
        return Util.MakeJsonResponse(res, true, config.Constant.APIResCode.Success, LangMsg.FetchSuccess, azureUrls);
    } catch (error) {
        next(error);
    }
}


const deleteBlobFile = async (blobName) => {
    try {
        const blobService = azureStorage.createBlobService(azureStorageConfig.accountName, azureStorageConfig.accountKey);
        blobService.deleteBlobIfExists(config.blobConfig.containerName, `${blobName.split('/')[4]}/${blobName.split('/')[5]}`, (err, data) => {
            // console.log("file", err, data);
        });
    }
    catch (err) {
        console.log(err)
    }
}



const streamFileUpload = async (req, res) => {
    const ONE_MEGABYTE = 1024 * 1024;
    const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
    const ONE_MINUTE = 60 * 1000;
    const sharedKeyCredential = new StorageSharedKeyCredential(
        config.blobConfig.accountName,
        config.blobConfig.accountKey);
    const pipeline = newPipeline(sharedKeyCredential);
    const blobServiceClient = new BlobServiceClient(
        `https://${azureStorageConfig.accountName}.blob.core.windows.net`,
        pipeline
    );
    const directoryPath = 'files';
    const file = req.file;
    const fileTempName = getBlobName(file.originalname)
    const blobName = directoryPath + '/' + fileTempName;
    const stream = getStream(file.buffer);
    const containerClient = blobServiceClient.getContainerClient(azureStorageConfig.containerName);;
    const blockBlobClient = containerClient.getBlockBlobClient(`${blobName}`);

    try {
        await blockBlobClient.uploadStream(stream,
            uploadOptions.bufferSize, uploadOptions.maxBuffers,
            { blobHTTPHeaders: { blobContentType: file.mimetype } });

        const Azuredata = {
            filename: fileTempName,
            originalname: fileTempName,
            size: file.length,
            blobSize: file.length,
            path: `${azureStorageConfig.containerName}/${blobName}`,
            url: `${azureStorageConfig.blobURL}${azureStorageConfig.containerName}/${blobName}`
        };
        return Util.MakeJsonResponse(res, true, config.Constant.APIResCode.Success, 'File uploaded to Azure Blob storage.', [Azuredata]);
    } catch (err) {
        console.log(err)
        return Util.MakeJsonResponse(res, true, config.Constant.APIResCode.NotFound, err.message, []);
        // res.render('error', { message: err.message });
    }
}

module.exports = {
    singleFileUpload,
    imageUpload,
    multiplefileUpload,
    deleteBlobFile,
    streamFileUpload,
    uploadStrategy

}