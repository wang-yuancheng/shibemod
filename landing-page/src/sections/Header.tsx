import ArrowRight from "@/assets/arrow-right.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hidden md:block">
          Product is constantly being improved, results may vary.
        </p>
        <div className="inline-flex gap-1 items-center">
          <a
            href="https://discord.gg/2Sby35W"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button>
              Join my server to send me feedback 
              <ArrowRight className="h-4 w-4 inline-flex justify-center items-center" />
            </button>
          </a>
        </div>
      </div>
    </header>
  );
};
