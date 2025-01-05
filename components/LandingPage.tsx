"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-center max-w-7xl mx-auto w-full">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">UniSquad</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Trouver des coéquipiers de{" "}
                  <span className="text-blue-600">Qualité</span>
                  <br />
                  pour vos travaux d'équipe
                </h1>
                <p className="pt-10 mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Trouver des étudiants de votre classe qui ont besoin de
                  coéquipiers!
                </p>
              </div>
              <div className="items-center space-x-4 pt-5">
                <Link href="/sign-up">
                  <Button size="lg">S'inscrire</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-screen py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Comment ça marche?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <FeatureCard
                icon={<UserIcon className="h-10 w-10" />}
                title="Entrez vos informations"
              />
              <FeatureCard
                icon={<BriefcaseIcon className="h-10 w-10" />}
                title="Recherchez des personnes dans votre classe"
              />
              <FeatureCard
                icon={<ChatBubbleIcon className="h-10 w-10" />}
                title="Commencez à travailler en équipe"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Prêt à améliorer la qualité de vos travaux d'équipe ?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 pt-8">
                  Évitez les mauvaises notes en trouvant de mauvais coéquipiers
                  et rejoignez UniSquad aujourd'hui!
                </p>
              </div>
              <div className="pt-5">
                <Button size="lg">Commencer</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
      <div className="p-2 bg-blue-500 rounded-full text-white">{icon}</div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
    </div>
  );
}

function MountainIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function UserIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function BriefcaseIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function ChatBubbleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}
