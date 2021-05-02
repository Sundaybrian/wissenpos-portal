import React from "react";

const useImageHandler = () => {
    const [file, setFile] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null); //once we have an image, we will duplicate it here
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const imageChangeHandler = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            console.log(selected);

            // clearError
        } else {
            setFile(null);
            // setALertError e,g select an image file (png or jpeg)
        }
    };

    return {
        file,
        setFile,
        imageChangeHandler,
        imageUrl,
        setImageUrl,
    };
};

export default useImageHandler;
