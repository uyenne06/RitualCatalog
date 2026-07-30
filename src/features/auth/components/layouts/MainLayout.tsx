import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuthStore } from "../../store";
import { Sun, Moon, UserCircle, LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useLogoutMutation } from "../../hooks/useAuth";
import { ModeToggle } from "@/shared/components/ui/mode.toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export default function MainLayout() {
  const isAuthed = useAuthStore((state) => !!state.accessToken);

  const logoutMutation = useLogoutMutation(); // khai báo

  const onSubmit = async () => {
    logoutMutation.mutate();
  };

  const [theme, setTheme] = useState("light");

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <ModeToggle />
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
        {/* ===== HEADER ===== */}
        <header className="border-b sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-8">
            <div className="flex items-center gap-8 md:gap-12">
              <Link
                to="/"
                className="text-xl font-bold tracking-tight flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center font-black shadow-sm">
                  S
                </div>
                ShopApp
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                <Link to="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
                {isAuthed && (
                  <Link
                    to="/profile"
                    className="transition-colors hover:text-primary"
                  >
                    Profile
                  </Link>
                )}
                <Link
                  to="/rituals"
                  className="transition-colors hover:text-primary"
                >
                  Rituals
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              {isAuthed ? (
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={logoutMutation.isPending}
                  onClick={onSubmit}
                >
                  {logoutMutation.isPending && (
                    <LogOut className="w-4 h-4 mr-2" />
                  )}
                  {logoutMutation.isPending ? "Đang đăng xuất..." : "Logout"}
                </Button>
              ) : (
                <Button asChild variant="default" size="sm">
                  <Link to="/login">
                    <UserCircle className="w-4 h-4 mr-2" /> Đăng nhập
                  </Link>
                </Button>
              )}
              <div className="h-5 w-px bg-border mx-1 hidden sm:block"></div>

              <Button asChild variant="default" size="sm">
                <Link to="/register">
                  <UserCircle className="w-4 h-4 mr-2" /> Đăng ký
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-9 h-9"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <Moon className="h-[1.2rem] w-[1.2rem] text-slate-600" />
                ) : (
                  <Sun className="h-[1.2rem] w-[1.2rem] text-slate-300" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* ===== MAIN CONTENT ===== */}
        <main className="flex-1 container mx-auto w-full p-4 md:p-8">
          {/* Bọc toàn bộ Outlet bằng Card giống hệt code mẫu của bà */}
          <Card className="shadow-md border-slate-200 dark:border-slate-800">
            <CardHeader className="border-b pb-4 mb-4">
              <CardTitle className="text-2xl font-bold">
                Welcome to ShopApp
              </CardTitle>
              <CardDescription>
                Explore our amazing products and enjoy seamless shopping
                experience.
              </CardDescription>
            </CardHeader>

            {/* Nội dung thực sự của các trang con chui vào đây */}
            <CardContent className="min-h-[400px]">
              <Outlet />
            </CardContent>
          </Card>
        </main>

        {/* ===== FOOTER ===== */}
        <footer className="border-t bg-white dark:bg-slate-900">
          <div className="container mx-auto p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
            <p>© 2026 ShopApp. Built with React & shadcn/ui.</p>
            <div className="flex gap-4">
              <Link to="#" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link to="#" className="hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
