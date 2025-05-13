"use client";

import { useRef, useEffect } from "react";
import Script from "next/script";

interface TurnstileWidgetProps {
  sitekey: string;
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact";
        }
      ) => string; // Returns widget ID
      remove?: (widgetId: string) => void;
    };
  }
}

const TurnstileWidget = ({
  sitekey,
  onSuccess = () => {},
  onError = () => {},
  onExpire = () => {},
  theme = "auto",
  size = "normal",
}: TurnstileWidgetProps) => {
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup Turnstile on unmount
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (turnstileRef.current && window.turnstile) {
            const id = window.turnstile.render(turnstileRef.current, {
              sitekey,
              callback: onSuccess,
              "error-callback": onError,
              "expired-callback": onExpire,
              theme,
              size,
            });
            widgetIdRef.current = id;
          }
        }}
        onError={() => {
          console.error("Failed to load Turnstile script");
          onError();
        }}
      />
      <div ref={turnstileRef} data-size={size} />
    </>
  );
};

export default TurnstileWidget;
