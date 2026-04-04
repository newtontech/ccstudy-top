import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[120px] font-bold leading-none tracking-tighter bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-blue)] to-[var(--accent-cyan)] bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)]" />
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-primary)]">
          页面未找到
        </h2>
        <p className="text-[var(--text-secondary)] mb-8">
          你访问的页面不存在。可能是路由变更或链接错误。
        </p>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-blue)] text-white font-medium transition-transform hover:scale-105 active:scale-95"
        >
          <span>←</span>
          <span>返回首页</span>
        </Link>
      </div>
    </div>
  );
}
