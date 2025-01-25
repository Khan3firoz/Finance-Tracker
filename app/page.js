import { Bank } from "@phosphor-icons/react/dist/ssr";
import Header from "./components/Navbar/Header";
import Sidebar from "./components/Navbar/Sidebar";
import Content from "./components/Content";
import HorizontalBarChart from "./components/HorizontalBarChart";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}
