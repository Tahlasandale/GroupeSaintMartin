import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalNoticePage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Legal Notice</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Site Editor</h2>
            <p>Company Name: AuthZen</p>
            <p>Address: 123 Fictional Street, 75000 Paris, France</p>
            <p>Email: contact@authzen.com</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Hosting</h2>
            <p>Host: Firebase Hosting</p>
            <p>Company: Google LLC</p>
            <p>Address: 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Intellectual Property</h2>
            <p>
              The content of this site (texts, images, graphics, logo, icons, etc.) is the exclusive property of AuthZen,
              with the exception of trademarks, logos, or content belonging to other partner companies or authors.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Personal Data</h2>
            <p>
              The information collected is necessary for your membership. It is subject to computer processing and is intended
              for the association's secretariat. In accordance with the "Informatique et Libertés" law of January 6, 1978, as amended, you have
              the right to access, rectify, and delete information concerning you.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
