import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl font-bold text-gray-700">404</div>
        <h2 className="text-xl font-semibold text-gray-100">Stranica nije pronađena</h2>
        <p className="text-gray-400">Stranica koju tražiš ne postoji ili je premeštena.</p>
        <Link
          href="/learn"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
