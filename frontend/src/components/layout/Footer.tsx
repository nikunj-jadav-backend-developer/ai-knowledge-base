import Link from "next/dist/client/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500 md:px-10">
        © {new Date().getFullYear()} AI Knowledge Base. All rights reserved.
      </div>
      <nav className="flex justify-center gap-6 text-sm">
        <Link href="/about-us" className="hover:underline">
          About Us
        </Link>

        <Link href="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>

        <Link href="/contact-us" className="hover:underline">
          Contact Us
        </Link>
      </nav>
    </footer>
  );
}