import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage.tsx";
import SuperheroDetailsPage from "./pages/SuperheroDetailsPage.tsx";
import CreateSuperheroPage from "./pages/CreateSuperheroPage.tsx";
import EditSuperheroPage from "./pages/EditSuperheroPage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="superheroes/:id" element={<SuperheroDetailsPage />} />
            <Route path="create" element={<CreateSuperheroPage />} />
            <Route path="edit/:id" element={<EditSuperheroPage />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
