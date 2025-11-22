export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t mt-10">
      <div className="max-w-6xl mx-auto px-6 py-4 text-center text-gray-600">
        <p className="text-sm">
          © {new Date().getFullYear()}
          <span className="font-semibold"> TinyLink</span>
        </p>
      </div>
    </footer>
  );
}
