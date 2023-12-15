import { useEffect, useState } from 'react';

/**
 * @function useImage
 * @param {*} fileName
 * @returns {{loading: boolean, error: Error | null, image: *}} //какой тип в error?
 */

export const useImage = (fileName) => {
  const [loading, setLoading] = useState(true);
  /** @type {[null | Error, Function]}*/
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(
          `../../../shared/weather-icons/${fileName}.svg`
        ); // change relative path to suit your needs
        setImage(response.default);
      } catch (err) {
        setError(err);
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

