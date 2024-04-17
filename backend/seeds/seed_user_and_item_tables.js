/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Delete existing entries
    await knex('Item').del();
    await knex('User').del();

    // Insert seed entries
    const users = [];
    for (let i = 1; i <= 3; i++) {
        users.push({ 
            first_name: `First${i}`, 
            last_name: `Last${i}`, 
            username: `User${i}`, 
            password: `Password${i}` 
        });
    }
    await knex('User').insert(users);

    const items = [];
    for (let i = 1; i <= 3; i++) {
        items.push({ 
            user_id: i,
            item_name: `Item${i}`, 
            description: `Description${i}`, 
            quantity: i 
        });
    }
    await knex('Item').insert(items);
};
