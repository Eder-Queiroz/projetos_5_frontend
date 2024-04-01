"use client";
import RootLayout from "@/app/layout";
import Image from "next/image";

export default function Rfid() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-5/6 shadow-xl border rounded-3xl flex flex-col items-center justify-between p-6">
        <Image src="/nfc-2.webp" width={400} height={0} alt="NFC Image" />
        <div className="text-center">
          <h1 className="font-bold text-4xl mb-4">
            Faça o cadastro do seu cartao
          </h1>
          <span className="text-xl">
            Aproxime o cartao nfc para realizar o cadastro
          </span>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          Validar
        </button>
      </div>
    </main>
  );
}

Rfid.getLayout = function getLayout(page: any) {
  return <RootLayout>{page}</RootLayout>;
};
