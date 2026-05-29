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
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      {image && (
        <div className="relative h-48 w-full bg-gray-200">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.objectFit = 'contain';
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-size="14"%3ENo imagen%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>
        {footer && <div className="text-sm text-gray-500">{footer}</div>}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
