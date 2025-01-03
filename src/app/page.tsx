import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-400 to-gray-800 text-black">
      <h1 className="text-5xl text-white font-bold mb-8">The Last Haven</h1>
      <div className="flex space-x-4">
        <Link href="/jogo">
          <button className="btn">
            Iniciar
          </button>
        </Link>
        <Link href="/rankings">
          <button className="btn">
            Rankings
          </button>
        </Link>
      </div>
    </div>
  );
}
