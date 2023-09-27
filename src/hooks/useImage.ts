import { useEffect, useState } from "react";

const useImage = (fileName: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(
          `../assets/weather-icons/${fileName}.svg`
        ); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
        setError(err as any);
      } finally {
        setLoading(false);
      }
    };
    if (fileName) fetchImage();
  }, [fileName]);

  return {
    loading,
    error,
    image,
  };
};

export default useImage;
