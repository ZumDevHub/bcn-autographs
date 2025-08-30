export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800 mx-auto"></div>
        <p className="mt-4 text-gray-600 text-sm">Loading autographs...</p>
      </div>
    </div>
  );
}