import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  AnchorHTMLAttributes,
} from 'react';

interface RouterContextType {
  currentPath: string;
  queryParams: URLSearchParams;
  currentQuery: URLSearchParams;
  hash: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

// Helper to normalize path
function normalizePath(pathname: string): string {
  if (!pathname || pathname === '') return '/';
  const clean = pathname.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return normalizePath(window.location.pathname);
  });

  const [queryParams, setQueryParams] = useState<URLSearchParams>(() => {
    return new URLSearchParams(window.location.search);
  });

  const [hash, setHash] = useState<string>(() => window.location.hash);

  const updateRouteState = useCallback(() => {
    const normPath = normalizePath(window.location.pathname);
    setCurrentPath(normPath);
    setQueryParams(new URLSearchParams(window.location.search));
    setHash(window.location.hash);

    // Scroll handling
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      updateRouteState();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [updateRouteState]);

  const navigate = useCallback(
    (to: string, options?: { replace?: boolean }) => {
      // Support relative and absolute paths
      if (options?.replace) {
        window.history.replaceState(null, '', to);
      } else {
        window.history.pushState(null, '', to);
      }
      updateRouteState();
    },
    [updateRouteState]
  );

  return (
    <RouterContext.Provider value={{ currentPath, queryParams, currentQuery: queryParams, hash, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Router = RouterProvider;

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

// Accessible Link Component
interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  to,
  replace = false,
  children,
  onClick,
  className,
  ...props
}) => {
  const { navigate, currentPath } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Check if user is opening in new tab / window (Ctrl/Cmd/Shift click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    navigate(to, { replace });
  };

  const isActive = currentPath === normalizePath(to.split('?')[0].split('#')[0]);

  return (
    <a
      href={to}
      onClick={handleClick}
      className={className}
      data-active={isActive ? 'true' : undefined}
      {...props}
    >
      {children}
    </a>
  );
};
