import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage.tsx";
import SuperheroDetailsPage from "./pages/SuperheroDetailsPage.tsx";
import CreateEditPage from "./pages/CreateEditPage.tsx";
import RootLayout from "./layouts/RootLayout.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/superheroes/:id" element={<SuperheroDetailsPage />} />
            <Route path="/create" element={<CreateEditPage />} />
            <Route path="/edit/:id" element={<CreateEditPage />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
