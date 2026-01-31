import React from 'react';

const Partners = () => {
  const partners = [
    { 
      name: 'BHUBS', 
      subtitle: 'Your Hub for Digital Excellence',
      url: 'https://bbhubs.com',
      style: 'font-black tracking-tighter text-5xl md:text-6xl font-sans'
    },
    { 
      name: 'Twincord', 
      subtitle: 'tech need simplified',
      url: 'https://twincord.in',
      style: 'font-bold tracking-tight text-4xl md:text-5xl font-sans'
    },
    { 
      name: 'Crivo Airtech', 
      subtitle: 'Air need Tech, Tech need Crivo!',
      url: 'https://crivo.in',
      style: 'font-serif italic font-semibold text-3xl md:text-4xl'
    },
  ];

  return (
    <section className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">
          <span className="text-gray-400">Partners</span> <span className="text-white">Profiles</span>
        </h2>
        <p className="text-lg text-gray-300 mb-20 font-medium">
          Collaboration that Drives Success
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-baseline justify-items-center">
          {partners.map((partner, index) => (
            <a 
              key={index} 
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transition-all duration-300 hover:scale-105"
            >
              <span className={`text-white mb-4 transition-colors group-hover:text-orange-500 ${partner.style}`}>
                {partner.name}
              </span>
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide text-center">
                {partner.subtitle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
