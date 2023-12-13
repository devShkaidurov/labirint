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

    function validateMaze (maze) {
        return new Promise((res, rej) => {
            // const url = 'http://127.0.0.1:7171/validateMaze';
            // fetch(url, {
            //     method: "POST",
            //     body: JSON.stringify(maze)
            // }).then(ans => {
            //     res(ans);
            // }, reject => {
            //     rej(reject);
            // })
            // .catch(e => {
            //     rej(e);
            // })
            res()
        })
    }

    function getEntries (maze) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/getRandomEntry';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(maze)
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
    
    function saveMaze (data) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/saveMaze';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
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

    function generatePrime (data) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/createPrime';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
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

    function generateBT (data) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/createBT';
            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
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

    // functions for user
    function getMazes () {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/getMazes';
            fetch(url, {
                method: "GET",
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

    function getPath (payload) {
        return new Promise ((res, rej) => {
            const url = 'http://127.0.0.1:7171/getPath';
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
        auth,
        validateMaze,
        getEntries,
        saveMaze,
        generatePrime,
        generateBT,
        getMazes,
        getPath
    }
}