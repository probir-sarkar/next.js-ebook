import { hc } from "hono/client";
import type { AppType } from "../../../cloudflare-api/src";

export const client = hc<AppType>(process.env.CLOUDFLARE_API_URL!);
