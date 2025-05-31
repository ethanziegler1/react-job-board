import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import AddJobPage from './pages/AddJobPage';
import JobPage, { jobLoader } from './pages/JobPage';
import EditJobPage from './pages/EditJobPage';

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  };
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });
    } catch (e) {
      console.log(e);
    }
    return;
  };
  const editJob = async (editedJob) => {
    try {
      const res = await fetch(`/api/jobs/${editedJob.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedJob)
      });
    } catch (e) {
      console.log('Error editing job:', e);
    }
    return;
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={<JobsPage />} />
        <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
        <Route path='/jobs/:id' loader={jobLoader} element={<JobPage deleteJob={deleteJob} />}></Route>
        <Route path='/edit-job/:id' loader={jobLoader} element={<EditJobPage editJobSubmit={editJob} />}></Route>
        {/* Catch-all route for 404 Not Found */}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
