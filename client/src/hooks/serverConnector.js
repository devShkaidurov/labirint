export const serverHook = () => {
    function findUser (payload) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/checkUser';
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
        findUser
    }
}
