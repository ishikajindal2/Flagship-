import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Lightbulb, Calendar, ExternalLink } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

const techNews = [
  {
    id: 1,
    title: '5G Revolution in Telecom',
    date: '2024-01-18',
    category: 'Telecom',
    excerpt: 'The latest advancements in 5G technology are transforming how telecom companies deliver services to customers...',
    content: 'The latest advancements in 5G technology are transforming how telecom companies deliver services to customers. With speeds up to 100 times faster than 4G, the possibilities for innovation are endless.\n\nKey Developments:\n1. Enhanced mobile broadband for seamless streaming\n2. Ultra-reliable low latency communications for critical applications\n3. Massive machine-type communications supporting IoT at scale\n4. Network slicing for customized service delivery',
    readTime: '4 min read',
  },
  {
    id: 2,
    title: 'AI in Customer Service',
    date: '2024-01-15',
    category: 'Artificial Intelligence',
    excerpt: 'Telecom providers are implementing advanced AI solutions to enhance customer service experiences and reduce wait times...',
    content: 'Telecom providers are implementing advanced AI solutions to enhance customer service experiences and reduce wait times. These intelligent systems are revolutionizing how companies interact with their customers.\n\nBenefits Include:\n- 24/7 automated customer support\n- Personalized service recommendations\n- Predictive issue resolution\n- Reduced call center volumes by up to 35%\n- Improved customer satisfaction scores',
    readTime: '3 min read',
  },
  {
    id: 3,
    title: 'Cloud Infrastructure Expansion',
    date: '2024-01-12',
    category: 'Cloud Computing',
    excerpt: 'Major telecom players are investing heavily in cloud infrastructure to support growing demands for data services...',
    content: 'Major telecom players are investing heavily in cloud infrastructure to support growing demands for data services. This shift enables more flexible and scalable service delivery models.\n\nIndustry Trends:\n- Hybrid cloud adoption increasing by 35% year-over-year\n- Edge computing deployments near cell towers\n- Strategic partnerships with major cloud providers\n- Reduced capital expenditure through infrastructure sharing',
    readTime: '5 min read',
  },
];

const TechIndustry = () => {
  const [readArticles, setReadArticles] = useState<Set<number>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<typeof techNews[0] | null>(null);

  const handleArticleClick = (article: typeof techNews[0]) => {
    setReadArticles(prev => new Set(prev).add(article.id));
    setSelectedArticle(article);
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-primary p-2">
            <Lightbulb className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">New in Tech Industry</h2>
            <p className="text-muted-foreground">Latest trends and innovations</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {techNews.map((article, index) => (
            <Card 
              key={article.id} 
              className={`shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                readArticles.has(article.id) ? 'bg-muted/30' : 'bg-card'
              }`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              onClick={() => handleArticleClick(article)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="text-xs text-muted-foreground">{article.readTime}</div>
                </div>
                <CardTitle className={`text-lg ${!readArticles.has(article.id) ? 'font-bold' : 'font-semibold'}`}>
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={`mb-4 text-sm leading-relaxed ${
                  !readArticles.has(article.id) ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {article.excerpt}
                </CardDescription>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedArticle} onOpenChange={(open) => !open && setSelectedArticle(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedArticle?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{selectedArticle?.category}</Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {selectedArticle && new Date(selectedArticle.date).toLocaleDateString()}
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                {selectedArticle?.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-3 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TechIndustry;