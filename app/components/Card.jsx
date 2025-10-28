export default function Card({ title, desc }) {
  return (
    <div className="group rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/20">
        <span className="text-2xl">✨</span>
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
    </div>
  );
}
