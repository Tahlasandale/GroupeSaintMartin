import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Introduction</h2>
            <p>
              At AuthZen, we are committed to protecting your privacy. This privacy policy explains how we collect,
              use, disclose, and protect your information when you use our website.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Collection of Your Information</h2>
            <p>
              We may collect personally identifiable information, such as your name, email address, and demographic information,
              that you voluntarily provide to us when you register on the site.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Use of Your Information</h2>
            <p>
              Having accurate information allows us to provide you with a smooth, efficient, and personalized experience. Specifically,
              we may use the information collected about you via the site to:
            </p>
            <ul className="list-disc list-inside pl-4">
              <li>Create and manage your account.</li>
              <li>Email you regarding your account or order.</li>
              <li>Improve the efficiency and operation of the site.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information.
              While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </div>
           <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
            <p>
              If you have any questions or comments about this privacy policy, please contact us at: contact@authzen.com
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
