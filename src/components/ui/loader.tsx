import { useLoadingStore } from "@/lib/loading";

export function Loader() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-50 flex items-center justify-center">
      <div className="flex items-center gap-2 bg-white px-6 py-4 rounded-lg shadow-lg">
        <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
}
