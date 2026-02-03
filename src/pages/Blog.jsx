import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Book } from "iconoir-react";
import { useIsDesktop } from "../hooks/usePerformance";
import ResponsiveAnimation from "../components/ui/ResponsiveAnimation";
import SEO from "../components/SEO";

// Mock Data
const articles = [
    {
        id: 1,
        title: "Mastering React Animations with Framer Motion",
        excerpt: "A comprehensive deep dive into creating fluid gestures, layout animations, and complex transitions in modern React applications.",
        date: "Mar 15, 2024",
        readTime: "5 min read",
        category: "Frontend",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Building Scalable APIs with Node.js",
        excerpt: "Essential best practices for structuring Express applications, handling errors, and implementing a microservices architecture for scale.",
        date: "Feb 28, 2024",
        readTime: "8 min read",
        category: "Backend",
        image: "https://images.unsplash.com/photo-1627398242450-270170589295?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "The Future of Web Design: Glassmorphism",
        excerpt: "A guide to implementing modern UI trends like Glassmorphism using Tailwind CSS to create visually stunning, semi-transparent interfaces.",
        date: "Jan 10, 2024",
        readTime: "6 min read",
        category: "Design",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function Blog() {
    const isDesktop = useIsDesktop();

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Blog"
                description="Thoughts, tutorials, and insights on web development, design, and technology."
            />

            <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
                {/* Header */}
                <div className="text-center space-y-3 md:space-y-4 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-4"
                    >
                        <Book className="w-4 h-4" /> The Knowledge Hub
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                    >
                        Articles & Insights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-400 text-base md:text-lg"
                    >
                        Sharing my journey, learnings, and technical deep dives into the world of software development.
                    </motion.p>
                </div>

                {/* Featured Article (First one) - Desktop only hover effects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    <img
                        src={articles[0].image}
                        alt={articles[0].title}
                        className={`w-full h-[350px] md:h-[500px] object-cover transition-transform duration-700 ${isDesktop ? 'group-hover:scale-105' : ''
                            }`}
                    />
                    <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 w-full md:w-2/3 space-y-3 md:space-y-4">
                        <span className="px-3 py-1 bg-blue-600/90 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                            {articles[0].category}
                        </span>
                        <h2 className={`text-2xl md:text-4xl font-bold text-white transition-colors ${isDesktop ? 'group-hover:text-blue-400' : ''
                            }`}>
                            {articles[0].title}
                        </h2>
                        <p className="text-gray-300 text-base md:text-lg line-clamp-2">
                            {articles[0].excerpt}
                        </p>
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400 pt-2">
                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {articles[0].date}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full" />
                            <span>{articles[0].readTime}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Articles Grid - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {articles.slice(1).concat(articles.slice(1)).map((article, index) => ( // Doubling for demo
                        <ResponsiveAnimation
                            key={`${article.id}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={`group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-colors flex flex-col ${isDesktop ? 'hover:bg-white/10' : ''
                                }`}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className={`w-full h-full object-cover transition-transform duration-500 ${isDesktop ? 'group-hover:scale-110' : ''
                                        }`}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white rounded-lg">
                                        {article.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 md:p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>
                                <h3 className={`text-lg md:text-xl font-bold text-white mb-2 transition-colors ${isDesktop ? 'group-hover:text-blue-400' : ''
                                    }`}>
                                    {article.title}
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2 mb-4 md:mb-6 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className={`pt-4 border-t border-white/10 flex items-center text-blue-400 font-medium text-sm transition-all ${isDesktop ? 'group-hover:gap-2' : ''
                                    }`}>
                                    Read Article <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        </ResponsiveAnimation>
                    ))}
                </div>

                {/* Newsletter / CTA */}
                <div className="p-6 md:p-12 rounded-2xl md:rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 text-center relative overflow-hidden">
                    {isDesktop && (
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
                    )}
                    <div className="relative z-10 max-w-2xl mx-auto space-y-4 md:space-y-6">
                        <h2 className="text-2xl md:text-3xl font-bold text-white">Stay in the loop</h2>
                        <p className="text-gray-400 text-sm md:text-base">
                            Join the newsletter to get the latest articles and resources sent directly to your inbox. No spam, ever.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-5 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 outline-none min-touch-target"
                            />
                            <button className={`min-touch-target px-6 py-3 bg-white text-black font-bold rounded-xl transition-colors ${isDesktop ? 'hover:bg-gray-200' : 'active:bg-gray-200'
                                }`}>
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
