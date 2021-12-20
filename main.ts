export class HTTP_PROXY{
    async request(url){
        let data = await fetch(url);
        return await data.text();
    }
}