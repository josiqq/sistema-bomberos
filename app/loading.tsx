export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-t-transparent" />
      <p className="text-sm font-medium">Loading...</p>
    </div>
  );
}