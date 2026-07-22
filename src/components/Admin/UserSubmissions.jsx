import { ExternalLink, MailOpen } from 'lucide-react';

export default function UserSubmissions() {
  return (
    <div className="space-y-8 text-left">
      <div className="text-left font-sans">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Inbound Submissions
        </h1>
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-2xl">
          Book-a-Meet and contact form submissions are handled by Web3Forms — view and manage them there.
        </p>
      </div>

      <div className="p-12 border border-dashed border-white/10 rounded-[2rem] text-center">
        <MailOpen className="w-8 h-8 text-white/20 mx-auto mb-4" />

        <a
          href="https://web3forms.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all hover:bg-white/90 active:scale-95"
        >
          Open Web3Forms Dashboard <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
