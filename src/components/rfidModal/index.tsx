import Image from "next/image";

interface RfidModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RfidModal = ({ isOpen, onClose }: RfidModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="w-1/2 h-5/6 shadow-xl border rounded-3xl flex flex-col items-center justify-between p-6 bg-white">
        <Image src="/nfc-2.webp" width={400} height={0} alt="NFC Image" />
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-4">
            Faça o cadastro do seu cartão
          </h1>
          <span className="text-xl">
            Aproxime o cartão NFC para realizar o cadastro
          </span>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Validar
        </button>
      </div>
    </div>
  );
};
