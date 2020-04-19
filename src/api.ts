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

function verifyResponse(res: unknown): asserts res is Todo[] {
  if (!Array.isArray(res)) {
    throw new Error('not an array');
  }
  for (const elem of res) {
    if (typeof elem['id'] != 'number') {
      throw new Error('id is not a number');
    }
    if (typeof elem['title'] != 'string') {
      throw new Error('title is not a string');
    }
  }
}

function retrieveTodos(): Reader {
  let status = 'pending';
  let response: any;

  const promise = fetch(ENDPOINT)
    .then(wait)
    .then(res => res.json())
    .then(res => {
      verifyResponse(res);
      return res;
    })
    .then(todos => {
      status = 'success';
      response = todos;
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
