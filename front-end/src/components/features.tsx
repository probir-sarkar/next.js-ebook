import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: "🌍",
    title: "Server-Side Rendering (SSR)",
    description: "Master the concepts of SSR and learn when and how to implement it for optimal performance.",
  },
  {
    icon: "📄",
    title: "Static Site Generation (SSG)",
    description: "Understand how to leverage SSG for blazing-fast websites and improved user experience.",
  },
  {
    icon: "⏳",
    title: "Incremental Static Regeneration",
    description: "Learn how to implement ISR to update static content without rebuilding the entire site.",
  },
  {
    icon: "🛤️",
    title: "App Router",
    description: "Explore the new App Router and how it revolutionizes routing in Next.js applications.",
  },
  {
    icon: "🔄",
    title: "Data Fetching",
    description: "Master various data fetching methods and best practices for optimal performance.",
  },
  {
    icon: "🔒",
    title: "Security & Best Practices",
    description: "Learn security best practices and optimization techniques for production-ready apps.",
  },
];

const Features = () => {
  return (
    <section id="features" className="container mx-auto py-16 px-4 md:py-24 border-t border-gray-800">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Inside The E-Book?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Comprehensive coverage of Next.js concepts to help you succeed in interviews and real-world projects
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:border-emerald-500 hover:bg-gray-950 transition ease-out duration-300 hover:scale-105">
            <CardContent className="pt-6">
              <div className="rounded-full bg-emerald-900/20 w-12 h-12 flex items-center justify-center mb-4">
                <span className="text-emerald-500 text-2xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
