import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

type Note = {
  leader_name: string;
  leader_message: string;
};

interface LeadershipNotesProps {
  notes?: Note[];
}

const LeadershipNotes = ({ notes = [] }: LeadershipNotesProps) => {
  const [readNotes, setReadNotes] = useState<Set<number>>(new Set());
  const [selectedNote, setSelectedNote] = useState<
    | (Note & {
        id: number;
        title: string;
        excerpt: string;
        content: string;
        author: string;
        date: string;
        category: string;
        readTime: string;
      })
    | null
  >(null);

  const leadershipNotes = notes.map((note, i) => ({ ...note, id: i, title: `A Note from ${note.leader_name}`, excerpt: note.leader_message, content: note.leader_message, author: note.leader_name, date: new Date().toISOString(), category: 'Leadership', readTime: '2 min read' }));

  const handleNoteClick = (note: typeof leadershipNotes[0]) => {
    setSelectedNote(note);
    setReadNotes(prev => new Set(prev).add(note.id));
  };

  return (
    <section className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Leadership Notes</h2>
          <p className="text-muted-foreground">Updates from executive leadership</p>
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {leadershipNotes.map((note, index) => (
            <Card 
              key={note.id} 
              className={`shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                readNotes.has(note.id) ? 'bg-muted/30' : 'bg-card'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleNoteClick(note)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{note.category}</Badge>
                  <span className="text-xs text-muted-foreground">{note.readTime}</span>
                </div>
                <CardTitle className={`text-lg ${!readNotes.has(note.id) ? 'font-bold' : 'font-semibold'}`}>
                  {note.title}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <User className="h-3 w-3" />
                  {note.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-sm mb-4 ${
                  !readNotes.has(note.id) ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {note.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(note.date).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Dialog open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedNote?.title}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {selectedNote?.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {selectedNote?.date && new Date(selectedNote.date).toLocaleDateString()}
                </div>
                <Badge variant="secondary">{selectedNote?.category}</Badge>
              </div>
              <div className="prose prose-sm max-w-none">
                {selectedNote?.content.split('\n').map((paragraph, idx) => (
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

export default LeadershipNotes;
