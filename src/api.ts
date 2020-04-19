const ENDPOINT = 'https://jsonplaceholder.typicode.com/todos';

interface Todo {
  id: string;
  title: string;
}

interface Reader {
  read: () => Todo[];
}

function wait<T>(t: T): Promise<T> {
  return new Promise(res => setTimeout(() => res(t), 1000));
}

function retrieveTodos(): Reader {
  let status = 'pending';
  let response: any;

  const promise = fetch(ENDPOINT)
    .then(wait)
    .then(res => res.json())
    .then(json => {
      status = 'success';
      response = json;
    })
    .catch(err => {
      status = 'error';
      response = err;
    });

  const read = () => {
    switch (status) {
      case 'pending':
        throw promise;
      case 'error':
        throw response;
      default:
        return response;
    }
  };

  return { read };
}

export { retrieveTodos };
