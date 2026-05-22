import * as React from "react";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (res: { credential: string }) => void;
          }) => void;
          renderButton: (el: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

/**
 * Renders Google Sign-In button (GIS).
 */
export function GoogleSignInButton({ onSuccess }: { onSuccess: (credential: string) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!CLIENT_ID || !ref.current) return;

    const init = () => {
      if (!window.google?.accounts?.id || !ref.current) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (res) => onSuccess(res.credential),
      });
      ref.current.innerHTML = "";
      window.google.accounts.id.renderButton(ref.current, {
        theme: "filled_black",
        size: "large",
        width: 320,
        text: "continue_with",
      });
    };

    if (window.google?.accounts?.id) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [onSuccess]);

  if (!CLIENT_ID) {
    return (
      <p className="text-center text-xs text-[#94A3B8]">
        Set VITE_GOOGLE_CLIENT_ID for Google sign-in
      </p>
    );
  }

  return <div ref={ref} className="flex justify-center" />;
}
