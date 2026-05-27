'use client';

/**
 * Site-wide footer — copyright + developer credit.
 * Financial reporting (Varydian) links live on enterprise/government flows, not here.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-gray-600 text-center">
        <span>© {new Date().getFullYear()} Maroon Traceability</span>
        <span className="hidden sm:inline text-gray-300" aria-hidden="true">
          ·
        </span>
        <span className="text-gray-600">Developed by NCL Group</span>
      </div>
    </footer>
  );
}
