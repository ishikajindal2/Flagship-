import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Megaphone, Calendar, Pin, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

type Announcement = { url: string };

interface CompanyAnnouncementsProps {
  announcements?: Announcement[];
}

const priorityColors = {
  high: 'bg-destructive text-destructive-foreground',
  medium: 'bg-primary text-primary-foreground',
  low: 'bg-secondary text-secondary-foreground',
};

const CompanyAnnouncements = ({ announcements: initialAnnouncements = [] }: CompanyAnnouncementsProps) => {
  const mappedAnnouncements = initialAnnouncements.map((ann, i) => ({ id: i, title: `Announcement #${i + 1}`, description: 'Click to view details.', fullContent: `Details for announcement from URL: ${ann.url}`, url: ann.url, category: 'General', priority: 'medium' as const, date: new Date().toISOString(), isPinned: false }));

  const [announcements, setAnnouncements] = useState(mappedAnnouncements);
  const [readAnnouncements, setReadAnnouncements] = useState<Set<number>>(new Set());
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof announcements[0] | null>(null);

  const handleAnnouncementClick = (announcement: typeof announcements[0]) => {
    setSelectedAnnouncement(announcement);
    setReadAnnouncements(prev => new Set(prev).add(announcement.id));
  };

  const togglePin = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setAnnouncements(prev => 
      prev.map(ann => 
        ann.id === id ? { ...ann, isPinned: !ann.isPinned } : ann
      ).sort((a, b) => {
        if (a.isPinned === b.isPinned) return 0;
        return a.isPinned ? -1 : 1;
      })
    );
    toast.success('Announcement ' + (announcements.find(a => a.id === id)?.isPinned ? 'unpinned' : 'pinned'));
  };

  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-primary p-2">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-1">Company Announcements</h2>
            <p className="text-muted-foreground">Important updates and news</p>
          </div>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {announcements.map((announcement, index) => (
            <Card 
              key={announcement.id} 
              className={`shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer ${
                announcement.isPinned ? 'border-primary' : ''
              } ${
                readAnnouncements.has(announcement.id) ? 'bg-muted/30' : 'bg-card'
              }`}
              style={{ animationDelay: `${0.6 + index * 0.05}s` }}
              onClick={() => handleAnnouncementClick(announcement)}
            >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      
                      <CardTitle className={`text-lg ${!readAnnouncements.has(announcement.id) ? 'font-bold' : 'font-semibold'}`}>
                        {announcement.title}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{announcement.category}</Badge>
                      <Badge className={priorityColors[announcement.priority]}>
                        {announcement.priority} priority
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => togglePin(announcement.id, e)}
                    className="shrink-0"
                  >
                    <Pin className={`h-4 w-4 ${announcement.isPinned ? 'fill-primary text-primary' : ''}`} />
                  </Button>
                </div>
            </CardHeader>
              <CardContent>
                <CardDescription className={`mb-4 text-sm leading-relaxed ${
                  !readAnnouncements.has(announcement.id) ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {announcement.description}
                </CardDescription>
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(announcement.date).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedAnnouncement} onOpenChange={(open) => !open && setSelectedAnnouncement(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-2">
              {selectedAnnouncement?.isPinned && (
                <Pin className="h-4 w-4 text-primary fill-primary" />
              )}
              <DialogTitle className="text-2xl">{selectedAnnouncement?.title}</DialogTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline">{selectedAnnouncement?.category}</Badge>
              {selectedAnnouncement && (
                <Badge className={priorityColors[selectedAnnouncement.priority]}>
                  {selectedAnnouncement.priority} priority
                </Badge>
              )}
            </div>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedAnnouncement?.date && new Date(selectedAnnouncement.date).toLocaleDateString()}
                </div>
              </div>
              <div className="prose prose-sm max-w-none">
                {selectedAnnouncement?.fullContent.split('\n').map((paragraph, idx) => (
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

export default CompanyAnnouncements;
