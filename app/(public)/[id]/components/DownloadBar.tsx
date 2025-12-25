export default function DownloadBar({ releases }: { releases: any[] }) {
  if (releases.length === 0) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full flex gap-4 z-50 bg-black/50 backdrop-blur-md p-2 border border-white/10 flex-row items-center justify-center">
      {releases.map((rel) => (
        <a
          key={rel.id}
          href={rel.downloadUrl}
          className="px-6 py-3 bg-[#0095A6] text-white rounded-xl text-sm font-bold hover:scale-105 transition-transform"
        >
          Download for {rel.targetOSText}
        </a>
      ))}
    </div>
  );
}