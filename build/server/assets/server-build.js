import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import * as React from 'react';
import React__default, { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback } from 'react';
import { useButton } from '@react-aria/button';
import { f as fetchWithHeaders } from './index-Dso1OIu2.js';
import { SessionProvider, signIn, signOut, useSession } from '@hono/auth-js/react';
import { toPng } from 'html-to-image';
import { serializeError } from 'serialize-error';
import { Toaster, toast } from 'sonner';
import { useIdleTimer } from 'react-idle-timer';
import { QueryClientProvider, QueryClient, useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Sun, Moon, Smartphone, Globe, Code2, Plus, ArrowUp, LayoutDashboard, PlusCircle, Settings, ShieldCheck, LogOut, Server, Zap, Edit3, CheckCircle2, AlertCircle, RefreshCcw, Save, Users, Package, Terminal, Activity, TrendingUp, ShieldAlert, Info, ExternalLink, Play, ArrowLeft, AlertTriangle, Image as Image$1, Palette, RotateCcw, Monitor, ArrowRight, BellRing, Camera, MapPin, Fingerprint, Rocket, Trash2, History, Clock, Download, BookOpen } from 'lucide-react';
import { useParams } from 'react-router-dom';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import '@neondatabase/serverless';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import 'ws';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-ignore
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match?.[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry]) => {
        const {
          width,
          height
        } = entry.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

function useDevServerHeartbeat() {
  useIdleTimer({
    disabled: typeof window === "undefined",
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
const LoadFontsSSR = LoadFonts ;
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  const shouldScale = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const scaleFactor = shouldScale ? 1.02 : 1;
  const copyButtonTextClass = shouldScale ? "text-sm" : "text-xs";
  const copyButtonPaddingClass = shouldScale ? "px-[10px] py-[5px]" : "px-[6px] py-[3px]";
  const postCountRef = useRef(0);
  const lastPostTimeRef = useRef(0);
  const lastErrorKeyRef = useRef(null);
  const MAX_ERROR_POSTS_PER_ERROR = 5;
  const THROTTLE_MS = 1e3;
  useEffect(() => {
    const serialized = serializeError(error);
    const errorKey = JSON.stringify(serialized);
    if (errorKey !== lastErrorKeyRef.current) {
      lastErrorKeyRef.current = errorKey;
      postCountRef.current = 0;
    }
    if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
      return;
    }
    const now = Date.now();
    const timeSinceLastPost = now - lastPostTimeRef.current;
    const post = () => {
      if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
        return;
      }
      postCountRef.current += 1;
      lastPostTimeRef.current = Date.now();
      window.parent.postMessage({
        type: "sandbox:error:detected",
        error: serialized
      }, "*");
    };
    if (timeSinceLastPost < THROTTLE_MS) {
      const timer = setTimeout(post, THROTTLE_MS - timeSinceLastPost);
      return () => clearTimeout(timer);
    }
    post();
  }, [error]);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      const toastScale = shouldScale ? 1.2 : 1;
      const toastStyle = {
        padding: `${16 * toastScale}px`,
        background: "#18191B",
        border: "1px solid #2C2D2F",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: `${280 * toastScale}px`,
        fontSize: `${13 * toastScale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${6 * toastScale}px`,
        justifyContent: "flex-start",
        margin: "0 auto"
      };
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        style: toastStyle,
        renderId: "render-e4b49473",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          height: "20",
          width: "20",
          children: [/* @__PURE__ */ jsx("title", {
            children: "Success"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd",
            renderId: "render-659fb15e",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-ac353cdf",
          as: "span",
          children: "Copied successfully!"
        })]
      }), {
        id: "copy-error-success",
        duration: 3e3
      });
    }, [error, shouldScale])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: !isInIframe() && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      style: {
        width: "75vw"
      },
      renderId: "render-a162e50e",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 shadow-lg w-full",
        style: scaleFactor !== 1 ? {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom center"
        } : void 0,
        renderId: "render-95e80641",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start gap-3",
          renderId: "render-b01be93b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-shrink-0",
            renderId: "render-dd95695e",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
              renderId: "render-7d53297d",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-black text-[1.125rem] leading-none",
                renderId: "render-5009fc5a",
                as: "span",
                children: "!"
              })
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-2 flex-1",
            renderId: "render-40dc1639",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col gap-1",
              renderId: "render-a0b6a6e6",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-light text-[#F2F2F2] text-sm",
                renderId: "render-3ed3b9b1",
                as: "p",
                children: "App Error Detected"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[#959697] text-sm font-light",
                renderId: "render-1f6a3cd8",
                as: "p",
                children: "It looks like an error occurred while trying to use your app."
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white ${copyButtonTextClass} ${copyButtonPaddingClass} w-fit`,
              type: "button",
              ...copyButtonProps,
              renderId: "render-39754c7c",
              as: "button",
              children: "Copy error"
            })]
          })]
        })
      })
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected,
      supportsErrorDetected: true
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(Toaster, {
        position: isMobile ? "top-center" : "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

const themeScript = `
(function(){
  try {
    var s = localStorage.getItem('theme');
    if (s === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
  } catch(e){}
})();
`;
function ThemeScript() {
  return /* @__PURE__ */ jsx("script", {
    dangerouslySetInnerHTML: {
      __html: themeScript
    }
  });
}
function useTheme() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return {
    dark,
    toggle
  };
}
function ThemeToggle({
  className = ""
}) {
  const {
    dark,
    toggle
  } = useTheme();
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    onClick: toggle,
    title: dark ? "Helles Design" : "Dunkles Design",
    className: `p-1.5 rounded-md transition-colors hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 ${className}`,
    renderId: "render-3456a6f1",
    as: "button",
    children: dark ? /* @__PURE__ */ jsx(Sun, {
      size: 15
    }) : /* @__PURE__ */ jsx(Moon, {
      size: 15
    })
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      cacheTime: 1e3 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsxs(QueryClientProvider, {
    client: queryClient,
    children: [/* @__PURE__ */ jsx(ThemeScript, {}), children]
  });
}

function ThemeToggleBtn() {
  const {
    dark,
    toggle
  } = useTheme();
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    onClick: toggle,
    className: "p-2 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors",
    renderId: "render-763ef8d5",
    as: "button",
    children: dark ? /* @__PURE__ */ jsx(Sun, {
      size: 16
    }) : /* @__PURE__ */ jsx(Moon, {
      size: 16
    })
  });
}
const BUILD_TYPES = [{
  id: "webview",
  label: "WebView App",
  icon: Smartphone
}, {
  id: "twa",
  label: "TWA",
  icon: Globe
}, {
  id: "standalone",
  label: "Standalone",
  icon: Code2
}];
function LandingPage() {
  const [url, setUrl] = useState("");
  const [buildType, setBuildType] = useState("webview");
  const [mouse, setMouse] = useState({
    x: 0.5,
    y: 0
  });
  const rafRef = useRef(null);
  const targetRef = useRef({
    x: 0.5,
    y: 0
  });
  const currentRef = useRef({
    x: 0.5,
    y: 0
  });
  const animate = useCallback(() => {
    const cur = currentRef.current;
    const tgt = targetRef.current;
    cur.x += (tgt.x - cur.x) * 0.06;
    cur.y += (tgt.y - cur.y) * 0.06;
    setMouse({
      x: cur.x,
      y: cur.y
    });
    rafRef.current = requestAnimationFrame(animate);
  }, []);
  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    window.location.href = `/account/signup?url=${encodeURIComponent(url)}&type=${buildType}`;
  };
  const beamX = 50 + (mouse.x - 0.5) * 60;
  const beamY = -10 + mouse.y * 20;
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-black text-white font-sans overflow-hidden",
    renderId: "render-7bb5195a",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "pointer-events-none fixed inset-0 z-0",
      renderId: "render-28f2fa78",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0 transition-none",
        style: {
          background: `radial-gradient(ellipse 70% 55% at ${beamX}% ${beamY}%, rgba(99,102,241,0.22) 0%, rgba(59,130,246,0.12) 35%, transparent 70%)`
        },
        renderId: "render-d30a34e2",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0",
        style: {
          background: `conic-gradient(from ${90 + (mouse.x - 0.5) * 40}deg at ${beamX}% -5%, transparent 80deg, rgba(139,92,246,0.08) 90deg, rgba(99,102,241,0.15) 95deg, rgba(139,92,246,0.08) 100deg, transparent 120deg)`
        },
        renderId: "render-9cf0a640",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full",
        style: {
          left: `${beamX}%`,
          top: `${beamY + 20}%`,
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(40px)"
        },
        renderId: "render-7b4e2eab",
        as: "div"
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 flex items-center justify-between px-8 py-5",
      renderId: "render-0f33be94",
      as: "nav",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        href: "/",
        className: "flex items-center gap-2",
        renderId: "render-9ac50be8",
        as: "a",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          src: "/easyapk-logo.jpg?v=3",
          className: "h-12 w-12 object-contain",
          style: {
            mixBlendMode: "screen",
            clipPath: "circle(46%)",
            filter: "brightness(1.1)"
          },
          alt: "EasyApk",
          renderId: "render-621df8be",
          as: "img"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm font-semibold text-white tracking-tight",
          renderId: "render-c8ce2cc2",
          as: "span",
          children: "EasyApk"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-1",
        renderId: "render-7d4de881",
        as: "div",
        children: [/* @__PURE__ */ jsx(ThemeToggleBtn, {}), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          href: "/account/signin",
          className: "px-4 py-1.5 text-sm text-zinc-400 hover:text-white transition-colors",
          renderId: "render-553d13af",
          as: "a",
          children: "Anmelden"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          href: "/account/signup",
          className: "px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium text-white transition-colors",
          renderId: "render-299d5969",
          as: "a",
          children: "Kostenlos starten"
        })]
      })]
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-12",
      renderId: "render-d0593936",
      as: "section",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-2 mb-8 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm",
        renderId: "render-9b16a96d",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wide",
          renderId: "render-89fe0a3a",
          as: "span",
          children: "NEU"
        }), "PWA zu Android APK — in Minuten →"]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-center text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4 max-w-2xl",
        renderId: "render-268e018c",
        as: "h1",
        children: ["Denk es nicht", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-ab07b454",
          as: "br"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-serif italic font-normal text-zinc-300",
          renderId: "render-24f3a3cd",
          as: "em",
          children: "bau"
        }), " ", "es."]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-zinc-500 text-center text-base mb-12 max-w-md",
        renderId: "render-24795bdb",
        as: "p",
        children: "Gib deine PWA-URL ein und erhalte in Minuten eine fertige Android-APK. Ohne Programmierkenntnisse."
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "w-full max-w-2xl",
        renderId: "render-062ac252",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onSubmit: handleSubmit,
          renderId: "render-10723412",
          as: "form",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "rounded-2xl border border-white/10 p-1",
            style: {
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)"
            },
            renderId: "render-e94ee1b6",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex gap-1 px-3 pt-3 mb-3",
              renderId: "render-c4e21411",
              as: "div",
              children: BUILD_TYPES.map((t) => {
                const Icon = t.icon;
                return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  type: "button",
                  onClick: () => setBuildType(t.id),
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${buildType === t.id ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`,
                  renderId: "render-5be2d2a7",
                  as: "button",
                  children: [/* @__PURE__ */ jsx(Icon, {
                    size: 12
                  }), t.label]
                }, t.id);
              })
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "px-3 pb-2",
              renderId: "render-ced597d5",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "url",
                value: url,
                onChange: (e) => setUrl(e.target.value),
                placeholder: "https://deine-pwa.de eingeben…",
                className: "w-full bg-transparent text-white placeholder:text-zinc-600 text-sm outline-none py-2 resize-none",
                renderId: "render-c317ffba",
                as: "input"
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center justify-between px-3 pb-3",
              renderId: "render-8695335b",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2",
                renderId: "render-4ab4fa7c",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  type: "button",
                  className: "flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors",
                  renderId: "render-7445e958",
                  as: "button",
                  children: [/* @__PURE__ */ jsx(Plus, {
                    size: 11
                  }), "Icon"]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-zinc-600",
                  renderId: "render-7a1fb9c3",
                  as: "span",
                  children: "EasyApk v2.2"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "submit",
                disabled: !url.trim(),
                className: "flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                renderId: "render-d17ee33e",
                as: "button",
                children: /* @__PURE__ */ jsx(ArrowUp, {
                  size: 15,
                  className: "text-white"
                })
              })]
            })]
          })
        })
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "relative z-10 mt-8 px-6 pb-20",
      renderId: "render-3faf18b7",
      as: "section",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mx-auto max-w-3xl grid grid-cols-3 gap-3",
        renderId: "render-a04a111c",
        as: "div",
        children: [{
          label: "WebView & TWA",
          sub: "Beide Build-Modi"
        }, {
          label: "Push & Offline",
          sub: "Native Funktionen"
        }, {
          label: "Play-Store-fertig",
          sub: "Signierte APK"
        }].map((f) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "rounded-xl border border-white/8 p-4 text-center",
          style: {
            background: "rgba(255,255,255,0.03)"
          },
          renderId: "render-b33a77bc",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs font-semibold text-white mb-0.5",
            renderId: "render-e6f81156",
            as: "div",
            children: f.label
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-[11px] text-zinc-600",
            renderId: "render-37692cc8",
            as: "div",
            children: f.sub
          })]
        }, f.label))
      })
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "relative z-10 border-t border-white/5 py-5 px-6 text-center text-xs text-zinc-700",
      renderId: "render-8a01d68b",
      as: "footer",
      children: "© 2026 EasyApk. Alle Rechte vorbehalten."
    })]
  });
}

const page$9 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(LandingPage, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$9
}, Symbol.toStringTag, { value: 'Module' }));

function useAuth() {
  const callbackUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('callbackUrl') : null;
  const signInWithCredentials = useCallback(options => {
    return signIn("credentials-signin", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signUpWithCredentials = useCallback(options => {
    return signIn("credentials-signup", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signInWithGoogle = useCallback(options => {
    return signIn("google", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signInWithFacebook = useCallback(options => {
    return signIn("facebook", options);
  }, []);
  const signInWithTwitter = useCallback(options => {
    return signIn("twitter", options);
  }, []);
  const signInWithApple = useCallback(options => {
    return signIn("apple", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut
  };
}

function MainComponent$2() {
  const {
    signOut
  } = useAuth();
  useEffect(() => {
    signOut({
      callbackUrl: "/",
      redirect: true
    });
  }, [signOut]);
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-[#0a0a0f] p-4 text-white",
    renderId: "render-c8a7b209",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "text-center",
      renderId: "render-ce9eb5d7",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37] mx-auto mb-4",
        renderId: "render-cadcbc78",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400",
        renderId: "render-7d5c56b9",
        as: "p",
        children: "Abmeldung erfolgt..."
      })]
    })
  });
}

const page$8 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(MainComponent$2, {
      ...props
    })
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$8
}, Symbol.toStringTag, { value: 'Module' }));

function MainComponent$1() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signInWithCredentials
  } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError("Bitte alle Felder ausfüllen");
      setLoading(false);
      return;
    }
    try {
      await signInWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true
      });
    } catch (err) {
      setError("Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4",
    renderId: "render-4e03260b",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "absolute top-4 right-4",
      renderId: "render-70892685",
      as: "div",
      children: /* @__PURE__ */ jsx(ThemeToggle, {})
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      noValidate: true,
      onSubmit,
      className: "w-full max-w-sm",
      renderId: "render-da1b80c8",
      as: "form",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex items-center justify-center mb-8",
        renderId: "render-ef2ca1e4",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          src: "/easyapk-logo.jpg?v=3",
          className: "h-16 w-16 object-contain",
          style: {
            mixBlendMode: "screen",
            clipPath: "circle(46%)",
            filter: "brightness(1.1)"
          },
          alt: "EasyApk",
          renderId: "render-913d76a8",
          as: "img"
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-zinc-900 border border-zinc-800 rounded-2xl p-7",
        renderId: "render-0f91865d",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mb-6 text-center",
          renderId: "render-ceaf2d00",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-bold text-white mb-1",
            renderId: "render-2eccf25b",
            as: "h1",
            children: "Willkommen zurück"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-zinc-500 text-sm",
            renderId: "render-833eb72b",
            as: "p",
            children: "Bei deinem Konto anmelden"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-a477dd5c",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-3ce51942",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-zinc-400 mb-1.5",
              renderId: "render-e8e5b143",
              as: "label",
              children: "E-Mail"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              required: true,
              name: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "du@beispiel.de",
              className: "w-full px-3 py-2.5 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors",
              renderId: "render-15f270f2",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-c3e3ae5e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-zinc-400 mb-1.5",
              renderId: "render-9b1abdab",
              as: "label",
              children: "Passwort"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              required: true,
              name: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "••••••••",
              className: "w-full px-3 py-2.5 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors",
              renderId: "render-11f73498",
              as: "input"
            })]
          }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2.5 text-xs text-red-400",
            renderId: "render-dff1a904",
            as: "div",
            children: error
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: loading,
            className: "w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors",
            renderId: "render-0b12c8ca",
            as: "button",
            children: loading ? "Anmeldung läuft…" : "Anmelden"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center text-xs text-zinc-500",
            renderId: "render-47aabffe",
            as: "p",
            children: ["Noch kein Konto?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "/account/signup",
              className: "text-zinc-300 hover:text-white font-medium transition-colors",
              renderId: "render-1f759689",
              as: "a",
              children: "Registrieren"
            })]
          })]
        })]
      })]
    })]
  });
}

const page$7 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(MainComponent$1, {
      ...props
    })
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$7
}, Symbol.toStringTag, { value: 'Module' }));

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    signUpWithCredentials
  } = useAuth();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError("Bitte alle Felder ausfüllen");
      setLoading(false);
      return;
    }
    try {
      await signUpWithCredentials({
        email,
        password,
        callbackUrl: "/dashboard",
        redirect: true
      });
    } catch (err) {
      setError("Registrierung fehlgeschlagen. Bitte erneut versuchen.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-zinc-950 p-4",
    renderId: "render-0a8181f0",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "absolute top-4 right-4",
      renderId: "render-cb2a15d4",
      as: "div",
      children: /* @__PURE__ */ jsx(ThemeToggle, {})
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      noValidate: true,
      onSubmit,
      className: "w-full max-w-sm",
      renderId: "render-f25fb4dc",
      as: "form",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex items-center justify-center mb-8",
        renderId: "render-60916f74",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          src: "/easyapk-logo.jpg?v=3",
          className: "h-16 w-16 object-contain",
          style: {
            mixBlendMode: "screen",
            clipPath: "circle(46%)",
            filter: "brightness(1.1)"
          },
          alt: "EasyApk",
          renderId: "render-415f2b3e",
          as: "img"
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-zinc-900 border border-zinc-800 rounded-2xl p-7",
        renderId: "render-24cbf806",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mb-6 text-center",
          renderId: "render-e5247a5b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-bold text-white mb-1",
            renderId: "render-fc63f2f5",
            as: "h1",
            children: "Konto erstellen"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-zinc-500 text-sm",
            renderId: "render-989a80f6",
            as: "p",
            children: "Kostenloses Konto anlegen"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-e6e5be62",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-06ab2ea0",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-zinc-400 mb-1.5",
              renderId: "render-d0563c22",
              as: "label",
              children: "E-Mail"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              required: true,
              name: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              placeholder: "du@beispiel.de",
              className: "w-full px-3 py-2.5 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors",
              renderId: "render-67a724ca",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-b8e6512d",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-zinc-400 mb-1.5",
              renderId: "render-f1d4cddb",
              as: "label",
              children: "Passwort"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              required: true,
              name: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
              placeholder: "••••••••",
              className: "w-full px-3 py-2.5 border border-zinc-700 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors",
              renderId: "render-4a46ec2c",
              as: "input"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "mt-1.5 text-[11px] text-zinc-600",
              renderId: "render-b321909b",
              as: "p",
              children: "Mindestens 8 Zeichen"
            })]
          }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2.5 text-xs text-red-400",
            renderId: "render-25aa6dea",
            as: "div",
            children: error
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: loading,
            className: "w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold disabled:opacity-50 transition-colors",
            renderId: "render-c2fefbd1",
            as: "button",
            children: loading ? "Konto wird erstellt…" : "Konto erstellen"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center text-xs text-zinc-500",
            renderId: "render-6e8f38f0",
            as: "p",
            children: ["Bereits ein Konto?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              href: "/account/signin",
              className: "text-zinc-300 hover:text-white font-medium transition-colors",
              renderId: "render-b8fd0e6d",
              as: "a",
              children: "Anmelden"
            })]
          })]
        })]
      })]
    })]
  });
}

const page$6 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(MainComponent, {
      ...props
    })
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$6
}, Symbol.toStringTag, { value: 'Module' }));

const useUser = () => {
  const {
    data: session,
    status
  } = useSession();
  const id = session?.user?.id;
  const [user, setUser] = React.useState(session?.user ?? null);
  const fetchUser = React.useCallback(async session => {
    return session?.user;
  }, []);
  const refetchUser = React.useCallback(() => {
    if (process.env.NEXT_PUBLIC_CREATE_ENV === "PRODUCTION") {
      if (id) {
        fetchUser(session).then(setUser);
      } else {
        setUser(null);
      }
    }
  }, [fetchUser, id]);
  React.useEffect(refetchUser, [refetchUser]);
  if (process.env.NEXT_PUBLIC_CREATE_ENV !== "PRODUCTION") {
    return {
      user,
      data: session?.user || null,
      loading: status === 'loading',
      refetch: refetchUser
    };
  }
  return {
    user,
    data: user,
    loading: status === 'loading' || status === 'authenticated' && !user,
    refetch: refetchUser
  };
};

function NavLayout({
  children,
  activeTab = "dashboard"
}) {
  const {
    data: user,
    loading
  } = useUser();
  const navLinks = [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  }, {
    id: "new",
    label: "Neues Projekt",
    icon: PlusCircle,
    href: "/projects/new"
  }, {
    id: "settings",
    label: "Einstellungen",
    icon: Settings,
    href: "/settings"
  }, ...user?.role === "admin" ? [{
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    href: "/admin"
  }] : []];
  if (loading) return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen bg-black flex items-center justify-center",
    renderId: "render-8e7f111e",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "animate-spin rounded-full h-8 w-8 border-2 border-zinc-800 border-t-blue-500",
      renderId: "render-a4fd4402",
      as: "div"
    })
  });
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-black text-white",
    renderId: "render-cfb711dd",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "pointer-events-none fixed inset-0 z-0",
      renderId: "render-3bcd7c6f",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]",
        style: {
          background: "radial-gradient(ellipse at top, rgba(29,78,216,0.15) 0%, rgba(109,40,217,0.06) 40%, transparent 70%)"
        },
        renderId: "render-596137d2",
        as: "div"
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "relative z-10 flex items-center gap-4 px-8 py-4 border-b border-white/5",
      renderId: "render-b2afcc79",
      as: "nav",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        href: "/dashboard",
        className: "flex items-center gap-2 mr-4",
        renderId: "render-a3af5398",
        as: "a",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          src: "/easyapk-logo.jpg?v=3",
          className: "h-8 w-8 object-contain",
          style: {
            mixBlendMode: "screen",
            clipPath: "circle(46%)",
            filter: "brightness(1.1)"
          },
          alt: "EasyApk",
          renderId: "render-6c13a436",
          as: "img"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm font-semibold tracking-tight text-white",
          renderId: "render-b3575f02",
          as: "span",
          children: "EasyApk"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex items-center gap-1",
        renderId: "render-ce97eaf8",
        as: "div",
        children: navLinks.map(({
          id,
          label,
          href
        }) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          href,
          className: `px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === id ? "bg-white/8 text-white font-medium" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"}`,
          renderId: "render-ceb35564",
          as: "a",
          children: label
        }, id))
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "ml-auto flex items-center gap-2",
        renderId: "render-466ef5b1",
        as: "div",
        children: [/* @__PURE__ */ jsx(ThemeToggle, {}), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/4",
          renderId: "render-886d880b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-bold shrink-0",
            renderId: "render-e1724471",
            as: "div",
            children: user?.email?.[0]?.toUpperCase() || "U"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-zinc-400 hidden sm:block max-w-[140px] truncate",
            renderId: "render-5955c779",
            as: "span",
            children: user?.email
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          href: "/account/logout",
          className: "p-1.5 rounded-lg text-zinc-600 hover:text-zinc-300 hover:bg-white/5 transition-colors",
          title: "Abmelden",
          renderId: "render-83319de7",
          as: "a",
          children: /* @__PURE__ */ jsx(LogOut, {
            size: 15
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "relative z-10",
      renderId: "render-0091bc2d",
      as: "main",
      children
    })]
  });
}

/**
 * Backend-Konfiguration — hier den Server wechseln
 * Gespeichert in localStorage damit Admin es live umschalten kann
 */

const PRESET_BACKENDS = [{
  id: "local",
  name: "Lokal (Dev)",
  url: "",
  description: "Gleicher Server, relative URLs"
}, {
  id: "production",
  name: "Produktion",
  url: "https://api.easyapk.de",
  description: "Live-Backend"
}, {
  id: "staging",
  name: "Staging",
  url: "https://staging.easyapk.de",
  description: "Test-Umgebung"
}, {
  id: "custom",
  name: "Benutzerdefiniert",
  url: "",
  description: "Eigene URL"
}];
const STORAGE_KEY = "easyapk_backend";
function getBackendConfig() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    id: "local",
    url: ""
  };
}
function setBackendConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  // Seite neu laden damit alle Queries den neuen Backend nutzen
  window.location.reload();
}
function getBaseUrl() {
  try {
    const config = getBackendConfig();
    return config.url || "";
  } catch {
    return "";
  }
}
async function testBackendConnection(url) {
  try {
    const base = url || "";
    const res = await fetch(`${base}/api/admin/stats`, {
      signal: AbortSignal.timeout(5000)
    });
    return {
      ok: true,
      status: res.status
    };
  } catch (e) {
    return {
      ok: false,
      error: e.message
    };
  }
}

/**
 * Zentraler API-Client
 * Alle Backend-Calls laufen hier durch — Backend-URL aus backend-config.js
 */

async function request(path, options = {}) {
  const url = `${getBaseUrl()}${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}
const api = {
  // ── Projekte ──────────────────────────────────────────────
  getProjects: () => request("/api/projects"),
  getProject: id => request(`/api/projects/${id}`),
  createProject: data => request("/api/projects", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  deleteProject: id => request(`/api/projects/${id}`, {
    method: "DELETE"
  }),
  // ── Builds ────────────────────────────────────────────────
  getBuilds: projectId => request(`/api/builds?project_id=${projectId}`),
  createBuild: data => request("/api/builds", {
    method: "POST",
    body: JSON.stringify(data)
  }),
  // ── PWA-Validierung ───────────────────────────────────────
  validatePwa: url => request("/api/validate-pwa", {
    method: "POST",
    body: JSON.stringify({
      url
    })
  }),
  // ── Admin ─────────────────────────────────────────────────
  getAdminStats: () => request("/api/admin/stats")
};

function ServerManager() {
  const [config, setConfig] = useState(getBackendConfig());
  const [customUrl, setCustomUrl] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const c = getBackendConfig();
    setConfig(c);
    if (c.id === "custom") setCustomUrl(c.url || "");
  }, []);
  PRESET_BACKENDS.find((b) => b.id === config.id) || PRESET_BACKENDS[0];
  const handleSelect = (preset) => {
    setTestResult(null);
    if (preset.id === "custom") {
      setConfig({
        id: "custom",
        url: customUrl
      });
    } else {
      setConfig({
        id: preset.id,
        url: preset.url
      });
    }
  };
  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    const url = config.id === "custom" ? customUrl : config.url;
    const result = await testBackendConnection(url);
    setTestResult(result);
    setTesting(false);
  };
  const handleSave = () => {
    setSaving(true);
    const url = config.id === "custom" ? customUrl : config.url;
    setBackendConfig({
      id: config.id,
      url
    });
  };
  const currentUrl = getBaseUrl() || "/ (lokal, relativ)";
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "bg-zinc-900 rounded-2xl border border-zinc-800 p-6",
    renderId: "render-0317489a",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center gap-2 mb-6",
      renderId: "render-066cba07",
      as: "div",
      children: [/* @__PURE__ */ jsx(Server, {
        size: 16,
        className: "text-blue-400"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "font-semibold text-white text-sm",
        renderId: "render-37b48b6a",
        as: "h3",
        children: "Server-Verwaltung"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "ml-auto text-[10px] text-zinc-600 font-mono truncate max-w-[200px]",
        renderId: "render-0c5c0312",
        as: "span",
        children: ["Aktiv: ", currentUrl]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "grid grid-cols-2 gap-2 mb-5",
      renderId: "render-a2e1bd74",
      as: "div",
      children: PRESET_BACKENDS.map((preset) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: () => handleSelect(preset),
        className: `p-3 rounded-xl border text-left transition-all ${config.id === preset.id ? "border-blue-500 bg-blue-600/10" : "border-zinc-700 hover:border-zinc-600"}`,
        renderId: "render-a9163d8a",
        as: "button",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2 mb-1",
          renderId: "render-1b42598e",
          as: "div",
          children: [preset.id === "local" ? /* @__PURE__ */ jsx(Zap, {
            size: 12,
            className: config.id === preset.id ? "text-blue-400" : "text-zinc-500"
          }) : preset.id === "custom" ? /* @__PURE__ */ jsx(Edit3, {
            size: 12,
            className: config.id === preset.id ? "text-blue-400" : "text-zinc-500"
          }) : /* @__PURE__ */ jsx(Globe, {
            size: 12,
            className: config.id === preset.id ? "text-blue-400" : "text-zinc-500"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: `text-xs font-semibold ${config.id === preset.id ? "text-white" : "text-zinc-400"}`,
            renderId: "render-9ee57d54",
            as: "span",
            children: preset.name
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-[10px] text-zinc-600",
          renderId: "render-f8fab933",
          as: "p",
          children: preset.description
        }), preset.url && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-[10px] text-zinc-700 font-mono mt-0.5 truncate",
          renderId: "render-fb7900c8",
          as: "p",
          children: preset.url
        })]
      }, preset.id))
    }), config.id === "custom" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "mb-4",
      renderId: "render-194e8221",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs text-zinc-400 mb-1.5 block",
        renderId: "render-8505a328",
        as: "label",
        children: "Backend-URL"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        type: "url",
        value: customUrl,
        onChange: (e) => {
          setCustomUrl(e.target.value);
          setTestResult(null);
        },
        placeholder: "https://dein-backend.de",
        className: "w-full bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 font-mono",
        renderId: "render-542f7f13",
        as: "input"
      })]
    }), testResult && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `flex items-center gap-2 p-3 rounded-lg border mb-4 text-xs ${testResult.ok ? "bg-emerald-900/20 border-emerald-800 text-emerald-400" : "bg-red-900/20 border-red-800 text-red-400"}`,
      renderId: "render-1e3dd269",
      as: "div",
      children: testResult.ok ? /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(CheckCircle2, {
          size: 13
        }), " Verbindung erfolgreich (HTTP ", testResult.status, ")"]
      }) : /* @__PURE__ */ jsxs(Fragment, {
        children: [/* @__PURE__ */ jsx(AlertCircle, {
          size: 13
        }), " Verbindung fehlgeschlagen: ", testResult.error]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex gap-2",
      renderId: "render-5af692ec",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: handleTest,
        disabled: testing,
        className: "flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-white transition-all disabled:opacity-50",
        renderId: "render-10a30cf1",
        as: "button",
        children: [/* @__PURE__ */ jsx(RefreshCcw, {
          size: 12,
          className: testing ? "animate-spin" : ""
        }), testing ? "Teste…" : "Verbindung testen"]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: handleSave,
        disabled: saving,
        className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold transition-all disabled:opacity-50",
        renderId: "render-0c7bed99",
        as: "button",
        children: [/* @__PURE__ */ jsx(Save, {
          size: 12
        }), "Speichern & Neu laden"]
      })]
    })]
  });
}

function AdminDashboard() {
  const {
    data: stats,
    isLoading
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => api.getAdminStats()
  });
  if (isLoading) return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "admin",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "animate-pulse space-y-8 p-8",
      renderId: "render-683d7da3",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "h-10 w-64 bg-white/5 rounded-lg",
        renderId: "render-244f876e",
        as: "div"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-4 gap-6",
        renderId: "render-7b90a3a0",
        as: "div",
        children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-32 bg-white/5 rounded-2xl",
          renderId: "render-d3f9b016",
          as: "div"
        }, i))
      })]
    })
  });
  if (!stats) return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "admin",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "p-8 text-center text-zinc-400",
      renderId: "render-8a68fa3d",
      as: "div",
      children: "Keine Daten verfügbar oder fehlende Berechtigung."
    })
  });
  return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "admin",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-8",
      renderId: "render-755206d9",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-10",
        renderId: "render-102a2c30",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-3xl font-extrabold tracking-tight mb-2 text-white",
          renderId: "render-75e15d58",
          as: "h1",
          children: ["Admin ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-blue-400",
            renderId: "render-d70e9e7f",
            as: "span",
            children: "Control Panel"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-zinc-500 text-sm",
          renderId: "render-af600af2",
          as: "p",
          children: "Systemweite Metriken und Benutzerverwaltung"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10",
        renderId: "render-3632b794",
        as: "div",
        children: [{
          label: "Benutzer",
          value: stats.users,
          icon: Users,
          color: "text-blue-400"
        }, {
          label: "Projekte",
          value: stats.projects,
          icon: Package,
          color: "text-purple-400"
        }, {
          label: "Builds Gesamt",
          value: stats.builds,
          icon: Terminal,
          color: "text-blue-400"
        }, {
          label: "System Status",
          value: "Online",
          icon: Activity,
          color: "text-green-400"
        }].map((stat, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "p-6 rounded-2xl bg-white/[0.02] border border-white/5 shadow-xl",
          renderId: "render-a41e1729",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex justify-between items-start mb-4",
            renderId: "render-1e5403f0",
            as: "div",
            children: [/* @__PURE__ */ jsx(stat.icon, {
              className: stat.color,
              size: 24
            }), /* @__PURE__ */ jsx(TrendingUp, {
              size: 14,
              className: "text-green-500"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-3xl font-bold mb-1",
            renderId: "render-7b9c9b37",
            as: "p",
            children: stat.value
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-zinc-500 uppercase tracking-widest font-bold",
            renderId: "render-d2c8f123",
            as: "p",
            children: stat.label
          })]
        }, i))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-43da4270",
        as: "div",
        children: /* @__PURE__ */ jsx(ServerManager, {})
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 lg:grid-cols-2 gap-8",
        renderId: "render-60388409",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "p-8 rounded-3xl bg-white/[0.02] border border-white/5",
          renderId: "render-39add3ba",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xl font-bold mb-6 flex items-center gap-2",
            renderId: "render-152549f5",
            as: "h3",
            children: [/* @__PURE__ */ jsx(Activity, {
              size: 20,
              className: "text-blue-400"
            }), " Build-Verteilung"]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "space-y-4",
            renderId: "render-7184ead9",
            as: "div",
            children: stats.buildStatusCounts?.map((row, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex items-center gap-4",
              renderId: "render-55e47e52",
              as: "div",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex-grow",
                renderId: "render-8a307bda",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex justify-between text-xs mb-1",
                  renderId: "render-5e00e44d",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "capitalize text-zinc-400 font-bold",
                    renderId: "render-e787306d",
                    as: "span",
                    children: row.status
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "font-mono text-blue-400",
                    renderId: "render-c8d0ab8b",
                    as: "span",
                    children: row.count
                  })]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "h-2 w-full bg-white/5 rounded-full overflow-hidden",
                  renderId: "render-f85518a9",
                  as: "div",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "h-full bg-[#d4af37] rounded-full",
                    style: {
                      width: `${row.count / stats.builds * 100}%`
                    },
                    renderId: "render-70be8734",
                    as: "div"
                  })
                })]
              })
            }, i))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "p-8 rounded-3xl bg-white/[0.02] border border-white/5",
          renderId: "render-dcd975d2",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xl font-bold mb-6 flex items-center gap-2 text-red-400",
            renderId: "render-775f0d80",
            as: "h3",
            children: [/* @__PURE__ */ jsx(ShieldAlert, {
              size: 20
            }), " System Warnungen"]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-4",
            renderId: "render-d4f9f84d",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "p-4 rounded-xl bg-red-500/5 border border-red-500/20 flex gap-3",
              renderId: "render-f33f6cbc",
              as: "div",
              children: [/* @__PURE__ */ jsx(AlertCircle, {
                size: 18,
                className: "text-red-500 flex-shrink-0"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-f4efd796",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs font-bold text-red-400",
                  renderId: "render-6a13e3a8",
                  as: "p",
                  children: "Keystore-Limit erreicht"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-[10px] text-zinc-500 mt-1",
                  renderId: "render-dd563524",
                  as: "p",
                  children: "3 Benutzer haben das Keystore-Limit für kostenlose Konten überschritten."
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 flex gap-3",
              renderId: "render-ecd66403",
              as: "div",
              children: [/* @__PURE__ */ jsx(Info, {
                size: 18,
                className: "text-blue-400 flex-shrink-0"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-3ed57540",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs font-bold text-blue-400",
                  renderId: "render-0af9f00f",
                  as: "p",
                  children: "Build-Server Auslastung"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-[10px] text-zinc-500 mt-1",
                  renderId: "render-02c86d97",
                  as: "p",
                  children: "Die aktuelle Warteschlange beträgt 2 Builds. Durchschnittliche Dauer: 4.2m."
                })]
              })]
            })]
          })]
        })]
      })]
    })
  });
}

const page$5 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminDashboard, {
      ...props
    })
  });
});

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$5
}, Symbol.toStringTag, { value: 'Module' }));

function safeHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url || "";
  }
}
const STATUS_LABEL = {
  completed: "Erfolgreich",
  failed: "Fehlgeschlagen",
  processing: "Wird gebaut",
  pending: "Warteschlange"
};
function Dashboard() {
  const {
    data: projects,
    isLoading
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.getProjects()
  });
  const getStatusDot = (status) => {
    switch (status) {
      case "completed":
        return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block",
          renderId: "render-38d22ec8",
          as: "span"
        });
      case "failed":
        return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-1.5 h-1.5 rounded-full bg-red-400 inline-block",
          renderId: "render-a0a9c355",
          as: "span"
        });
      case "processing":
        return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse",
          renderId: "render-c1ba2703",
          as: "span"
        });
      default:
        return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block",
          renderId: "render-e97539cf",
          as: "span"
        });
    }
  };
  return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "dashboard",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-8",
      renderId: "render-8b998ec8",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-8 flex justify-between items-center",
        renderId: "render-c18deef1",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-f5874977",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-semibold text-white mb-1",
            renderId: "render-665c0a47",
            as: "h1",
            children: "Dashboard"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-zinc-500",
            renderId: "render-38ed64a8",
            as: "p",
            children: "Deine Android-App-Projekte"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/projects/new",
          className: "flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors",
          renderId: "render-ade27de5",
          as: "a",
          children: [/* @__PURE__ */ jsx(Plus, {
            size: 15
          }), " Neues Projekt"]
        })]
      }), isLoading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        renderId: "render-fcedcb56",
        as: "div",
        children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-44 rounded-xl bg-zinc-900 border border-zinc-800 animate-pulse",
          renderId: "render-85e79924",
          as: "div"
        }, i))
      }) : projects?.length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex flex-col items-center justify-center py-24 bg-zinc-900 rounded-xl border border-zinc-800 border-dashed",
        renderId: "render-ce2dd916",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-12 w-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4",
          renderId: "render-f5bf1b21",
          as: "div",
          children: /* @__PURE__ */ jsx(Package, {
            size: 24,
            className: "text-zinc-500"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm font-medium text-white mb-1",
          renderId: "render-89dde605",
          as: "h3",
          children: "Noch keine Projekte"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-zinc-500 mb-6",
          renderId: "render-625efd42",
          as: "p",
          children: "Erstelle dein erstes Projekt, um eine APK zu generieren"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/projects/new",
          className: "flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors",
          renderId: "render-b96ba8d7",
          as: "a",
          children: [/* @__PURE__ */ jsx(Plus, {
            size: 13
          }), " Projekt erstellen"]
        })]
      }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        renderId: "render-3ac278c5",
        as: "div",
        children: projects?.map((project) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: `/projects/${project.id}`,
          className: "group p-5 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all",
          renderId: "render-a16af64e",
          as: "a",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex justify-between items-start mb-4",
            renderId: "render-8a549663",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "h-10 w-10 rounded-lg overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0",
              renderId: "render-c575b7ee",
              as: "div",
              children: project.icon_url ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                src: project.icon_url,
                alt: project.name,
                className: "h-full w-full object-cover",
                renderId: "render-41f5f2ae",
                as: "img"
              }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "h-full w-full flex items-center justify-center text-blue-400 font-semibold text-sm",
                renderId: "render-c87b45e7",
                as: "div",
                children: project.name.charAt(0)
              })
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-1.5 text-xs text-zinc-400",
              renderId: "render-2871eeb8",
              as: "div",
              children: [getStatusDot(project.last_build_status), STATUS_LABEL[project.last_build_status] || "Kein Build"]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-white mb-0.5 group-hover:text-blue-300 transition-colors",
            renderId: "render-e7fa8284",
            as: "h3",
            children: project.name
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-zinc-600 mb-4 font-mono truncate",
            renderId: "render-b775c928",
            as: "p",
            children: project.package_name
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-3 pt-3 border-t border-zinc-800",
            renderId: "render-bd9892a6",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-1 text-[11px] text-zinc-600",
              renderId: "render-c6973120",
              as: "div",
              children: [/* @__PURE__ */ jsx(ExternalLink, {
                size: 11
              }), safeHostname(project.pwa_url)]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-1 text-[11px] text-zinc-600 ml-auto uppercase tracking-wide",
              renderId: "render-ec0ec5ff",
              as: "div",
              children: [/* @__PURE__ */ jsx(Play, {
                size: 10
              }), " ", project.build_type]
            })]
          })]
        }, project.id))
      })]
    })
  });
}

const page$4 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(Dashboard, {
      ...props
    })
  });
});

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$4
}, Symbol.toStringTag, { value: 'Module' }));

function NewProject() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    pwa_url: "",
    package_name: "com.example.pwa",
    version: "1.0.0",
    build_type: "twa",
    icon_url: "",
    splash_url: "",
    native_features: {
      push: false,
      camera: false,
      location: false,
      biometrics: false,
      theme_color: "#2563eb",
      background_color: "#000000",
      orientation: "any",
      display: "standalone"
    }
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [manifestData, setManifestData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = (key, val) => setFormData((f) => ({
    ...f,
    [key]: val
  }));
  const updateFeature = (key, val) => setFormData((f) => ({
    ...f,
    native_features: {
      ...f.native_features,
      [key]: val
    }
  }));
  const validatePWA = async () => {
    setIsValidating(true);
    try {
      const data = await api.validatePwa(formData.pwa_url);
      setValidationResult(data);
      if (data.valid && data.manifest) {
        const m = data.manifest;
        setManifestData(m);
        setFormData((f) => ({
          ...f,
          name: f.name || m.name || "",
          icon_url: f.icon_url || m.bestIconUrl || "",
          native_features: {
            ...f.native_features,
            theme_color: m.theme_color || f.native_features.theme_color,
            background_color: m.background_color || f.native_features.background_color,
            orientation: m.orientation !== "any" ? m.orientation : f.native_features.orientation,
            display: m.display || f.native_features.display
          }
        }));
        setTimeout(() => setStep(2), 800);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsValidating(false);
    }
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const project = await api.createProject(formData);
      await api.createBuild({
        project_id: project.id
      });
      window.location.href = `/projects/${project.id}`;
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };
  const stepLabels = ["URL validieren", "App konfigurieren", "Features & Build"];
  const inputClass = "w-full border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all text-sm bg-zinc-800/50 text-white placeholder:text-zinc-600";
  return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "new",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-3xl mx-auto p-8",
      renderId: "render-69e1913e",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        href: "/dashboard",
        className: "flex items-center gap-2 text-zinc-500 hover:text-white mb-8 transition-colors text-sm",
        renderId: "render-95059e39",
        as: "a",
        children: [/* @__PURE__ */ jsx(ArrowLeft, {
          size: 16
        }), " Dashboard"]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-10",
        renderId: "render-7d94fb28",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-white mb-6",
          renderId: "render-5d49da5b",
          as: "h1",
          children: "Neues Projekt anlegen"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex items-center",
          renderId: "render-7232c34a",
          as: "div",
          children: stepLabels.map((label, i) => {
            const idx = i + 1;
            const done = step > idx;
            const active = step === idx;
            return /* @__PURE__ */ jsxs(React__default.Fragment, {
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2 shrink-0",
                renderId: "render-a92b5728",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: `h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${done ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500"}`,
                  renderId: "render-603d9a16",
                  as: "div",
                  children: done ? /* @__PURE__ */ jsx(CheckCircle2, {
                    size: 16
                  }) : idx
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: `text-sm font-medium hidden sm:block whitespace-nowrap ${active ? "text-white" : "text-zinc-600"}`,
                  renderId: "render-4683871d",
                  as: "span",
                  children: label
                })]
              }), i < 2 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `flex-1 h-0.5 mx-3 ${step > idx ? "bg-emerald-500" : "bg-zinc-800"}`,
                renderId: "render-3ac4ed9f",
                as: "div"
              })]
            }, idx);
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-zinc-900 rounded-2xl border border-zinc-800 p-8",
        renderId: "render-f5784ae3",
        as: "div",
        children: [step === 1 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-6",
          renderId: "render-68bfbaa1",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-caa44800",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-white mb-1",
              renderId: "render-b2ac8d10",
              as: "h2",
              children: "PWA-URL eingeben"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-zinc-500",
              renderId: "render-6563d20d",
              as: "p",
              children: "Gib die öffentlich erreichbare HTTPS-URL deiner Progressive Web App ein."
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-1.5",
            renderId: "render-b5a64d21",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-zinc-400",
              renderId: "render-2927f2f5",
              as: "label",
              children: "PWA URL"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex gap-3",
              renderId: "render-4b7cc4f8",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex-1 flex items-center gap-3 border border-zinc-700 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all bg-zinc-800/50",
                renderId: "render-d1ac6029",
                as: "div",
                children: [/* @__PURE__ */ jsx(Globe, {
                  size: 18,
                  className: "text-zinc-600 shrink-0"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "url",
                  placeholder: "https://meine-pwa.de",
                  value: formData.pwa_url,
                  onChange: (e) => update("pwa_url", e.target.value),
                  onKeyDown: (e) => e.key === "Enter" && formData.pwa_url && validatePWA(),
                  className: "flex-1 outline-none text-white placeholder:text-zinc-600 bg-transparent text-sm",
                  autoFocus: true,
                  renderId: "render-a84a9832",
                  as: "input"
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: validatePWA,
                disabled: isValidating || !formData.pwa_url,
                className: "px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap",
                renderId: "render-53af6b37",
                as: "button",
                children: [isValidating ? /* @__PURE__ */ jsx(RefreshCcw, {
                  size: 16,
                  className: "animate-spin"
                }) : /* @__PURE__ */ jsx(CheckCircle2, {
                  size: 16
                }), isValidating ? "Prüft…" : "Validieren"]
              })]
            })]
          }), validationResult && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `p-4 rounded-xl border ${validationResult.valid ? "bg-emerald-900/20 border-emerald-800" : "bg-red-900/20 border-red-800"}`,
            renderId: "render-7895b235",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center gap-2 mb-3",
              renderId: "render-5905cf63",
              as: "div",
              children: [validationResult.valid ? /* @__PURE__ */ jsx(CheckCircle2, {
                size: 16,
                className: "text-emerald-400"
              }) : /* @__PURE__ */ jsx(AlertTriangle, {
                size: 16,
                className: "text-red-400"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: `font-semibold text-sm ${validationResult.valid ? "text-emerald-400" : "text-red-400"}`,
                renderId: "render-3d24bc37",
                as: "span",
                children: validationResult.valid ? "PWA validiert – wird weitergeleitet…" : "Validierung fehlgeschlagen"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
              renderId: "render-0d42d8a5",
              as: "div",
              children: Object.entries(validationResult.checks || {}).map(([key, ok]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: `flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ${ok ? "bg-emerald-900/30 text-emerald-400" : "bg-red-900/30 text-red-400"}`,
                renderId: "render-ea034e3d",
                as: "div",
                children: [ok ? /* @__PURE__ */ jsx(CheckCircle2, {
                  size: 11
                }) : /* @__PURE__ */ jsx(AlertTriangle, {
                  size: 11
                }), key === "https" ? "HTTPS" : key === "manifest" ? "Manifest" : key === "serviceWorker" ? "Service Worker" : key === "installability" ? "Installierbar" : "Icons"]
              }, key))
            }), validationResult.error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-red-400 mt-2",
              renderId: "render-6125cb8f",
              as: "p",
              children: validationResult.error
            }), !validationResult.valid && validationResult.checks?.https && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "mt-3 pt-3 border-t border-red-800",
              renderId: "render-79b05664",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-zinc-400 mb-2",
                renderId: "render-b918d8e4",
                as: "p",
                children: "URL ist erreichbar. Du kannst trotzdem als WebView-App fortfahren."
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => {
                  update("build_type", "webview");
                  update("name", formData.name || new URL(formData.pwa_url).hostname);
                  setStep(2);
                },
                className: "flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-semibold hover:bg-orange-500 transition-colors",
                renderId: "render-14d7aa4b",
                as: "button",
                children: [/* @__PURE__ */ jsx(Smartphone, {
                  size: 13
                }), " Als WebView-App fortfahren"]
              })]
            }), validationResult.valid && manifestData && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "mt-3 pt-3 border-t border-emerald-800 flex items-center gap-3",
              renderId: "render-c9731e6e",
              as: "div",
              children: [manifestData.bestIconUrl && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                src: manifestData.bestIconUrl,
                alt: "Icon",
                className: "h-10 w-10 rounded-xl object-cover border border-emerald-700 shrink-0",
                onError: (e) => e.target.style.display = "none",
                renderId: "render-4528d3e0",
                as: "img"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-08495dd5",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "font-semibold text-emerald-400 text-sm",
                  renderId: "render-99df0889",
                  as: "p",
                  children: manifestData.name || "App erkannt"
                }), manifestData.description && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-emerald-600 line-clamp-1",
                  renderId: "render-00b7f6dd",
                  as: "p",
                  children: manifestData.description
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-zinc-800/50 rounded-xl p-4 border border-zinc-700",
            renderId: "render-6cee1077",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-semibold text-zinc-300 mb-2.5",
              renderId: "render-e8f57936",
              as: "h4",
              children: "Anforderungen"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "space-y-1.5 text-xs text-zinc-500",
              renderId: "render-6a9100f5",
              as: "ul",
              children: ["HTTPS-URL (kein HTTP oder localhost)", "Web App Manifest (manifest.json) verknüpft", "Mindestens ein App-Icon (192×192 oder 512×512)", "Öffentlich erreichbar (kein VPN/Intranet)"].map((req) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2",
                renderId: "render-579cd14c",
                as: "li",
                children: [/* @__PURE__ */ jsx(CheckCircle2, {
                  size: 11,
                  className: "text-blue-500 shrink-0"
                }), req]
              }, req))
            })]
          })]
        }), step === 2 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-6",
          renderId: "render-9b5a5257",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-617ba836",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-white mb-1",
              renderId: "render-6db50bbd",
              as: "h2",
              children: "App konfigurieren"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-zinc-500",
              renderId: "render-b653371b",
              as: "p",
              children: manifestData ? "Daten wurden aus dem Manifest übernommen." : "Konfiguriere deine Android-App."
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            renderId: "render-ea390c65",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-1.5",
              renderId: "render-ff84be17",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-medium text-zinc-400",
                renderId: "render-4cec7940",
                as: "label",
                children: "App-Name *"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                placeholder: "Meine App",
                value: formData.name,
                onChange: (e) => update("name", e.target.value),
                className: inputClass,
                renderId: "render-4611db8c",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-1.5",
              renderId: "render-e9b46967",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-medium text-zinc-400",
                renderId: "render-73f2ad8f",
                as: "label",
                children: "Package-Name *"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                placeholder: "com.firma.app",
                value: formData.package_name,
                onChange: (e) => update("package_name", e.target.value),
                className: inputClass + " font-mono",
                renderId: "render-02c8c580",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
            renderId: "render-a0057e7d",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-1.5",
              renderId: "render-9fbc9f4a",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-medium text-zinc-400",
                renderId: "render-a4135412",
                as: "label",
                children: "Version"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                placeholder: "1.0.0",
                value: formData.version,
                onChange: (e) => update("version", e.target.value),
                className: inputClass,
                renderId: "render-92ad4abf",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-1.5",
              renderId: "render-5d3c2027",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-medium text-zinc-400",
                renderId: "render-ad2647b2",
                as: "label",
                children: "Display-Modus"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                value: formData.native_features.display,
                onChange: (e) => updateFeature("display", e.target.value),
                className: inputClass,
                renderId: "render-dab2ebdc",
                as: "select",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "standalone",
                  renderId: "render-05d81c74",
                  as: "option",
                  children: "Standalone (empfohlen)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "fullscreen",
                  renderId: "render-6d83c098",
                  as: "option",
                  children: "Vollbild"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "minimal-ui",
                  renderId: "render-94d20021",
                  as: "option",
                  children: "Minimal UI"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "browser",
                  renderId: "render-2ffa1886",
                  as: "option",
                  children: "Browser-Tab"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-1.5",
            renderId: "render-bf2f917f",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-zinc-400",
              renderId: "render-f1bd8aba",
              as: "label",
              children: "App-Icon URL"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex gap-3 items-center",
              renderId: "render-7b362636",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex-1 flex items-center gap-3 border border-zinc-700 rounded-xl px-4 py-3 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30 transition-all bg-zinc-800/50",
                renderId: "render-18d74f57",
                as: "div",
                children: [/* @__PURE__ */ jsx(Image$1, {
                  size: 16,
                  className: "text-zinc-600 shrink-0"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "url",
                  placeholder: "https://meine-pwa.de/icon-512.png",
                  value: formData.icon_url,
                  onChange: (e) => update("icon_url", e.target.value),
                  className: "flex-1 outline-none text-sm text-white placeholder:text-zinc-600 bg-transparent",
                  renderId: "render-51656c5e",
                  as: "input"
                })]
              }), formData.icon_url ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                src: formData.icon_url,
                alt: "Icon",
                className: "h-12 w-12 rounded-xl border border-zinc-700 object-cover shrink-0",
                onError: (e) => e.target.style.display = "none",
                renderId: "render-69315744",
                as: "img"
              }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "h-12 w-12 rounded-xl border-2 border-dashed border-zinc-700 flex items-center justify-center shrink-0",
                renderId: "render-b929c7cc",
                as: "div",
                children: /* @__PURE__ */ jsx(Smartphone, {
                  size: 18,
                  className: "text-zinc-600"
                })
              })]
            }), manifestData?.icons?.length > 1 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2 mt-1",
              renderId: "render-6ad7f4d3",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-zinc-500 self-center",
                renderId: "render-5408d54d",
                as: "span",
                children: "Aus Manifest:"
              }), manifestData.icons.slice(0, 6).map((icon, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                onClick: () => update("icon_url", icon.src),
                title: icon.sizes || "",
                className: `p-0.5 rounded-lg border-2 transition-all ${formData.icon_url === icon.src ? "border-blue-500" : "border-zinc-700 hover:border-zinc-500"}`,
                renderId: "render-b8431042",
                as: "button",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  src: icon.src,
                  alt: "",
                  className: "h-8 w-8 rounded object-cover",
                  onError: (e) => e.target.style.display = "none",
                  renderId: "render-6efb1f81",
                  as: "img"
                })
              }, i))]
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "grid grid-cols-2 gap-4",
            renderId: "render-5d6de66b",
            as: "div",
            children: [["theme_color", "Theme-Farbe"], ["background_color", "Hintergrundfarbe"]].map(([key, label]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-1.5",
              renderId: "render-cd745e15",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-sm font-medium text-zinc-400 flex items-center gap-1.5",
                renderId: "render-2acfbb0b",
                as: "label",
                children: [/* @__PURE__ */ jsx(Palette, {
                  size: 13
                }), label]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex gap-2 items-center border border-zinc-700 rounded-xl px-3 py-2 bg-zinc-800/50 focus-within:border-blue-500 transition-all",
                renderId: "render-21193b18",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "color",
                  value: formData.native_features[key],
                  onChange: (e) => updateFeature(key, e.target.value),
                  className: "h-8 w-8 rounded cursor-pointer border-0 bg-transparent p-0",
                  renderId: "render-81f1807e",
                  as: "input"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "text",
                  value: formData.native_features[key],
                  onChange: (e) => updateFeature(key, e.target.value),
                  className: "flex-1 outline-none text-sm font-mono text-zinc-300 bg-transparent",
                  renderId: "render-3320d6f0",
                  as: "input"
                })]
              })]
            }, key))
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-1.5",
            renderId: "render-b7bcd241",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-zinc-400 flex items-center gap-1.5",
              renderId: "render-49f0f8ac",
              as: "label",
              children: [/* @__PURE__ */ jsx(RotateCcw, {
                size: 13
              }), "Bildschirmausrichtung"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "grid grid-cols-3 gap-3",
              renderId: "render-61ef32ff",
              as: "div",
              children: [{
                value: "any",
                label: "Automatisch",
                icon: Monitor
              }, {
                value: "portrait",
                label: "Hochformat",
                icon: Smartphone
              }, {
                value: "landscape",
                label: "Querformat",
                icon: Monitor
              }].map((opt) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => updateFeature("orientation", opt.value),
                className: `flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${formData.native_features.orientation === opt.value ? "border-blue-500 bg-blue-600/10 text-blue-400" : "border-zinc-700 hover:border-zinc-600 text-zinc-500"}`,
                renderId: "render-e0183147",
                as: "button",
                children: [/* @__PURE__ */ jsx(opt.icon, {
                  size: 20
                }), opt.label]
              }, opt.value))
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex gap-3 pt-2",
            renderId: "render-e0ca7748",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              onClick: () => setStep(1),
              className: "px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-all text-sm font-semibold text-zinc-300",
              renderId: "render-48a3b9b2",
              as: "button",
              children: "Zurück"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => setStep(3),
              disabled: !formData.name || !formData.package_name,
              className: "flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
              renderId: "render-8b2aa2fa",
              as: "button",
              children: ["Features & Build ", /* @__PURE__ */ jsx(ArrowRight, {
                size: 18
              })]
            })]
          })]
        }), step === 3 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-6",
          renderId: "render-e2d394b7",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-56da5447",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-white mb-1",
              renderId: "render-00dc6151",
              as: "h2",
              children: "Build-Typ & Native Features"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-zinc-500",
              renderId: "render-463b8f31",
              as: "p",
              children: "Wähle die Integrationsmethode und aktiviere optionale native Funktionen."
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-51386a2b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-zinc-400",
              renderId: "render-dd34a7e8",
              as: "label",
              children: "Build-Typ"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
              renderId: "render-6ed4b3f1",
              as: "div",
              children: [{
                id: "twa",
                title: "Trusted Web Activity",
                desc: "Beste Performance & Play-Store-Optimierung",
                icon: Zap,
                recommended: true
              }, {
                id: "webview",
                title: "Standard WebView",
                desc: "Maximale Kontrolle & Kompatibilität",
                icon: Globe
              }, {
                id: "hybrid",
                title: "Hybrid Native",
                desc: "Native Bridge für erweiterte APIs",
                icon: Smartphone
              }].map((type) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => update("build_type", type.id),
                className: `relative p-4 rounded-xl border text-left transition-all ${formData.build_type === type.id ? "border-blue-500 bg-blue-600/10" : "border-zinc-700 hover:border-zinc-600"}`,
                renderId: "render-229ed4d0",
                as: "button",
                children: [type.recommended && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "absolute top-2 right-2 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold",
                  renderId: "render-f919cc37",
                  as: "span",
                  children: "Empfohlen"
                }), /* @__PURE__ */ jsx(type.icon, {
                  size: 18,
                  className: `mb-2 ${formData.build_type === type.id ? "text-blue-400" : "text-zinc-500"}`
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: `font-semibold text-sm mb-1 ${formData.build_type === type.id ? "text-white" : "text-zinc-300"}`,
                  renderId: "render-ca1310cd",
                  as: "p",
                  children: type.title
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-[11px] text-zinc-500 leading-relaxed",
                  renderId: "render-93084674",
                  as: "p",
                  children: type.desc
                })]
              }, type.id))
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "space-y-2",
            renderId: "render-bc09353b",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-zinc-400",
              renderId: "render-890e1814",
              as: "label",
              children: ["Native Features ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-zinc-600 font-normal",
                renderId: "render-94aabc00",
                as: "span",
                children: "(optional)"
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "grid grid-cols-2 gap-3",
              renderId: "render-4e4a3e59",
              as: "div",
              children: [{
                id: "push",
                label: "Push-Benachrichtigungen",
                icon: BellRing,
                desc: "FCM-Benachrichtigungen"
              }, {
                id: "camera",
                label: "Kamera & Galerie",
                icon: Camera,
                desc: "Foto- und Videozugriff"
              }, {
                id: "location",
                label: "Geolocation",
                icon: MapPin,
                desc: "Echtzeit-Standortzugriff"
              }, {
                id: "biometrics",
                label: "Biometrie",
                icon: Fingerprint,
                desc: "Fingerabdruck & Face-ID"
              }].map((f) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => updateFeature(f.id, !formData.native_features[f.id]),
                className: `flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${formData.native_features[f.id] ? "border-blue-500 bg-blue-600/10" : "border-zinc-700 hover:border-zinc-600"}`,
                renderId: "render-432ae36f",
                as: "button",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: `h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${formData.native_features[f.id] ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-500"}`,
                  renderId: "render-1523697e",
                  as: "div",
                  children: /* @__PURE__ */ jsx(f.icon, {
                    size: 16
                  })
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "min-w-0",
                  renderId: "render-ff3a3a74",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-xs font-semibold text-white",
                    renderId: "render-eaabcbab",
                    as: "p",
                    children: f.label
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-[10px] text-zinc-500",
                    renderId: "render-6d528a64",
                    as: "p",
                    children: f.desc
                  })]
                }), formData.native_features[f.id] && /* @__PURE__ */ jsx(CheckCircle2, {
                  size: 15,
                  className: "ml-auto text-blue-500 shrink-0"
                })]
              }, f.id))
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-zinc-800/50 rounded-xl p-4 border border-zinc-700",
            renderId: "render-80890625",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-semibold text-zinc-300 mb-3",
              renderId: "render-21428161",
              as: "h4",
              children: "Build-Zusammenfassung"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-2 text-xs",
              renderId: "render-71ae4938",
              as: "div",
              children: [[["App-Name", formData.name], ["Package", formData.package_name], ["Version", formData.version], ["URL", formData.pwa_url], ["Build-Typ", formData.build_type.toUpperCase()], ["Display", formData.native_features.display], ["Ausrichtung", formData.native_features.orientation]].map(([label, value]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex justify-between gap-4",
                renderId: "render-b727f064",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-zinc-500 shrink-0",
                  renderId: "render-0b6715c1",
                  as: "span",
                  children: label
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "font-mono text-white truncate text-right",
                  renderId: "render-700df4ab",
                  as: "span",
                  children: value
                })]
              }, label)), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex justify-between items-center gap-4",
                renderId: "render-3f84d195",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-zinc-500 shrink-0",
                  renderId: "render-7c0dd73a",
                  as: "span",
                  children: "Theme"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center gap-2",
                  renderId: "render-56f26d36",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "h-4 w-4 rounded border border-zinc-600 shrink-0",
                    style: {
                      backgroundColor: formData.native_features.theme_color
                    },
                    renderId: "render-2062a770",
                    as: "div"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "font-mono text-white",
                    renderId: "render-2c0273f0",
                    as: "span",
                    children: formData.native_features.theme_color
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex gap-3 pt-2",
            renderId: "render-8df2837c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              onClick: () => setStep(2),
              className: "px-6 py-3 rounded-xl border border-zinc-700 hover:bg-zinc-800 transition-all text-sm font-semibold text-zinc-300",
              renderId: "render-a345daea",
              as: "button",
              children: "Zurück"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: handleSubmit,
              disabled: isSubmitting,
              className: "flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-500 disabled:opacity-60 transition-all",
              renderId: "render-0912ba16",
              as: "button",
              children: [isSubmitting ? /* @__PURE__ */ jsx(RefreshCcw, {
                size: 18,
                className: "animate-spin"
              }) : /* @__PURE__ */ jsx(Rocket, {
                size: 18
              }), isSubmitting ? "Projekt wird erstellt…" : "Projekt erstellen & Build starten"]
            })]
          })]
        })]
      })]
    })
  });
}

const page$3 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(NewProject, {
      ...props
    })
  });
});

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$3
}, Symbol.toStringTag, { value: 'Module' }));

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1e3);
  if (diff < 60) return "gerade eben";
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return `vor ${Math.floor(diff / 86400)} Tagen`;
}
const STATUS = {
  completed: {
    icon: CheckCircle2,
    label: "Erfolgreich",
    color: "text-emerald-400",
    bg: "bg-emerald-900/20",
    border: "border-emerald-800",
    dot: "bg-emerald-500"
  },
  failed: {
    icon: AlertCircle,
    label: "Fehlgeschlagen",
    color: "text-red-400",
    bg: "bg-red-900/20",
    border: "border-red-800",
    dot: "bg-red-500"
  },
  processing: {
    icon: RefreshCcw,
    label: "Wird gebaut…",
    color: "text-blue-400",
    bg: "bg-blue-900/20",
    border: "border-blue-800",
    dot: "bg-blue-500",
    spin: true
  },
  pending: {
    icon: Clock,
    label: "Warteschlange",
    color: "text-zinc-400",
    bg: "bg-zinc-800/50",
    border: "border-zinc-700",
    dot: "bg-zinc-500"
  }
};
function StatusBadge({
  status,
  small
}) {
  const s = STATUS[status] || STATUS.pending;
  const Icon = s.icon;
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${s.color} ${s.bg} ${s.border}`,
    renderId: "render-37451728",
    as: "span",
    children: [/* @__PURE__ */ jsx(Icon, {
      size: small ? 11 : 13,
      className: s.spin ? "animate-spin" : ""
    }), s.label]
  });
}
function ProjectDetails({
  params
}) {
  const {
    id
  } = params;
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("build");
  const {
    data: project,
    isLoading: projectLoading
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(id)
  });
  const {
    data: builds = []
  } = useQuery({
    queryKey: ["builds", id],
    queryFn: () => api.getBuilds(id).catch(() => []),
    enabled: !!id,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (data === void 0) return 2e3;
      const latest = data[0];
      return latest?.status === "processing" || latest?.status === "pending" ? 2e3 : false;
    },
    refetchIntervalInBackground: true
  });
  const latestBuild = builds[0] || null;
  const nativeFeatures = typeof project?.native_features === "string" ? JSON.parse(project.native_features) : project?.native_features || {};
  const startBuildMutation = useMutation({
    mutationFn: () => api.createBuild({
      project_id: id
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["builds", id]
      });
      queryClient.invalidateQueries({
        queryKey: ["project", id]
      });
    }
  });
  const deleteProjectMutation = useMutation({
    mutationFn: () => api.deleteProject(id),
    onSuccess: () => {
      window.location.href = "/dashboard";
    }
  });
  const isBuilding = latestBuild?.status === "processing" || latestBuild?.status === "pending" || startBuildMutation.isPending;
  if (projectLoading) {
    return /* @__PURE__ */ jsx(NavLayout, {
      activeTab: "dashboard",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "p-8 max-w-6xl mx-auto space-y-4 animate-pulse",
        renderId: "render-c8287c00",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-8 w-48 bg-zinc-800 rounded-lg",
          renderId: "render-71ab4d2c",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-32 w-full bg-zinc-900 rounded-2xl",
          renderId: "render-4cb2f137",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-64 w-full bg-zinc-900 rounded-2xl",
          renderId: "render-a4a7c3da",
          as: "div"
        })]
      })
    });
  }
  if (!project) {
    return /* @__PURE__ */ jsx(NavLayout, {
      activeTab: "dashboard",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "p-8 text-center text-zinc-500",
        renderId: "render-dac04c5d",
        as: "div",
        children: "Projekt nicht gefunden."
      })
    });
  }
  return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "dashboard",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-6xl mx-auto p-8",
      renderId: "render-66a8614c",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        href: "/dashboard",
        className: "flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors text-sm",
        renderId: "render-f1b5a0cf",
        as: "a",
        children: [/* @__PURE__ */ jsx(ArrowLeft, {
          size: 16
        }), " Dashboard"]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-start gap-5 p-6 rounded-2xl border border-zinc-800 bg-zinc-900 mb-6",
        renderId: "render-9d3720ea",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "h-16 w-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-2xl font-bold text-blue-500 overflow-hidden shrink-0",
          renderId: "render-aafbfe54",
          as: "div",
          children: project.icon_url ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: project.icon_url,
            className: "h-full w-full object-cover",
            alt: project.name,
            renderId: "render-c082c010",
            as: "img"
          }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-7a911a65",
            as: "span",
            children: project.name?.charAt(0)
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex-1 min-w-0",
          renderId: "render-8ed517ee",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-wrap items-center gap-3 mb-1",
            renderId: "render-e8804666",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl font-bold text-white",
              renderId: "render-acfe2e67",
              as: "h1",
              children: project.name
            }), latestBuild && /* @__PURE__ */ jsx(StatusBadge, {
              status: latestBuild.status
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-zinc-500 font-mono mb-2",
            renderId: "render-78495086",
            as: "p",
            children: project.package_name
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-wrap items-center gap-4 text-xs text-zinc-500",
            renderId: "render-e2be704a",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              href: project.pwa_url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-1 text-blue-400 hover:underline",
              renderId: "render-af663fb5",
              as: "a",
              children: [/* @__PURE__ */ jsx(ExternalLink, {
                size: 12
              }), " ", project.pwa_url]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "uppercase font-semibold bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700 text-zinc-400",
              renderId: "render-5c1d71a0",
              as: "span",
              children: project.build_type
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-6123748c",
              as: "span",
              children: ["v", project.version || "1.0.0"]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2 shrink-0",
          renderId: "render-632a3285",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => startBuildMutation.mutate(),
            disabled: isBuilding,
            className: "px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center gap-2 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
            renderId: "render-29ec46f1",
            as: "button",
            children: [/* @__PURE__ */ jsx(RefreshCcw, {
              size: 16,
              className: isBuilding ? "animate-spin" : ""
            }), isBuilding ? "Baut…" : "Neu bauen"]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => {
              if (window.confirm(`Projekt "${project.name}" wirklich löschen?`)) deleteProjectMutation.mutate();
            },
            disabled: deleteProjectMutation.isPending,
            title: "Projekt löschen",
            className: "p-2.5 rounded-xl border border-zinc-700 text-zinc-500 hover:text-red-400 hover:border-red-800 hover:bg-red-900/20 disabled:opacity-50 transition-all",
            renderId: "render-4ead7c41",
            as: "button",
            children: /* @__PURE__ */ jsx(Trash2, {
              size: 16
            })
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
        renderId: "render-6fe954e0",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "lg:col-span-2 space-y-6",
          renderId: "render-5949a53c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex gap-1 bg-zinc-900 rounded-xl p-1 border border-zinc-800",
            renderId: "render-a2dfa4f7",
            as: "div",
            children: [{
              id: "build",
              label: "Build",
              icon: Terminal
            }, {
              id: "history",
              label: "Verlauf",
              icon: History
            }].map((tab) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => setActiveTab(tab.id),
              className: `flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"}`,
              renderId: "render-c554f0b7",
              as: "button",
              children: [/* @__PURE__ */ jsx(tab.icon, {
                size: 15
              }), tab.label]
            }, tab.id))
          }), activeTab === "build" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden",
            renderId: "render-7d48843a",
            as: "div",
            children: latestBuild ? /* @__PURE__ */ jsxs(Fragment, {
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: `flex items-center justify-between px-6 py-4 border-b ${STATUS[latestBuild.status]?.bg || "bg-zinc-800/50"} ${STATUS[latestBuild.status]?.border || "border-zinc-700"}`,
                renderId: "render-665b8b90",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center gap-3",
                  renderId: "render-332f921e",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `h-2.5 w-2.5 rounded-full ${STATUS[latestBuild.status]?.dot || "bg-zinc-500"} ${latestBuild.status === "processing" || latestBuild.status === "pending" ? "animate-pulse" : ""}`,
                    renderId: "render-9cf1d221",
                    as: "div"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: `font-semibold text-sm ${STATUS[latestBuild.status]?.color || ""}`,
                    renderId: "render-9095215a",
                    as: "span",
                    children: STATUS[latestBuild.status]?.label || "Unbekannt"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-xs text-zinc-600",
                    renderId: "render-427c0aa6",
                    as: "span",
                    children: timeAgo(latestBuild.created_at)
                  })]
                }), latestBuild.status === "completed" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  href: latestBuild.apk_url,
                  download: true,
                  className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  renderId: "render-2d9b78fd",
                  as: "a",
                  children: [/* @__PURE__ */ jsx(Download, {
                    size: 13
                  }), " APK herunterladen"]
                }), latestBuild.status === "failed" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  onClick: () => startBuildMutation.mutate(),
                  className: "flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  renderId: "render-d97c8b93",
                  as: "button",
                  children: [/* @__PURE__ */ jsx(RefreshCcw, {
                    size: 13
                  }), " Erneut versuchen"]
                })]
              }), latestBuild.status === "completed" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "mx-6 mt-6 p-5 rounded-xl border border-blue-800 bg-blue-900/20",
                renderId: "render-3b41b689",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center justify-between gap-4",
                  renderId: "render-30cf690d",
                  as: "div",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "flex items-center gap-4",
                    renderId: "render-8ee8f902",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0",
                      renderId: "render-ceda9e7f",
                      as: "div",
                      children: /* @__PURE__ */ jsx(Package, {
                        size: 24,
                        className: "text-white"
                      })
                    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      renderId: "render-65c02913",
                      as: "div",
                      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        className: "font-bold text-white",
                        renderId: "render-77518324",
                        as: "p",
                        children: [project.package_name, "-release.apk"]
                      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        className: "text-xs text-zinc-500 mt-0.5",
                        renderId: "render-87e3f93f",
                        as: "p",
                        children: ["Android APK • Signiert • ", timeAgo(latestBuild.created_at)]
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    href: latestBuild.apk_url,
                    download: true,
                    className: "flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                    renderId: "render-69194e88",
                    as: "a",
                    children: [/* @__PURE__ */ jsx(Download, {
                      size: 16
                    }), " Download"]
                  })]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "mt-4 pt-4 border-t border-blue-800 grid grid-cols-3 gap-3 text-xs text-center",
                  renderId: "render-b340ff6b",
                  as: "div",
                  children: [["Format", "APK"], ["Min. Android", "5.0+"], ["Build-ID", `#${latestBuild.id}`]].map(([l, v]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-92b08cf8",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "text-zinc-500",
                      renderId: "render-248793bf",
                      as: "p",
                      children: l
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "font-semibold text-zinc-300 mt-0.5 font-mono",
                      renderId: "render-3eefa968",
                      as: "p",
                      children: v
                    })]
                  }, l))
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "p-6",
                renderId: "render-8a057482",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3",
                  renderId: "render-6bc25f47",
                  as: "p",
                  children: "Build-Logs"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "bg-black rounded-xl p-4 font-mono text-xs text-emerald-400 overflow-y-auto max-h-72 border border-zinc-800",
                  renderId: "render-874d2c1e",
                  as: "div",
                  children: [latestBuild.log_text?.split("\n").map((line, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "leading-6",
                    renderId: "render-b7a84554",
                    as: "div",
                    children: line || " "
                  }, i)), (latestBuild.status === "processing" || latestBuild.status === "pending") && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "animate-pulse text-blue-400",
                    renderId: "render-84d5da58",
                    as: "span",
                    children: "▊"
                  }), latestBuild.error_message && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "mt-3 p-3 rounded-lg bg-red-900/30 text-red-400 border border-red-800",
                    renderId: "render-230068b4",
                    as: "div",
                    children: ["✗ ", latestBuild.error_message]
                  })]
                })]
              })]
            }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col items-center justify-center py-16 text-center px-6",
              renderId: "render-7f81a1fc",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "h-14 w-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4",
                renderId: "render-bc8bfea5",
                as: "div",
                children: /* @__PURE__ */ jsx(Terminal, {
                  size: 26,
                  className: "text-zinc-500"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-semibold text-zinc-300 mb-1",
                renderId: "render-936538f2",
                as: "p",
                children: "Noch kein Build"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-zinc-500 mb-6",
                renderId: "render-368bb9ce",
                as: "p",
                children: "Starte den ersten Build, um deine APK zu generieren."
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                onClick: () => startBuildMutation.mutate(),
                disabled: startBuildMutation.isPending,
                className: "flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-500 transition-all",
                renderId: "render-a7956d43",
                as: "button",
                children: [/* @__PURE__ */ jsx(Play, {
                  size: 16
                }), " Build starten"]
              })]
            })
          }), activeTab === "history" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden",
            renderId: "render-7785c1ed",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "px-6 py-4 border-b border-zinc-800",
              renderId: "render-d8a35f19",
              as: "div",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "font-semibold text-white flex items-center gap-2",
                renderId: "render-d07693ad",
                as: "h3",
                children: [/* @__PURE__ */ jsx(History, {
                  size: 16
                }), " Build-Verlauf"]
              })
            }), builds.length === 0 ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-zinc-500 text-center py-12",
              renderId: "render-0a77ac12",
              as: "p",
              children: "Noch keine Builds vorhanden."
            }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "divide-y divide-zinc-800",
              renderId: "render-4fc0e2cc",
              as: "div",
              children: builds.map((build, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/50 transition-colors",
                renderId: "render-7784a0cd",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: `h-2.5 w-2.5 rounded-full shrink-0 ${STATUS[build.status]?.dot || "bg-zinc-500"}`,
                  renderId: "render-8a00a46b",
                  as: "div"
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex-1 min-w-0",
                  renderId: "render-dd0d70fa",
                  as: "div",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "flex items-center gap-2 flex-wrap",
                    renderId: "render-514c2176",
                    as: "div",
                    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "text-sm font-medium text-white",
                      renderId: "render-6dbeb14f",
                      as: "span",
                      children: ["Build #", build.id]
                    }), i === 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "text-[10px] bg-blue-900/40 text-blue-400 px-2 py-0.5 rounded-full font-bold border border-blue-800",
                      renderId: "render-7c9b22b6",
                      as: "span",
                      children: "Neuester"
                    }), /* @__PURE__ */ jsx(StatusBadge, {
                      status: build.status,
                      small: true
                    })]
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-xs text-zinc-500 mt-0.5",
                    renderId: "render-f796535f",
                    as: "p",
                    children: timeAgo(build.created_at)
                  })]
                }), build.status === "completed" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  href: build.apk_url,
                  download: true,
                  className: "flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold border border-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-900/20 transition-all",
                  renderId: "render-7eb7d155",
                  as: "a",
                  children: [/* @__PURE__ */ jsx(Download, {
                    size: 12
                  }), " APK"]
                }), build.status === "failed" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "text-xs text-red-400 truncate max-w-[140px]",
                  title: build.error_message,
                  renderId: "render-aec0810a",
                  as: "span",
                  children: [build.error_message?.slice(0, 40), "…"]
                })]
              }, build.id))
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-5",
          renderId: "render-24dca208",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-zinc-900 rounded-2xl border border-zinc-800 p-5",
            renderId: "render-54271a8f",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "font-semibold text-white mb-4 flex items-center gap-2 text-sm",
              renderId: "render-d6dae30c",
              as: "h4",
              children: [/* @__PURE__ */ jsx(Settings, {
                size: 15
              }), " Konfiguration"]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-3 text-xs",
              renderId: "render-6fe73cce",
              as: "div",
              children: [[["Version", project.version || "1.0.0"], ["Build-Typ", project.build_type?.toUpperCase()], ["Display", nativeFeatures.display || "standalone"], ["Ausrichtung", nativeFeatures.orientation || "any"]].map(([label, val]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex justify-between",
                renderId: "render-b08be83c",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-zinc-500",
                  renderId: "render-5e08aa87",
                  as: "span",
                  children: label
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "font-mono text-white font-semibold",
                  renderId: "render-9aff7887",
                  as: "span",
                  children: val
                })]
              }, label)), nativeFeatures.theme_color && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex justify-between items-center",
                renderId: "render-a4e0cb28",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "text-zinc-500 flex items-center gap-1",
                  renderId: "render-1af3fb8b",
                  as: "span",
                  children: [/* @__PURE__ */ jsx(Palette, {
                    size: 11
                  }), " Theme"]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center gap-2",
                  renderId: "render-82d66f5f",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "h-4 w-4 rounded border border-zinc-700",
                    style: {
                      backgroundColor: nativeFeatures.theme_color
                    },
                    renderId: "render-19317a12",
                    as: "div"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "font-mono text-white",
                    renderId: "render-03ea469c",
                    as: "span",
                    children: nativeFeatures.theme_color
                  })]
                })]
              }), (() => {
                const active = ["push", "camera", "location", "biometrics"].filter((k) => nativeFeatures[k] === true);
                if (!active.length) return null;
                return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  renderId: "render-69002bb0",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-zinc-500 mb-1.5",
                    renderId: "render-e98dce06",
                    as: "p",
                    children: "Native Features"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "flex flex-wrap gap-1.5",
                    renderId: "render-47e00502",
                    as: "div",
                    children: active.map((k) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-400 text-[10px] font-bold uppercase border border-blue-800",
                      renderId: "render-34b5a3f6",
                      as: "span",
                      children: k
                    }, k))
                  })]
                });
              })()]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-zinc-900 rounded-2xl border border-zinc-800 p-5",
            renderId: "render-2448d0f9",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "font-semibold text-white mb-3 flex items-center gap-2 text-sm",
              renderId: "render-88fb2577",
              as: "h4",
              children: [/* @__PURE__ */ jsx(ShieldCheck, {
                size: 15,
                className: "text-blue-400"
              }), " Keystore"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-zinc-500 leading-relaxed mb-3",
              renderId: "render-4e9c4f58",
              as: "p",
              children: "Debug-Keystore automatisch generiert. Für Play-Store eigenen Keystore hochladen."
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-full py-2 rounded-lg border border-zinc-700 text-zinc-400 text-xs font-semibold hover:bg-zinc-800 transition-all",
              renderId: "render-fb3f31e5",
              as: "button",
              children: "Eigenen Keystore hochladen"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "bg-zinc-900 rounded-2xl border border-zinc-800 p-5",
            renderId: "render-8a620434",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "font-semibold text-white mb-3 flex items-center gap-2 text-sm",
              renderId: "render-0e8ba61e",
              as: "h4",
              children: [/* @__PURE__ */ jsx(BookOpen, {
                size: 15
              }), " Installation"]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "space-y-2.5 text-xs text-zinc-500",
              renderId: "render-458ab90e",
              as: "ol",
              children: ["APK auf Android-Gerät übertragen", '"Unbekannte Quellen" in Einstellungen aktivieren', "APK-Datei öffnen und installieren", "App starten und testen"].map((step, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex gap-2.5",
                renderId: "render-7988a75e",
                as: "li",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "h-4 w-4 rounded-full bg-blue-900/30 text-blue-400 border border-blue-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5",
                  renderId: "render-beacc412",
                  as: "span",
                  children: i + 1
                }), step]
              }, i))
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "mt-4 pt-4 border-t border-zinc-800",
              renderId: "render-57123432",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[10px] text-zinc-600 mb-2 font-semibold uppercase tracking-wider",
                renderId: "render-473eef32",
                as: "p",
                children: "Hilfe"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "space-y-1.5",
                renderId: "render-f6d8f22d",
                as: "ul",
                children: ["Im Play Store veröffentlichen", "Push-Benachrichtigungen einrichten", "Asset Links (TWA) validieren"].map((item) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "text-xs text-blue-400 hover:text-blue-300 cursor-pointer flex items-center gap-1",
                  renderId: "render-b2729026",
                  as: "li",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    renderId: "render-693c99ab",
                    as: "span",
                    children: "→"
                  }), " ", item]
                }, item))
              })]
            })]
          })]
        })]
      })]
    })
  });
}

const page$2 = UNSAFE_withComponentProps(function WrappedPage(props) {
  const params = useParams();
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ProjectDetails, {
      ...props,
      id: params.id
    })
  });
});

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: 'Module' }));

function SettingsPage() {
  return /* @__PURE__ */ jsx(NavLayout, {
    activeTab: "settings",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-2xl mx-auto p-8",
      renderId: "render-682a8aae",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-8",
        renderId: "render-746a83f1",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xl font-semibold text-white mb-1 flex items-center gap-2",
          renderId: "render-3e391a6d",
          as: "h1",
          children: [/* @__PURE__ */ jsx(Settings, {
            size: 18,
            className: "text-zinc-400"
          }), " Einstellungen"]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm text-zinc-500",
          renderId: "render-6cb0658d",
          as: "p",
          children: "App-Konfiguration und Server-Verwaltung"
        })]
      }), /* @__PURE__ */ jsx(ServerManager, {})]
    })
  });
}

const page$1 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SettingsPage, {
      ...props
    })
  });
});

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: 'Module' }));

function AppLayout({
  children,
  activeTab = "dashboard"
}) {
  const {
    data: user,
    loading
  } = useUser();
  const menuItems = [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard"
  }, {
    id: "new",
    label: "Neues Projekt",
    icon: PlusCircle,
    href: "/projects/new"
  }, {
    id: "settings",
    label: "Einstellungen",
    icon: Settings,
    href: "/settings"
  }, {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck,
    href: "/admin",
    adminOnly: true
  }];
  if (loading) return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "min-h-screen bg-zinc-950 flex items-center justify-center",
    renderId: "render-2ebc972c",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "animate-spin rounded-full h-8 w-8 border-2 border-zinc-700 border-t-blue-500",
      renderId: "render-3ef74a50",
      as: "div"
    })
  });
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-zinc-950 flex text-zinc-100",
    renderId: "render-082d0e77",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col shrink-0",
      renderId: "render-be9086e3",
      as: "aside",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "px-4 h-14 flex items-center border-b border-zinc-800",
        renderId: "render-2233d8e6",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/dashboard",
          className: "flex items-center gap-2.5",
          renderId: "render-955a3d7c",
          as: "a",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: "/easyapk-logo.jpg?v=3",
            className: "h-12 w-12 object-contain",
            style: {
              mixBlendMode: "screen",
              clipPath: "circle(46%)",
              filter: "brightness(1.1)"
            },
            alt: "EasyApk",
            renderId: "render-8fedee82",
            as: "img"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-semibold text-white tracking-tight",
            renderId: "render-f9778136",
            as: "span",
            children: "EasyApk"
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex-1 px-2 py-3 space-y-0.5",
        renderId: "render-b5dcb5ce",
        as: "nav",
        children: menuItems.filter((item) => !item.adminOnly || user?.role === "admin").map((item) => {
          const Icon = item.icon;
          const isActive = typeof window !== "undefined" && (window.location.pathname === item.href || item.id === "dashboard" && window.location.pathname === "/dashboard");
          return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            href: item.href,
            className: `flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-all ${isActive ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"}`,
            renderId: "render-9c0acf25",
            as: "a",
            children: [/* @__PURE__ */ jsx(Icon, {
              size: 15,
              className: isActive ? "text-blue-400" : ""
            }), item.label]
          }, item.id);
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "px-2 py-3 border-t border-zinc-800 space-y-0.5",
        renderId: "render-744d1fa7",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2.5 px-3 py-2 rounded-md",
          renderId: "render-07f1a036",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-semibold shrink-0",
            renderId: "render-685ad1be",
            as: "div",
            children: user?.email?.[0]?.toUpperCase() || "U"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex-1 min-w-0",
            renderId: "render-5e273842",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-zinc-300 truncate",
              renderId: "render-966d6b4a",
              as: "div",
              children: user?.email
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-[10px] text-zinc-600 capitalize",
              renderId: "render-24b971be",
              as: "div",
              children: user?.role || "Benutzer"
            })]
          }), /* @__PURE__ */ jsx(ThemeToggle, {})]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          href: "/account/logout",
          className: "flex items-center gap-2.5 px-3 py-2 text-zinc-500 hover:text-zinc-300 text-xs rounded-md hover:bg-zinc-800/60 transition-colors w-full",
          renderId: "render-cd016a87",
          as: "a",
          children: [/* @__PURE__ */ jsx(LogOut, {
            size: 13
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-b4b285c6",
            as: "span",
            children: "Abmelden"
          })]
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex-1 overflow-auto bg-zinc-950",
      renderId: "render-9a3ebdc9",
      as: "main",
      children
    })]
  });
}

function SetupAdmin() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const promote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/promote-me", {
        method: "POST"
      });
      const data = await res.json();
      setStatus(data.message || data.error);
    } catch (e) {
      setStatus("Fehler beim Befördern.");
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx(AppLayout, {
    activeTab: "dashboard",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-md mx-auto py-20 text-center",
      renderId: "render-76c3686d",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "h-20 w-20 rounded-full bg-[#d4af37]/10 flex items-center justify-center mx-auto mb-8 border border-[#d4af37]/20",
        renderId: "render-2b0c9c6b",
        as: "div",
        children: /* @__PURE__ */ jsx(ShieldAlert, {
          className: "text-[#d4af37]",
          size: 40
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-3xl font-bold mb-4 text-white",
        renderId: "render-ba825d7d",
        as: "h1",
        children: ["Admin-Zugang ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-[#d4af37]",
          renderId: "render-977ea021",
          as: "span",
          children: "aktivieren"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-gray-400 mb-8",
        renderId: "render-67d7c3d6",
        as: "p",
        children: "Nutzen Sie diese Seite nur einmalig, um Ihren Account zum Administrator zu befördern. Löschen Sie diesen Pfad danach aus Sicherheitsgründen."
      }), status ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold mb-4",
        renderId: "render-b01b4abd",
        as: "div",
        children: status
      }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: promote,
        disabled: loading,
        className: "w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f1c40f] text-black font-extrabold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]",
        renderId: "render-f6c55ed7",
        as: "button",
        children: [/* @__PURE__ */ jsx(Rocket, {
          size: 20
        }), " Jetzt Admin werden"]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        href: "/dashboard",
        className: "block mt-6 text-sm text-gray-500 hover:text-white underline",
        renderId: "render-e5090710",
        as: "a",
        children: "Zurück zum Dashboard"
      })]
    })
  });
}

const page = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SetupAdmin, {
      ...props
    })
  });
});

const route10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-b76e9af1",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-73da0b22",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-6f56dec7",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-fe5ed074",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-011712e7",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-9f43c057",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-51a5f215",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-8c60f4bf",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-c9fe2f49",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-0bf7e34f",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-b51fbe7e",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-94bc6da4",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-6b5c6e0d",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-888ce5e9",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-51920b07",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-50efa7ab",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-98182b32",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-8c002652",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-21525a17",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-1cb34c43",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-64f7415b",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-99ee2a6b",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-5d1d77ab",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-932dd344",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-5bb204e8",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-80d72c9a",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-b376db59",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-b45d925d",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-e9b1afe4",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-03471eda",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-cc7afcbb",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-26bce826",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-fe0a634c",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-7f2affcd",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-43f65f2f",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-88265cca",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-B3ujSpj8.js','imports':['/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/index-bYrxpRiI.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/root-C3nSIA2n.js','imports':['/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/index-bYrxpRiI.js','/assets/PolymorphicComponent-m3EPk8oL.js','/assets/react-CrDNMclP.js'],'css':['/assets/root-D6sR9oaX.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CwXdBAbC.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/smartphone-DydgCmRT.js','/assets/globe-B1DS4exG.js','/assets/plus-CIC9DESs.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/logout/page':{'id':'account/logout/page','parentId':'root','path':'account/logout','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CIFLIEfo.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/useAuth-DuK4j7qz.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signin/page':{'id':'account/signin/page','parentId':'root','path':'account/signin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DZcfKK9D.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/useAuth-DuK4j7qz.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signup/page':{'id':'account/signup/page','parentId':'root','path':'account/signup','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-D0_cOP2w.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/useAuth-DuK4j7qz.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/page':{'id':'admin/page','parentId':'root','path':'admin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-KEFfU-R0.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/backend-config-DwrcSdvg.js','/assets/api-CCLOaSw9.js','/assets/ServerManager-M1U8KWEI.js','/assets/package-DsMqTYY9.js','/assets/terminal-De0E3naA.js','/assets/shield-alert-WBKCt6mx.js','/assets/circle-alert-D3eEZNgd.js','/assets/useUser-DZRt8rYu.js','/assets/react-CrDNMclP.js','/assets/zap-Cj9q2cUs.js','/assets/globe-B1DS4exG.js','/assets/refresh-ccw-SB6hSliT.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'dashboard/page':{'id':'dashboard/page','parentId':'root','path':'dashboard','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CEB1pBuq.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/backend-config-DwrcSdvg.js','/assets/api-CCLOaSw9.js','/assets/package-DsMqTYY9.js','/assets/plus-CIC9DESs.js','/assets/play-DJWNCDHb.js','/assets/useUser-DZRt8rYu.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'projects/new/page':{'id':'projects/new/page','parentId':'root','path':'projects/new','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-fUi3w6UD.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/backend-config-DwrcSdvg.js','/assets/api-CCLOaSw9.js','/assets/palette-DD4_6SoJ.js','/assets/refresh-ccw-SB6hSliT.js','/assets/globe-B1DS4exG.js','/assets/smartphone-DydgCmRT.js','/assets/zap-Cj9q2cUs.js','/assets/rocket-Cq60GjYf.js','/assets/useUser-DZRt8rYu.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'projects/[id]/page':{'id':'projects/[id]/page','parentId':'root','path':'projects/:id','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BquFWuWi.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/backend-config-DwrcSdvg.js','/assets/api-CCLOaSw9.js','/assets/package-DsMqTYY9.js','/assets/palette-DD4_6SoJ.js','/assets/play-DJWNCDHb.js','/assets/refresh-ccw-SB6hSliT.js','/assets/terminal-De0E3naA.js','/assets/circle-alert-D3eEZNgd.js','/assets/useUser-DZRt8rYu.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'settings/page':{'id':'settings/page','parentId':'root','path':'settings','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DF0uAo2J.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/backend-config-DwrcSdvg.js','/assets/ServerManager-M1U8KWEI.js','/assets/useUser-DZRt8rYu.js','/assets/zap-Cj9q2cUs.js','/assets/globe-B1DS4exG.js','/assets/refresh-ccw-SB6hSliT.js','/assets/circle-alert-D3eEZNgd.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'setup-admin/page':{'id':'setup-admin/page','parentId':'root','path':'setup-admin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-BFzAkpUT.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js','/assets/layout-BwDeApK8.js','/assets/useUser-DZRt8rYu.js','/assets/shield-alert-WBKCt6mx.js','/assets/rocket-Cq60GjYf.js','/assets/react-CrDNMclP.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/not-found-DYGx9Hdu.js','imports':['/assets/PolymorphicComponent-m3EPk8oL.js','/assets/chunk-UVKPFVEO-CkH3atAL.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-5b8bf710.js','version':'5b8bf710','sri':undefined};

const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":false,"unstable_passThroughRequests":false,"unstable_subResourceIntegrity":false,"unstable_trailingSlashAwareDataRequests":false,"unstable_previewServerPrerendering":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = ["/*?"];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "account/logout/page": {
          id: "account/logout/page",
          parentId: "root",
          path: "account/logout",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "account/signin/page": {
          id: "account/signin/page",
          parentId: "root",
          path: "account/signin",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "account/signup/page": {
          id: "account/signup/page",
          parentId: "root",
          path: "account/signup",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "admin/page": {
          id: "admin/page",
          parentId: "root",
          path: "admin",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "dashboard/page": {
          id: "dashboard/page",
          parentId: "root",
          path: "dashboard",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "projects/new/page": {
          id: "projects/new/page",
          parentId: "root",
          path: "projects/new",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "projects/[id]/page": {
          id: "projects/[id]/page",
          parentId: "root",
          path: "projects/:id",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "settings/page": {
          id: "settings/page",
          parentId: "root",
          path: "settings",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        },
  "setup-admin/page": {
          id: "setup-admin/page",
          parentId: "root",
          path: "setup-admin",
          index: undefined,
          caseSensitive: undefined,
          module: route10
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route11
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
