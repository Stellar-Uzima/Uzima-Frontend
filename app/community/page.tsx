import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { AfricaMapLoader } from "@/components/community/AfricaMapLoader";

export const metadata = {
  title: "Community | Stellar Uzima",
  description:
    "Explore Stellar Uzima community presence and regional hubs across Africa.",
};

export default function CommunityPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="text-center space-y-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-terra/80">
              Community
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth">
              Across Africa
            </h1>
            <p className="text-muted max-w-lg mx-auto">
              Regional hubs and language communities connected through Stellar
              Uzima.
            </p>
          </header>
          <AfricaMapLoader />
        </div>
      </main>
      <Footer />
    </>
  );
}
