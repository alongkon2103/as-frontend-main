import Image from "next/image";

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <Image
      src="close.svg"
      width={30}
      height={30}
      alt="close"
      style={{ cursor: "pointer" }}
      onClick={onClose}
    />
  );
};

export default CloseButton;
