import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const contactInfoList = [
  { icon: Mail, label: "Email Us", value: "info@crivo.in", href: "mailto:info@crivo.in" },
  { icon: Phone, label: "Call Us", value: "+91 96007 60063", href: "tel:+919600760063" },
  { icon: MapPin, label: "Find Us", value: "221 R.K Building, Uthukuli, Tiruppur - 638751", href: "https://www.google.com/maps/search/?api=1&query=221+R.K+Building+Uthukuli+Tiruppur+638751" },
];

function ContactInfo() {
  return (
    <div className="space-y-8">
      {contactInfoList.map((c, i) => {
        const Icon = c.icon;
        return (
          <a key={i} href={c.href} target={c.icon === MapPin ? '_blank' : undefined} rel="noreferrer"
            className="group flex items-center justify-between p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-500">
            <div className="flex items-center gap-5">
              <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors duration-500">
                <Icon className="w-5 h-5 text-black/50 dark:text-white/60 group-hover:text-white dark:group-hover:text-black/60 transition-colors duration-500" />
              </div>
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 group-hover:text-white/50 dark:group-hover:text-black/60 transition-colors duration-500 font-bold mb-1">{c.label}</p>
                <p className="font-semibold group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{c.value}</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-black/30 dark:text-white/30 group-hover:text-white/60 dark:group-hover:text-black/65 transition-colors duration-500" />
          </a>
        );
      })}
    </div>
  );
}

export default ContactInfo;
