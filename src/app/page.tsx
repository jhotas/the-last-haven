import Link from "next/link";

export default function HomePage() {
  /* const huggingFaceApiKey = process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY
  console.log(huggingFaceApiKey) */
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-400 to-gray-800 text-black">
      <h1 className="text-5xl text-white font-bold mb-8">The Last Haven</h1>
      <div className="flex space-x-4">
        <Link href="/intro">
          <button className="btn">
            Iniciar
          </button>
        </Link>
        <Link href="/conquistas">
          <button className="btn">
            Conquistas
          </button>
        </Link>
      </div>
    </div>
  );
}
