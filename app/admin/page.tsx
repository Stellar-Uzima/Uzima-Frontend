import Navigation from "@/components/navigation";
import { AdminOverviewLoader } from "@/components/admin/AdminOverviewLoader";

export const metadata = {
  title: "Admin | Stellar Uzima",
  description: "Administrative overview for Stellar Uzima.",
};

export default function AdminPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-cream pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <header>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-earth">
              Admin dashboard
            </h1>
            <p className="text-muted mt-2 text-sm">
              Internal metrics — loaded on demand for a smaller first load.
            </p>
          </header>
          <AdminOverviewLoader />
        </div>
      </main>
    </>
  );
}
