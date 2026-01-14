import React from 'react'

const StatSection = () => {
      const stats = [
    { number: "99.9", suffix: "%", label: "Uptime" },
    { number: "500", suffix: "+", label: "Active Students" },
    { number: "5000", suffix: "+", label: "Alumni" },
    { number: "24", suffix: "/7", label: "Support" },
  ];

  return (
    <section  className="py-20 mask-t-from-50% relative px-4 sm:px-6 bg-gradient-to-b from-black via-zinc-950/50 to-black">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-5xl font-bold mb-2">
                <span className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-2xl font-bold text-transparent md:text-5xl">
                  {stat.number}
                </span>
                <span className="text-indigo-400">{stat.suffix}</span>
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;
