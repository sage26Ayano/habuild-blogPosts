import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { HashRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import Header from "@/components/Layout/Header";
import PostsList from "@/pages/PostsList";
import PostDetails from "@/pages/PostDetails";
import NotFound from "@/pages/NotFound";

const App = () => (
  <Provider store={store}>
    <Toaster />
    <HashRouter>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/post/:id" element={<PostDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  </Provider>
);

export default App;
