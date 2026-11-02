import { Outlet } from "react-router-dom";
import SideBar from "../components/shared/SideBar";
import TopBar from "../components/shared/TopBar";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 flex flex-col py-8 px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;