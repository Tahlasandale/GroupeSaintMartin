import { Button } from "@/components/ui/button";
import Link from "next/link";

const RoutiersPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Page Routiers</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/carte-clan" passHref>
          <Button variant="outline" className="w-full sm:w-auto">
            Carte Clan
          </Button>
        </Link>
        <Link href="/textes-route" passHref>
          <Button variant="outline" className="w-full sm:w-auto">
            Textes Route
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RoutiersPage;