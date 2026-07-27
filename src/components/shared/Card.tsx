'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  image?: string;
  href?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}

export default function Card({
  title,
  description,
  image,
  href,
  footer,
  onClick,
}: CardProps) {
  const content = (
    <div
      className="premium-card cursor-pointer h-full flex flex-col overflow-hidden"
      onClick={onClick}
    >
      {image && (
        <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.objectFit = 'contain';
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f1f5f9" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-size="14"%3ENo imagen%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-slate-900 leading-snug">{title}</h3>
        <p className="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">{description}</p>
        {footer && <div className="text-sm text-slate-400 pt-4 border-t border-slate-100">{footer}</div>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="group block h-full">{content}</Link>;
  }

  return content;
}
