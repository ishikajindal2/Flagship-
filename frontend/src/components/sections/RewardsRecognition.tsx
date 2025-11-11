import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Star, Trophy, Medal } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

const recognitions = [
  {
    id: 1,
    recipient: 'Alex Thompson',
    award: 'Employee of the Month',
    category: 'Excellence',
    description: 'Outstanding performance in Q4 project delivery, demonstrating exceptional leadership and technical skills.',
    icon: Trophy,
    color: 'text-yellow-500',
    date: 'January 2024',
  },
  {
    id: 2,
    recipient: 'Maria Garcia',
    award: 'Innovation Award',
    category: 'Innovation',
    description: 'Created groundbreaking automation solution that increased team productivity by 40%.',
    icon: Star,
    color: 'text-blue-500',
    date: 'January 2024',
  },
  {
    id: 3,
    recipient: 'David Kim',
    award: 'Team Player Award',
    category: 'Collaboration',
    description: 'Exceptional mentorship and collaboration across multiple departments.',
    icon: Medal,
    color: 'text-purple-500',
    date: 'December 2023',
  },
  {
    id: 4,
    recipient: 'Lisa Chen',
    award: 'Customer Champion',
    category: 'Service',
    description: 'Consistently delivered exceptional customer experiences with 98% satisfaction rating.',
    icon: Award,
    color: 'text-green-500',
    date: 'December 2023',
  },
];

const RewardsRecognition = () => {
  const [readRewards, setReadRewards] = useState<Set<number>>(new Set());

  const handleRewardClick = (id: number) => {
    setReadRewards(prev => new Set(prev).add(id));
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-primary p-2">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Rewards & Recognition</h2>
            <p className="text-muted-foreground">Celebrating our team's achievements</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {recognitions.map((recognition, index) => {
          const IconComponent = recognition.icon;
            return (
              <Card 
                key={recognition.id} 
                className={`shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  readRewards.has(recognition.id) ? 'bg-muted/30' : 'bg-card'
                }`}
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                onClick={() => handleRewardClick(recognition.id)}
              >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-accent p-3">
                    <IconComponent className={`h-6 w-6 ${recognition.color}`} />
                  </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <CardTitle className={`text-lg ${!readRewards.has(recognition.id) ? 'font-bold' : 'font-semibold'}`}>
                          {recognition.award}
                        </CardTitle>
                        <Badge variant="secondary">{recognition.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {recognition.recipient.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardDescription className={`font-medium ${
                            !readRewards.has(recognition.id) ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {recognition.recipient}
                          </CardDescription>
                          <CardDescription className="text-xs">
                            {recognition.date}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                </div>
              </CardHeader>
                <CardContent>
                  <p className={`text-sm leading-relaxed ${
                    !readRewards.has(recognition.id) ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {recognition.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
};

export default RewardsRecognition;
