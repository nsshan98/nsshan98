"use client";

import Script from "next/script";

export default function SupportKoriWidget() {
  return (
    <Script
      src="https://www.supportkori.com/widget.js"
      data-id="bysakib"
      data-message="Support Sakib"
      data-color="#FFDD00"
      data-position="right"
      strategy="lazyOnload"
    />
  );
}
