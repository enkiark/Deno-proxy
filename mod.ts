export namespace Proxy {
    export class HTTP {
        public readonly listener: Deno.Listener;
        public readonly target: URL;

        public listening = false;

        constructor(listener: Deno.Listener, target: URL | string) {
            this.listener = listener;
            this.target = target instanceof URL ? target : new URL(target);
        }

        private async handler(conn: Deno.Conn) {
            const httpConn = Deno.serveHttp(conn);

            for await (const { request, respondWith } of httpConn) {
                const url = new URL(request.url);

                url.hostname = this.target.hostname;
                url.port = this.target.port;

                respondWith(fetch(url.toString(), request));
            }
        }

        public async listen() {
            this.listening = true;

            while (this.listening) {
                this.handler(await this.listener.accept());
            }
        }

        public stop() {
            this.listening = false;
        }
    }
}
