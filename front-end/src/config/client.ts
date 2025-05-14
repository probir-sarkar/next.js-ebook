import { hc } from "hono/client";
import type { AppType } from "../../../cloudflare-api/src";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_CLOUDFLARE_API_URL!);
