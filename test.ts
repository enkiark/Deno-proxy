import { Proxy } from "./mod.ts";

const server = Deno.listen({ hostname: "127.0.0.1", port: 418 });

const proxy = new Proxy.HTTP(server, "https://www.google.com");

proxy.listen();