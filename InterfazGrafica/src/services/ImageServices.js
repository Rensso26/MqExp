const IMAGE_BASE_URL = "http://localhost:8080/assets/images";

export const getProductImageUrl = (imageName) => {
    return `${IMAGE_BASE_URL}/${imageName}.png`;
};
