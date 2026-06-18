import { Linkedin, Mail } from 'lucide-react';

const leadersList = [
  { 
    name: "Bharanidharan R N", 
    role: "Co-Founder & CEO", 
    image: "/Bharanidharan.jpeg",
    linkedin: "https://www.linkedin.com/in/bharanidharanrn/",
    email: "founder@crivo.in"
  },
  { 
    name: "Gokulnath Sundaramurthi", 
    role: "Co-Founder & CTO", 
    image: "/Gokulnath.jpeg",
    linkedin: "https://www.linkedin.com/in/gokulnath-bs/",
    email: "cto@crivo.in"
  },
  { 
    name: "Hareeni S", 
    role: "Co-Founder & COO", 
    image: "/Hareeni.png",
    linkedin: "https://www.linkedin.com/in/hareenis?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    email: "coo@crivo.in"
  },
];

function Leaders() {
  return (
    <div className="text-left">
      <div className="mb-10">
        <h6 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-6">
          LEADERS
        </h6>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
        {leadersList.map((t, i) => (
          <div
            key={i}
            className="group relative h-[480px] w-full rounded-[2.5rem] overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#070708] hover:border-black/30 dark:hover:border-white/30 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-end"
          >
            {/* Photo container */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                style={{ objectPosition: 'top center' }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent dark:from-black/95 dark:via-black/50 dark:to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500"></div>
            </div>

            {/* Glassmorphic details overlay */}
            <div className="relative z-10 p-8 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out text-left">
              {/* Role Tag */}
              <span className="inline-block px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/10 text-white/90 border border-white/10 backdrop-blur-md mb-4 shadow-sm">
                {t.role}
              </span>
              
              {/* Name */}
              <h4 className="font-black text-2xl tracking-tight text-white mb-2 leading-tight drop-shadow-md">
                {t.name}
              </h4>

              {/* Divider line */}
              <div className="w-12 group-hover:w-full h-[1px] bg-white/20 group-hover:bg-white/40 transition-all duration-500 my-4"></div>

              {/* Actions / Contact */}
              <div className="flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <a
                  href={`mailto:${t.email}`}
                  className="text-white/70 hover:text-white text-xs font-semibold hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{t.email}</span>
                </a>
                
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center border border-white/10 hover:border-transparent transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaders;
