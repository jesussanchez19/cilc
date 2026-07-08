'use client';

import { useState, useEffect, useRef } from 'react';

const WHATSAPP_NUMBER = '52 1 55 1894 4494';
const WHATSAPP_MESSAGE = '¡Hola! Me interesa recibir información sobre sus programas de estudios en el extranjero.';
const PULSE_INTERVAL_MS = 10000;
const PULSE_DURATION_MS = 1800;

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false); 
  const [pulsing, setPulsing] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tooltipVisible = hovered || tapped;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!tooltipVisible) {
        setPulsing(true);
        pulseTimeoutRef.current = setTimeout(() => setPulsing(false), PULSE_DURATION_MS);
      }
    }, PULSE_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    };
  }, [tooltipVisible]);

  useEffect(() => {
    if (tooltipVisible && pulsing) {
      setPulsing(false);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
    }
  }, [tooltipVisible, pulsing]);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleTouchStart = () => setTapped(true);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={handleTouchStart}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group"
    >
      <span
        className={`
          bg-white text-gray-800 text-sm font-medium
          px-3 py-2 rounded-lg shadow-lg border border-gray-100
          whitespace-nowrap
          transition-all duration-200
          ${tooltipVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}
        `}
      >
        ¿Tienes dudas?
      </span>

      <div className="relative w-14 h-14 flex items-center justify-center">
        {pulsing && !tooltipVisible && (
          <span className="absolute inset-0 rounded-full bg-green-400 opacity-40 animate-ping" />
        )}

        <div className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-8 h-8"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16.003 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.354.618 4.663 1.793 6.695L2.667 29.333l6.82-1.778A13.264 13.264 0 0016.003 29.333c7.365 0 13.33-5.97 13.33-13.333 0-7.362-5.965-13.333-13.33-13.333zm0 24.267a11.022 11.022 0 01-5.614-1.533l-.403-.238-4.047 1.056 1.08-3.94-.264-.416A10.98 10.98 0 015.003 16c0-6.065 4.935-11 11-11s11 4.935 11 11-4.935 11-11 11zm6.03-8.237c-.33-.165-1.953-.963-2.256-1.073-.303-.11-.524-.165-.744.165-.22.33-.854 1.073-1.047 1.293-.193.22-.385.248-.716.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.836-2.286-.193-.33-.021-.508.145-.672.15-.148.33-.385.496-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.744-1.793-1.02-2.454-.268-.644-.54-.557-.744-.567l-.633-.012c-.22 0-.578.083-.881.413-.303.33-1.155 1.128-1.155 2.75s1.183 3.19 1.348 3.41c.165.22 2.328 3.555 5.642 4.988.789.34 1.404.544 1.884.696.791.252 1.511.216 2.08.131.635-.094 1.953-.798 2.228-1.569.275-.77.275-1.43.193-1.569-.083-.138-.303-.22-.633-.385z" />
          </svg>
        </div>
      </div>
    </a>
  );
}
