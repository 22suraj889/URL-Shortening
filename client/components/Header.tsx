export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-wide">
          Tiny<span className="text-yellow-300">Link</span>
        </h1>

        {/* Navigation */}
        <nav className="space-x-6 hidden sm:block">
          <a href="/" className="hover:text-yellow-200 transition font-medium">
            Dashboard
          </a>
        </nav>
      </div>
    </header>
  );
}
