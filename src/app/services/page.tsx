import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Mon Application',
  description: 'Découvrez nos services de haute qualité',
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Nos Services</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Service 1</h2>
          <p className="text-muted-foreground">
            Description détaillée du premier service que nous proposons à nos clients.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Service 2</h2>
          <p className="text-muted-foreground">
            Description détaillée du deuxième service que nous proposons à nos clients.
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">Service 3</h2>
          <p className="text-muted-foreground">
            Description détaillée du troisième service que nous proposons à nos clients.
          </p>
        </div>
      </div>
    </div>
  );
}
