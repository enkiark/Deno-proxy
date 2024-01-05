import { Proxy } from "./mod.ts";

const server = Deno.listen({ hostname: "127.0.0.1", port: 418 });

const proxy = new Proxy.HTTP(server, "http://192.227.194.137:5244/d/root/onedrive2/apk/%EB%B6%80%EA%B3%A0%EC%9E%A5.apk");

proxy.listen();
