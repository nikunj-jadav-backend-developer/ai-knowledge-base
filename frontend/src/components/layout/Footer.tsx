export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-gray-500 md:px-10">
        © {new Date().getFullYear()} AI Knowledge Base. All rights reserved.
      </div>
    </footer>
  );
}