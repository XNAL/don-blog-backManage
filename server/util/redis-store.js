const Redis = require('ioredis');
const { Store } = require('koa-session2');

class RedisStore extends Store {
  constructor (redisConfig) {
    super();
    this.redis = new Redis(redisConfig);
  }

  async get (sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set (session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
      return true;
    } catch (e) {
      return false;
    }
  }

  async destroy (sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}

module.exports = RedisStore;
