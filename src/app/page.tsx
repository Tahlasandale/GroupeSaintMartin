import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Settings, Zap, ArrowRight } from "lucide-react";
import HeroSection from "./hero-section";

export default function Home() {

  const features = [
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Suivez vos performances avec des tableaux de bord intuitifs",
    },
    {
      icon: Users,
      title: "Gestion d'équipe",
      description: "Collaborez efficacement avec votre équipe",
    },
    {
      icon: Settings,
      title: "Personnalisation",
      description: "Adaptez l'interface à vos besoins spécifiques",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Rapidité et fiabilité pour une expérience optimale",
    },
  ];

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Fonctionnalités principales
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Découvrez tout ce que MonApp peut faire pour vous
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Rejoignez des milliers d'utilisateurs qui font confiance à MonApp
              </p>
              <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                <Link href="/dashboard">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
