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
    for (let i = 1; i <= 10; i++) {
        users.push({ 
            id: i, 
            first_name: `First${i}`, 
            last_name: `Last${i}`, 
            username: `User${i}`, 
            password: `Password${i}` 
        });
    }
    await knex('User').insert(users);

    // await knex('table_name').insert([
    //     {id: 1, first_name: `First${i}`, last_name: `Last${i}`, username: `User${i}`, password: `Password${i}`},
    //     {id: 1, first_name: `First${i}`, last_name: `Last${i}`, username: `User${i}`, password: `Password${i}`},
    //     {id: 1, first_name: `First${i}`, last_name: `Last${i}`, username: `User${i}`, password: `Password${i}`},
    //   ]);

    const items = [];
    for (let i = 1; i <= 10; i++) {
        items.push({ 
            id: i, 
            user_id: i, 
            item_name: `Item${i}`, 
            description: `Description${i}`, 
            quantity: i 
        });
    }
    await knex('Item').insert(items);
};
