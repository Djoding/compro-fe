import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";

const featuredArticle = {
  id: 1,
  title: "The Future of Digital Transformation: AI-Powered Business Solutions",
  excerpt: "Explore how artificial intelligence is revolutionizing business operations and driving the next wave of digital transformation across industries.",
  content: "As we enter 2024, artificial intelligence continues to reshape how businesses operate, compete, and deliver value to their customers...",
  author: "Dr. Sarah Mitchell",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "AI & Innovation",
  image: "/api/placeholder/800/400",
  featured: true
};

const articles = [
  {
    id: 2,
    title: "Cloud Migration Strategies for Modern Enterprises",
    excerpt: "A comprehensive guide to planning and executing successful cloud migration projects for enterprise-level organizations.",
    author: "Michael Chen",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Cloud Computing",
    image: "/api/placeholder/400/250"
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices in 2024",
    excerpt: "Essential security measures every business should implement to protect against evolving cyber threats.",
    author: "Jessica Rodriguez",
    date: "2024-01-08",
    readTime: "5 min read",
    category: "Security",
    image: "/api/placeholder/400/250"
  },
  {
    id: 4,
    title: "Building Scalable Microservices Architecture",
    excerpt: "Learn how to design and implement microservices that can scale with your business growth.",
    author: "David Park",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Architecture",
    image: "/api/placeholder/400/250"
  },
  {
    id: 5,
    title: "The Rise of Progressive Web Applications",
    excerpt: "Why PWAs are becoming the preferred choice for modern web development and user experience.",
    author: "Emma Thompson",
    date: "2024-01-03",
    readTime: "4 min read",
    category: "Web Development",
    image: "/api/placeholder/400/250"
  },
  {
    id: 6,
    title: "Data Analytics Trends Shaping Business Intelligence",
    excerpt: "Discover the latest trends in data analytics and how they're transforming business decision-making.",
    author: "Robert Kim",
    date: "2024-01-01",
    readTime: "6 min read",
    category: "Data Analytics",
    image: "/api/placeholder/400/250"
  },
  {
    id: 7,
    title: "Mobile-First Development: Best Practices and Strategies",
    excerpt: "Essential guidelines for creating mobile-optimized applications that deliver exceptional user experiences.",
    author: "Lisa Wang",
    date: "2023-12-28",
    readTime: "5 min read",
    category: "Mobile Development",
    image: "/api/placeholder/400/250"
  }
];

const categories = ["All", "AI & Innovation", "Cloud Computing", "Security", "Architecture", "Web Development", "Data Analytics", "Mobile Development"];

export default function NewsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <BlurFade delay={0.2} inView>
            <Badge variant="outline" className="mb-6">
              News & Insights
            </Badge>
          </BlurFade>
          
          <BlurFade delay={0.4} inView>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Tech Insights &
              <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Industry Updates
              </span>
            </h1>
          </BlurFade>
          
          <BlurFade delay={0.6} inView>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest trends, insights, and best practices in digital technology, 
              software development, and business transformation.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="mb-12">
              <Badge className="mb-4">Featured Article</Badge>
              <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                        <span className="text-3xl">🚀</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{featuredArticle.category}</p>
                    </div>
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="outline">{featuredArticle.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredArticle.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {featuredArticle.readTime}
                      </div>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{featuredArticle.author}</span>
                      </div>
                      <Button>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlurFade delay={0.2} inView>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Latest Articles
                </h2>
                <p className="text-muted-foreground">
                  Explore our latest insights and industry updates
                </p>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={category === "All" ? "default" : "outline"}
                    size="sm"
                    className="transition-all duration-200"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </BlurFade>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <BlurFade key={article.id} delay={0.4 + index * 0.1} inView>
                <article className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-2">
                        <span className="text-2xl">📚</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{article.category}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-foreground">{article.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(article.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </article>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={1.0} inView>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Articles
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </div>
  );
}
