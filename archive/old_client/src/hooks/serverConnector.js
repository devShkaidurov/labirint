export const serverHook = () => {

    function registerUser (payload) {
        return new Promise ((res, rej) => {
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

    function createMaze (payload) {
        console.dir(payload);
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/maze';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(payload)
            }).then(ans => {
                res(ans);
            }, reject => {
                console.dir(reject);
                rej(reject);
            })
            .catch(e => {
                console.dir(e);
                rej(e);
            })
        })
    }


    return {
        registerUser,
        authUser,
        createMaze,
    }
}
