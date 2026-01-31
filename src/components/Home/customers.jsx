import React from "react";

const Customers = () => {
    const customers = [
        {
            name: "Yi",
            fullName: "Young Indians",
            tagline: "WE CAN WE WILL",
            url: "https://youngindians.net/",
            type: "logo-box"
        },
        {
            name: "Ayon",
            fullName: "Clothing Brand",
            url: "#",
            style: 'font-serif italic font-bold text-4xl md:text-5xl'
        },
        {
            name: "VTS",
            url: "#",
            style: 'font-black tracking-tighter text-5xl md:text-7xl font-sans italic'
        },
        {
            name: "Twincord",
            subtitle: "tech need simplified",
            url: "https://twincord.in",
            style: 'font-bold tracking-tight text-2xl md:text-3xl font-sans'
        },
        {
            name: "MAS",
            subtitle: "graphics",
            url: "#",
            style: 'font-black tracking-tight text-4xl md:text-6xl font-sans'
        }
    ];

    return (
        <section className="py-24 bg-black/20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">
                    <span className="text-gray-400">Customer</span> <span className="text-white">Profiles</span>
                </h2>
                <p className="text-lg text-gray-300 mb-20 font-medium">
                    Your achievements are our proud milestones
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-items-center opacity-90">
                    {customers.map((customer, index) => (
                        <a
                            key={index}
                            href={customer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center group transition-all duration-300 hover:scale-110"
                        >
                            {customer.type === "logo-box" ? (
                                <div className="bg-[#221F1F] p-4 flex flex-col items-center justify-center border border-gray-800 rounded-sm">
                                    <span className="text-white text-4xl font-bold leading-none">Yi</span>
                                    <span className="text-white text-[10px] font-bold mt-1 border-t border-gray-600 pt-1 leading-tight">Young Indians</span>
                                    <div className="bg-white px-1 mt-1">
                                        <span className="text-black text-[8px] font-black">{customer.tagline}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className={`text-white transition-colors group-hover:text-orange-500 text-center ${customer.style || 'font-bold text-3xl'}`}>
                                        {customer.name}
                                    </span>
                                    {customer.fullName && (
                                        <span className="text-gray-500 text-[10px] font-bold block mt-[-5px]">
                                            {customer.fullName}
                                        </span>
                                    )}
                                    {customer.subtitle && (
                                        <p className={`text-gray-400 font-medium tracking-wide text-center ${customer.name === 'MAS' ? 'text-xs italic' : 'text-[10px]'}`}>
                                            {customer.subtitle}
                                        </p>
                                    )}
                                </div>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Customers;