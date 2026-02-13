const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');
const db = require('../models');

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, '..', 'migrations', '*.js')
  },
  context: db.sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize: db.sequelize }),
  logger: console
});

module.exports = {
  async runPendingMigrations() {
    // Ensure DB is connected
    await db.sequelize.authenticate();
    const pending = await umzug.pending();
    if (pending.length === 0) {
      console.log('No pending migrations');
      return;
    }
    console.log(`Applying ${pending.length} pending migrations...`);
    await umzug.up();
    console.log('Migrations applied');
  },
  async list() {
    return await umzug.pending();
  },
  async revertLast() {
    await umzug.down();
  }
};

// If run directly, execute pending migrations
if (require.main === module) {
  (async () => {
    try {
      await module.exports.runPendingMigrations();
      process.exit(0);
    } catch (e) {
      console.error('Migration runner failed:', e);
      process.exit(1);
    }
  })();
}
