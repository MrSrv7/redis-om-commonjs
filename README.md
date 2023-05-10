<div align="center">
  <br/>
  <br/>
  <img width="360" src="logo.svg" alt="Redis OM" />
  <br/>
  <br/>
</div>

<p align="center">
    <p align="center">
        Object mapping, and more, for Redis and Node.js. Written in TypeScript.
    </p>
</p>

Checkout [Redis](https://redis.io/), [redis-om](https://github.com/redis/redis-om-node)

This is an example `NodeJS` application on how to use `redis-om` in the `CommonJS` approach. As I worked on a legacy NodeJS app written in CommonJS Syntax, I could not use the Module approach (like import, top-level await, etc.), so this is how I implemented redis-om in the legacy NodeJS app. Please let me know if there is anything that can be implemented better.

This example application is made with [redis-om-node-tutorial](https://github.com/redis-developer/redis-om-node-tutorial) as a base.

I have added the `Postman API Collection JSON` for a quick setup when testing the `REST API` endpoints. Check out the `Redis OM CommonJS API.json` in the root folder. This application can be used as a template if you need to implement `redis-om` in a legacy `CommonJS` application or planning to create a new `CommonJS` application.

### Disclaimer

This is not an official `CommonJS` solution for implementing `redis-om`. I implemented this as a workaround as there is no proper documentation for implementing the same yet. Also, this might feel highly opinionated as I created the app completely based on my coding style (creating the controllers, routes, helpers, etc.)
