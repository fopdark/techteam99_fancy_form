import { useState } from "react";

interface Props {
  alt?: string;
  src: string;
}
const TokenImage = ({ alt = 'images_tokens', src }: Props) => {
  const [imgError, setImgError] = useState<boolean>(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const fallbackImage = "./images/tokens/coin-default.svg";

  return (
    <img
      src={imgError ? fallbackImage : src}
      alt={alt}
      className="w-7 h-7"
      onError={handleImageError}
    />
  );
};

export default TokenImage;
