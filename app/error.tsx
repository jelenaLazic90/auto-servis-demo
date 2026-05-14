'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-100">Došlo je do greške</h2>
        <p className="text-gray-400">{error.message || 'Nešto je pošlo po zlu. Pokušaj ponovo.'}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Pokušaj ponovo
        </button>
      </div>
    </div>
  );
}
