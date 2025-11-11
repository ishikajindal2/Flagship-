import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadershipNotes from '@/components/sections/LeadershipNotes';
import LinkedInFeed from '@/components/sections/LinkedInFeed';
import RewardsRecognition from '@/components/sections/RewardsRecognition';
import CompanyAnnouncements from '@/components/sections/CompanyAnnouncements';
import TechIndustry from '@/components/sections/TechIndustry';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAdminContent, fetchUserProfile } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['homeData', user?.username],
    queryFn: () => {
      if (user?.role === 'admin' && user.password) {
        return fetchAdminContent(user.username, user.password);
      }
      if (user?.role === 'user' && user.password) {
        return fetchUserProfile(user.username, user.password);
      }
      return null;
    },
    enabled: !!user && !!user.password, // Only run query if user and password exist
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              {user?.role === 'admin' ? 'Admin Dashboard' : 'Your personal workspace'}
            </p>
          </div>
          
          {user?.role === 'admin' && (
            <Button onClick={() => navigate('/admin')} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Documents
            </Button>
          )}
        </div>

        <div className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <LeadershipNotes notes={data?.leadership_notes} />
            <LinkedInFeed />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <RewardsRecognition />
            <CompanyAnnouncements announcements={data?.organization_announcement} />
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <TechIndustry />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
