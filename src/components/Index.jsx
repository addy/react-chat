import React, { Fragment, useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const Index = () => {
  const [username, setUsername] = useState();
  const [inputValue, setInputValue] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    if (username) {
      const client = new W3CWebSocket('ws://127.0.0.1:3000');

      client.onopen = () => {
        const user = {
          username: username,
          ip: '127.0.0.1',
          port: '5555'
        };

        client.send(JSON.stringify(user));
      };

      client.onmessage = message => {
        setUsers(JSON.parse(message.data));
      };
    }
  }, [username]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {username ? (
        <Fragment>
          <div className="text-4xl">{`Connected as ${username}`}</div>
          {users && users.length > 0 ? (
            <ul>
              {users
                .filter(user => user.username !== username)
                .map(user => (
                  <li>{user.username}</li>
                ))}
            </ul>
          ) : (
            <div className="text-4xl">No one here :(</div>
          )}
        </Fragment>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-xs">
            <form className="bg-white">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  Please enter a username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={e => setInputValue(e.target.value)}
                />
                <button
                  className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-2 rounded"
                  type="button"
                  onClick={() => setUsername(inputValue)}
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
