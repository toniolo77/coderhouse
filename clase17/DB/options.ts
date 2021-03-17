export const options = {
  client: "sqlite3",
  connection: {
    filename: "./DB/chat.sqlite",
  },
};

export const createTables = async (knex) => {
  try {
    const existChat = await knex.schema.hasTable("chat");
    if (!existChat) {
      await knex.schema.createTable("chat", function (t) {
        t.increments("id").primary().notNullable();
        t.string("email", 100).notNullable();
        t.datetime("fecha").defaultTo(knex.fn.now());
        t.string("mensaje", 255).notNullable();
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
    knex.destroy();
  }
};
