const uploadFile = async (file) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;  
    const uploadPreset = 'chatApp'; 
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(url, {
            method: 'POST', 
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary error:', errorData); 
            throw new Error(`Failed to upload image: ${errorData.error.message}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error uploading file:', error); 
        throw error; 
    }
};

export default uploadFile;
