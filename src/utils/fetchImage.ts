export const fetchImage = async (fileName: string) => {
  try {
    const response = await import(`../assets/weather-icons/${fileName}.svg`); // change relative path to suit your needs
    return response.default;
  } catch (err) {
    console.log("getImageFunction", err);
  }
};
