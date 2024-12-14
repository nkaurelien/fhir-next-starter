import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md- py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            className="dark:invert"
            src="/data2innov_logo.jpeg"
            alt="FHIR logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold">FHIR Dashboard</h1>
        </div>
        <nav className="flex gap-4">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/patients" className="hover:underline">
            Patients
          </Link>
          <Link href="/practitioners" className="hover:underline">
            Praticiens
          </Link>
        </nav>
      </div>
    </header>
  );
}