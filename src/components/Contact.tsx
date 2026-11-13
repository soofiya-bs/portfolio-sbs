import { site, whatsappLink } from "@/content/site";

export const WA_MESSAGES = {
  general: "Hi Soofiya, I found your website and would like to know more.",
  student: "Hi Soofiya, I'm interested in SBS Personal Mentoring. Could you share the details?",
  institution: "Hi Soofiya, I'd like to invite you for an expert talk / workshop at our institution.",
  project: "Hi Soofiya, I have an AI project I'd like to discuss with you.",
} as const;

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.47 9.47 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.04c0-5.23 4.26-9.49 9.5-9.49a9.43 9.43 0 0 1 6.71 2.78 9.43 9.43 0 0 1 2.78 6.72c0 5.23-4.26 9.48-9.49 9.48m8.08-17.56A11.35 11.35 0 0 0 12.05.6C5.75.6.62 5.72.62 12.02c0 2.01.52 3.98 1.53 5.71L.52 23.4l5.8-1.52a11.4 11.4 0 0 0 5.72 1.46h.01c6.3 0 11.42-5.12 11.43-11.42 0-3.05-1.19-5.92-3.35-8.08" />
    </svg>
  );
}

/** Floating "Chat on WhatsApp" button, shown on every page. */
export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink(WA_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Soofiya on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-all duration-300 hover:pr-5 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 group-hover:max-w-[160px] group-focus-visible:max-w-[160px]">
        Chat on WhatsApp
      </span>
    </a>
  );
}

/** Inline WhatsApp button for call-to-action areas. */
export function WhatsAppButton({
  message = WA_MESSAGES.general,
  label = "Chat on WhatsApp",
  className = "",
}: {
  message?: string;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/50 px-6 py-3 text-sm font-medium text-text transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10 ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
      {label}
    </a>
  );
}

/** "Book a free 15-min call" — renders nothing until site.bookingUrl is set. */
export function BookCallButton({ className = "", label = "Book a free 15-min call" }: { className?: string; label?: string }) {
  if (!site.bookingUrl) return null;
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-text transition-colors hover:border-gold/60 hover:text-gold-soft ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
      </svg>
      {label}
    </a>
  );
}
