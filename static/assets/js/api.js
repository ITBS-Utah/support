function api_() {
    (this.get = async function (route = '', resType) {
        if (route && resType) {
            const response = await fetch('/api/v1' + route, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer'
            });

            if (resType == 'json') {
                return response.json();

            } else if (resType == 'text') {
                return response.text();
            } else {
                alert('The API server sent the error:\n\n Invalid response type');

                return 'invalid response type.';
            }
        }
    }),
        (this.post = async function (route = '', data = {}, resType) {
            if (route && data && resType) {
                const response = await fetch('/api/v1' + route, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                    body: JSON.stringify(data)
                });

                if (resType == 'json') {
                    return response.json();
                } else if (resType == 'text') {
                    return response.text();
                } else {
                    return 'invalid response type';
                }
            } else {
                return 'invalid parameters';
            }
        })
}

const API = new api_();