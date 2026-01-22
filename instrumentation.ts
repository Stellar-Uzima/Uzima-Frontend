import * as Sentry from "@sentry/nextjs";

type RequestInfo = {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
};

type ErrorContext = {
	routerKind: string;
	routePath: string;
	routeType: string;
};

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.server.config");
  }
}

export async function onRequestError(
	err: unknown,
	request: RequestInfo,
	context: ErrorContext,
) {
	await Sentry.captureRequestError(err, request, context);
}