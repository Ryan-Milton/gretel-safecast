import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header className="top-0 flex h-8 items-center gap-4 bg-background px-4 md:px-6">
        <nav className="hidden w-full px-4 justify-between flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            to="/"
            className="text-muted-foreground transition-colors hover:text-foreground [&.active]:font-semibold"
          >
            Expanding Table
          </Link>
          <Link
            to="/routed-table"
            className="text-muted-foreground transition-colors hover:text-foreground [&.active]:font-semibold"
          >
            Routed Table
          </Link>
        </nav>
      </header>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
