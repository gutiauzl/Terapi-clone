import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import {
  ArrowUpRight,
  CheckCircle2,
  Shield,
  Users,
  Brain,
  Heart,
  Sparkles,
  Calendar,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  const result = plans?.items;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Cómo Funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un proceso simple para encontrar al terapeuta que mejor se adapte
              a tus necesidades específicas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <CheckCircle2 className="w-6 h-6" />,
                title: "Completa el Cuestionario",
                description:
                  "Responde preguntas sobre tus preferencias y objetivos terapéuticos",
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Recibe Coincidencias",
                description:
                  "Nuestro sistema encuentra terapeutas compatibles con tus necesidades",
              },
              {
                icon: <Users className="w-6 h-6" />,
                title: "Explora Perfiles",
                description:
                  "Revisa especialidades, enfoques y disponibilidad de cada terapeuta",
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title: "Agenda tu Consulta",
                description:
                  "Reserva directamente tu primera sesión con el terapeuta elegido",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por Qué Elegirnos</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Estamos revolucionando la forma en que las personas encuentran
              ayuda psicológica profesional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-teal-600 mb-4">
                <Brain className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Matching Inteligente
              </h3>
              <p className="text-gray-600">
                Nuestro algoritmo analiza múltiples factores para encontrar la
                compatibilidad ideal entre paciente y terapeuta.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-purple-600 mb-4">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Enfoque Personalizado
              </h3>
              <p className="text-gray-600">
                Entendemos que cada persona es única, por eso nuestro
                cuestionario captura tus necesidades específicas.
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-600 mb-4">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Profesionales Verificados
              </h3>
              <p className="text-gray-600">
                Todos nuestros terapeutas son profesionales certificados con
                amplia experiencia en diferentes especialidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-teal-100">Terapeutas Certificados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-teal-100">Pacientes Satisfechos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-teal-100">Tasa de Compatibilidad</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Planes Simples y Transparentes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Elige el plan perfecto para tus necesidades. Sin costos ocultos.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {result?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Lo Que Dicen Nuestros Usuarios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Historias reales de personas que encontraron al terapeuta ideal a
              través de nuestra plataforma.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "Después de meses buscando un terapeuta que entendiera mis
                necesidades, Terapi me conectó con el profesional perfecto en
                cuestión de minutos."
              </p>
              <div className="font-semibold">María G.</div>
              <div className="text-sm text-gray-500">Madrid</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "El cuestionario fue muy completo y realmente captó lo que
                estaba buscando. Mi terapeuta y yo conectamos desde la primera
                sesión."
              </p>
              <div className="font-semibold">Carlos R.</div>
              <div className="text-sm text-gray-500">Barcelona</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 italic mb-4">
                "La plataforma es intuitiva y el proceso de matching realmente
                funciona. Encontré a mi terapeuta ideal y he notado grandes
                avances."
              </p>
              <div className="font-semibold">Laura M.</div>
              <div className="text-sm text-gray-500">Valencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para Comenzar?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya encontraron el apoyo psicológico
            que necesitaban.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Comenzar Ahora
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
