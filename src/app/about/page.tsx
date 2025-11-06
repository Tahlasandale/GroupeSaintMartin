import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos - Mon Application',
  description: 'Découvrez notre entreprise et notre équipe',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">À propos de nous</h1>
      <div className="prose max-w-3xl mx-auto">
        <p className="text-lg mb-6">
          Bienvenue sur notre plateforme, une solution innovante conçue pour répondre à vos besoins quotidiens.
          Notre mission est de fournir des services de qualité qui simplifient votre vie numérique.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Notre histoire</h2>
        <p className="mb-6">
          Fondée en 2023, notre entreprise s'est rapidement imposée comme un acteur clé dans son domaine,
          grâce à son engagement envers l'excellence et l'innovation.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Notre équipe</h2>
        <p className="mb-6">
          Notre équipe est composée de professionnels passionnés et expérimentés, dédiés à offrir la meilleure
          expérience utilisateur possible.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">Nos valeurs</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><span className="font-medium">Qualité :</span> Nous nous engageons à fournir des services de la plus haute qualité.</li>
          <li><span className="font-medium">Innovation :</span> Nous repoussons constamment les limites de la technologie.</li>
          <li><span className="font-medium">Satisfaction client :</span> Votre satisfaction est notre priorité absolue.</li>
        </ul>
      </div>
    </div>
  );
}
