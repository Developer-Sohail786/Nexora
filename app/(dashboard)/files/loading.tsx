export default function Loading() {
  return (
    <main className="flex-1 space-y-8 px-10 py-10 animate-pulse">
      <div className="space-y-3">
        <div className="h-10 w-72 rounded bg-[#2A2640]" />

        <div className="h-4 w-96 rounded bg-[#2A2640]" />
      </div>

      <div className="h-72 rounded-2xl bg-[#1C1926]" />

      <div className="space-y-4">
        <div className="h-4 w-40 rounded bg-[#2A2640]" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div
              key={index}
              className="h-48 rounded-xl bg-[#1C1926]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}