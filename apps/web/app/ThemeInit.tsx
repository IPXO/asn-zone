'use client';
import React from 'react';

export default function ThemeInit() {
  const code = `(function(){
    try {
      var stored = localStorage.getItem('theme');
      var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      var html = document.documentElement;
      html.classList.toggle('dark', dark);
      html.dataset.theme = dark ? 'dark' : 'light';
    } catch (e) {}
  })();`;
  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
