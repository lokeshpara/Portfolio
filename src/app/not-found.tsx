export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-lightest-slate mb-4">404</h1>
        <p className="text-light-slate mb-8">Page not found</p>
        <a 
          href="/"
          className="text-green hover:text-lightest-slate transition-colors duration-200"
        >
          Return Home
        </a>
      </div>
    </div>
  );
} 