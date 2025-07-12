import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service | ArdhiX Land Registry System",
  description: "Terms of Service for the ArdhiX Land Registry System",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-radial from-sky-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using the ArdhiX Land Registry System, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground">
                ArdhiX provides a digital land registry system that enables users to register, verify, and manage land properties in Kenya. Our platform offers secure, transparent, and efficient land administration services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate and complete information when registering properties</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the service only for lawful purposes</li>
                <li>Report any suspicious activities or security breaches immediately</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Data Security and Privacy</h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your personal and property information. All data is encrypted and stored securely in compliance with Kenyan data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Service Availability</h2>
              <p className="text-muted-foreground">
                While we strive to maintain 99.9% uptime, ArdhiX reserves the right to temporarily suspend the service for maintenance, updates, or unforeseen circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                ArdhiX shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@ardhix.ke
                <br />
                Phone: +254 700 000 000
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
