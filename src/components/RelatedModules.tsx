"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface RelatedModule {
  title: string;
  href: string;
  description: string;
  icon: string;
}

interface RelatedModulesProps {
  modules: RelatedModule[];
}

export function RelatedModules({ modules }: RelatedModulesProps) {
  return (
    <div className="mt-16 pt-12 border-t border-[var(--card-border)]">
      <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        相关模块
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
        {modules.map((mod, i) => (
          <motion.div
            key={mod.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex-shrink-0 w-64"
          >
            <Link href={mod.href} className="block">
              <div className="group rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]">
                <div className="text-2xl mb-2">{mod.icon}</div>
                <h4 className="text-base font-semibold text-[var(--text-primary)] mb-1 group-hover:gradient-text group-hover:[-webkit-text-fill-color:transparent] group-hover:[background:linear-gradient(135deg,var(--accent-purple),var(--accent-blue),var(--accent-cyan))] group-hover:[background-clip:text] transition-all">
                  {mod.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                  {mod.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
