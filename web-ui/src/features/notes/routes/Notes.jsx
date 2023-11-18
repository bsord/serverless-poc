import {NotesView} from '../components/NotesView';
import NotesProvider from '../contexts/NotesContext';
import {Layout} from '../components/Layout';

export const Notes = () => {
  return (
    <Layout title="Notes">
      <NotesProvider>
        <NotesView/>
      </NotesProvider>
    </Layout>
  );
}