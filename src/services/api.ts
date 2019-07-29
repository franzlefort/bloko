// import { ApolloClient } from 'apollo-client';
// import { ApolloLink } from 'apollo-link';
// import { createHttpLink } from 'apollo-link-http';
// import { setContext } from 'apollo-link-context';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { onError } from 'apollo-link-error';

import Environment from './environment';
import Storage from './storage';
import EventService from './event';

// interface Payload {
//   redirect: boolean;
//   email?: string;
// }

// const uri = Environment.CurrentAPI;

// const httpLink = new createHttpLink({ uri });

// const authLink = setContext((_, { headers }) => {
//   const token = Storage.get('token');
//   const result = { ...headers };
//   if (token) result.Authorization = `Bearer ${token}`;
//   return {
//     headers: result
//   };
// });

// const errorHandler = onError(({
//   graphQLErrors, networkError, operation, forward
// }) => {
//   if (networkError) {
//     console.log('networkError -', networkError.toString());

//     if (networkError.toString() === 'TypeError: Failed to fetch') {
//       EventService.emit('internal-server-error', {
//         type: 'failed',
//         operation
//       });
//     }

//     if (networkError.toString().includes('status code 500')) {
//       EventService.emit('internal-server-error', {
//         type: 'failed',
//         operation
//       });
//       EventService.emit('internal-server-error', {
//         type: 'code_500',
//         operation
//       });
//     }

//     return forward(operation);
//   }

//   if (graphQLErrors) {
//     for (const err of graphQLErrors) {
//       if (err.message.toLowerCase() === 'invalid token') {
//         const payload: Payload = {
//           redirect: true,
//         };

//         const sessionId = Storage.get('sessionId');

//         if (sessionId) {
//           payload.redirect = false;
//           payload.email = Storage.get('email');
//         }

//         return EventService.emit('authentication-error', payload);
//       }
//     }
//     return forward(operation);
//   }
// });

// const link = ApolloLink.from([
//   authLink,
//   errorHandler,
//   httpLink,
// ]);

// const cache = new InMemoryCache({ addTypename: false });

// const defaultOptions = {
//   query: {
//     fetchPolicy: 'network-only', // disable cache
//     errorPolicy: 'all',
//   },
// };

// const API = new ApolloClient({ link, cache, defaultOptions });

// export default API;
