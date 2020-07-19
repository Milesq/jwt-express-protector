# JWT Express Protector

JWT protector is a middleware to bring auth to your Express application!

## Install

`yarn add jwt-express-protector`

`npm i jwt-express-protector`

## Using

In the beginning, you must create an instance of the Protector.

```js
const jwtProtector = createJWTProtector({
  secret: 'Secret key, used to create JWT',
});
```

Now `jwtProtector` is an Express middleware. You can use it like in example

```js
app.get('/secret', jwtProtector, (req, res) => {
  res.send('Hello, World!');
});
```

Now when the unknown one user tries to fetch our endpoint, the one will receive a 401 HTTP error. But when the one gives JWT to us your handler will be invoked, and he receives _'Hello, World'_.

### Verifing user

`createJWTProtector` takes as an argument options object. You must pass `secret` property, and you can pass `verifyUser` function. `verifyUser` should take one argument named `payload`, and returns data about the user. Later you have an access to `req.user` which is JWT payload (if `verifyUser` wasn't passed) or user data.

### Asynchronous veryfing user

if verifyUser is asynchornous, should returns `Promise<T>` then req.user will equal `T`
