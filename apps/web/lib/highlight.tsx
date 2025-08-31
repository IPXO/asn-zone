'use client';
import React from 'react';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function highlight(text: string, query: string): React.ReactNode {
  if (!text) return '';
  if (!query) return String(text);

  const q = query.trim();
  if (!q) return String(text);

  try {
    const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
    const parts = String(text).split(re);
    return parts.map((part, i) =>
      i % 2 === 1 ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
    );
  } catch {
    return String(text);
  }
}
