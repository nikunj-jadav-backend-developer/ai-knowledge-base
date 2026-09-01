import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        
        <Link
          href="/"
          className="text-xl font-bold"
        >
          AI Knowledge Base
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="hover:text-gray-600"
          >
            Home
          </Link>

          <Link
            href="/articles"
            className="hover:text-gray-600"
          >
            Articles
          </Link>
        </nav>

      </div>
    </header>
  );
}