
import NotesView from '../views/NotesView';
import NotesProvider from '../contexts/NotesContext';
import {MainLayout} from '../components/Layouts';

const NotePage = () => {
  return (
    <MainLayout title="Notes">
      <NotesProvider>
        <NotesView />
      </NotesProvider>
    </MainLayout>
  );
}
export default NotePage;
