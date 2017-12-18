const Redis = require('ioredis');

class DraftRedis {
  constructor (redisConfig) {
    this.redis = new Redis(redisConfig);
  }

  async get (key) {
    let data = await this.redis.get(key);
    return JSON.parse(data);
  }

  async set (key, data, maxAge = 7 * 24 * 60 * 60 * 1000) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(key, JSON.stringify(data), 'EX', maxAge / 1000);
    } catch (e) {}
    return 'success';
  }

  async destroy (key) {
    return await this.redis.del(key);
  }
}

module.exports = DraftRedis;
