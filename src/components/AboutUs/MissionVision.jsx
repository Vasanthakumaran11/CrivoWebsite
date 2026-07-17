import { useAboutPage } from '../../hooks/useAboutPage';

function MissionVision() {
  const { data } = useAboutPage();
  const mission = data?.missionVision?.mission;
  const vision = data?.missionVision?.vision;

  return (
    <section className="py-32 text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-x-12 gap-y-16 lg:gap-y-0 items-start">
          {/* Mission Column (Row 1, Column 1) */}
          <div className="flex flex-col gap-8 lg:col-start-1 lg:row-start-1">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Purpose</span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                OUR <br /><span className="text-outline">MISSION</span>
              </h2>
            </div>
            <div className="group relative p-8 md:p-18 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 shadow-xl hover:-translate-y-2 hover:shadow-2xl w-full animate-fade-in">
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors duration-500">
                {mission?.description || 'To democratize technology by offering accessible and affordable solutions while nurturing the next generation of innovators through practical education. We strive to bridge the gap between complex digital challenges and intuitive, human-centric solutions.'}
              </p>
            </div>
          </div>

          {/* Vision Column (Row 2, Column 2) */}
          <div className="flex flex-col gap-8 lg:col-start-2 lg:row-start-2 lg:pl-[calc(10rem+1.5cm)] lg:mt-[-2.5cm]">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Future</span>
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                OUR <br /><span className="text-outline">VISION</span>
              </h2>
            </div>
            <div className="group relative p-8 md:p-17 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 shadow-xl hover:-translate-y-2 hover:shadow-2xl w-full lg:max-w-[560px] animate-fade-in">
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors duration-500">
                {vision?.description || 'To create a world where technology is affordable, accessible, and backed by a workforce skilled through real-world experience. We envision a future where high-quality engineering and enterprise-grade tools are accessible to every builder and organization.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionVision;
