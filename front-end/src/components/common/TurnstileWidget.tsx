"use client";

import { useRef } from "react";
import Script from "next/script";

interface TurnstileWidgetProps {
  sitekey: string;
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        }
      ) => void;
    };
  }
}

const TurnstileWidget = ({
  sitekey,
  onSuccess = () => {},
  onError = () => {},
  onExpire = () => {},
}: TurnstileWidgetProps) => {
  const turnstileRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer
        strategy="lazyOnload"
        onLoad={() => {
          if (turnstileRef.current && window.turnstile) {
            window.turnstile.render(turnstileRef.current, {
              sitekey,
              callback: (token) => {
                onSuccess(token);
              },
              "error-callback": () => {
                onError();
              },
              "expired-callback": () => {
                onExpire();
              },
            });
          }
        }}
      />
      <div ref={turnstileRef} data-size="normal" />
    </>
  );
};

export default TurnstileWidget;
