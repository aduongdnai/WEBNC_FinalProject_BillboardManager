// ImageUploaderWithWidget.js
import React from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { Button } from '@chakra-ui/react';

const ImageUploaderWithWidget = ({ onUpLoadSuccess }) => {

    const openWidget = () => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: 'dk8pqhmpy',
                uploadPreset: 'ourryjfw',
                maxFiles: 2,
                folder: 'official' // Set the maximum number of files allowed
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {

                    onUpLoadSuccess(result.info);
                    // You can perform additional actions with the uploaded image info here
                }
            }
        ).open();
    };

    return (
        <CloudinaryContext cloudName={process.env.CLOUDINARY_CLOUD_NAME}>
            <div>
                <Button onClick={openWidget}>Browse</Button>
            </div>
        </CloudinaryContext>
    );
};

export default ImageUploaderWithWidget;
