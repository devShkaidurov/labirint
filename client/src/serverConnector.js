export const serverConnector = () => {

    function register (payload) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/register';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(payload)
            }).then((ans) => {
                res(ans);
            }, reject => {
                rej(reject);
            })
            .catch(e => {
                rej(e);
            })
        })
    }

    function auth (payload) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/auth';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(payload)
            }).then((ans) => {
                res(ans);
            }, reject => {
                rej(reject);
            })
            .catch(e => {
                rej(e);
            })
        })
    }

    return {
        register,
        auth
    }
}