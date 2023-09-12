export const serverHook = () => {

    function registerUser (payload) {
        return new Promise ((res, rej) => {
            res();
            return;
            const url = 'http://127.0.0.1:7171/register';
            fetch(url, {
                method: "POST",
                mode: 'no-cors',
                body: JSON.stringify(payload)
            }).then(ans => {
                res(ans);
            }, reject => {
                rej(reject);
                console.dir(reject);
            })
            .catch(e => {
                rej(e);
                console.dir(e);
            })
        })
    }

    function authUser (payload) {
        return new Promise ((res, rej) => {
            res();
            return;
            const url = 'http://127.0.0.1:7171/auth';
            fetch(url, {
                method: "POST",
                mode: 'no-cors',
                body: JSON.stringify(payload)
            }).then(ans => {
                res(ans);
            }, reject => {
                rej(reject);
                console.dir(reject);
            })
            .catch(e => {
                rej(e);
                console.dir(e);
            })
        })
    }


    return {
        registerUser,
        authUser
    }
}
