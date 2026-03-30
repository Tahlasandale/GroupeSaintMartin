import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RoutiersPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-8">Page Routiers</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/carte-clan">
          <Button variant="outline" className="w-full sm:w-auto">
            Carte Clan
          </Button>
        </Link>
        <Link to="/textes-route">
          <Button variant="outline" className="w-full sm:w-auto">
            Textes Route
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RoutiersPage;