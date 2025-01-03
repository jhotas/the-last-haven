"use client"
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Conquistas() {
  const [conquistas, setConquistas] = useState<string[]>([]);

  useEffect(() => {
    const conquistasSalvas = localStorage.getItem("conquistas");
    if (conquistasSalvas) {
      setConquistas(JSON.parse(conquistasSalvas));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <div className="absolute top-5 left-5">
        <Link href="/">
          <button className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-black px-4 py-2 rounded-full">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-10">Conquistas</h1>
      {conquistas.length > 0 ? (
        <ul className="space-y-2">
          {conquistas.map((conquista, index) => (
            <li key={index}>🎖️ {conquista}</li>
          ))}
        </ul>
      ) : (
        <p>Sem conquistas desbloqueadas ainda. Continue jogando!</p>
      )}
    </div>
  );
}