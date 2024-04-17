/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // Delete existing entries
    await knex('Item').del();
    await knex('User').del();

    // Insert seed entries
    const users = [
        {
            first_name: `John`,
            last_name: `Doe`,
            username: `johndoe`,
            password: `$2a$10$Q9CLiWomMDbTsqXgLihZzeoMcjyOuX/UE9xdDSjwe8RfA1JxzdB4W`
        },

        {
            first_name: `Jane`,
            last_name: `Doe`,
            username: `janedoe`,
            password: `$2a$10$F911DdCP4FdgkJhxj7fN8ehG2fu5ISuYWX0S6a9UOWe6mqpMUFcYq`
        },

        {
            first_name: `Henry`,
            last_name: `Cho`,
            username: `henrycho`,
            password: `$2a$10$2fbGHHHYvee74hEEwyh4b.TQahCIDePqygX2Mfi0wmYOtf.foYZie`
        },
];

    // for (let i = 1; i <= 3; i++) {
    //     users.push({ 
    //         first_name: `First${i}`, 
    //         last_name: `Last${i}`, 
    //         username: `User${i}`, 
    //         password: `Password${i}` 
    //     });
    // }
    await knex('User').insert(users);

    const items = [
        { user_id: 1, item_name: "Item 1", description: "This is a short description for item 1.", quantity: 10 },
        { user_id: 2, item_name: "Item 2", description: "This is a short description for item 2.", quantity: 20 },
        { user_id: 3, item_name: "Item 3", description: "This is a short description for item 3.", quantity: 30 },
        { user_id: 1, item_name: "Item 4", description: "This is a short description for item 4.", quantity: 40 },
        { user_id: 2, item_name: "Item 5", description: "This is a short description for item 5.", quantity: 50 },
        { user_id: 3, item_name: "Item 6", description: "This is a short description for item 6.", quantity: 60 },
        { user_id: 1, item_name: "Item 7", description: "This is a short description for item 7.", quantity: 70 },
        { user_id: 2, item_name: "Item 8", description: "This is a short description for item 8.", quantity: 80 },
        { user_id: 3, item_name: "Item 9", description: "This is a short description for item 9.", quantity: 90 },
        { user_id: 1, item_name: "Item 10", description: "This is a short description for item 10.", quantity: 100 },
        { user_id: 2, item_name: "Item 11", description: "This is a short description for item 11.", quantity: 11 },
        { user_id: 3, item_name: "Item 12", description: "This is a short description for item 12.", quantity: 22 },
        { user_id: 1, item_name: "Item 13", description: "This is a short description for item 13.", quantity: 33 },
        { user_id: 2, item_name: "Item 14", description: "This is a short description for item 14.", quantity: 44 },
        { user_id: 3, item_name: "Item 15", description: "This is a short description for item 15.", quantity: 55 },
        { user_id: 1, item_name: "Item 16", description: "This is a short description for item 16.", quantity: 66 },
        { user_id: 2, item_name: "Item 17", description: "This is a short description for item 17.", quantity: 77 },
        { user_id: 3, item_name: "Item 18", description: "This is a short description for item 18.", quantity: 88 },
        { user_id: 1, item_name: "Item 19", description: "This is a short description for item 19.", quantity: 99 },
        { user_id: 2, item_name: "Item 20", description: "This is a short description for item 20.", quantity: 100 }
    ];

    // for (let i = 1; i <= 10; i++) {
    //     items.push({ 
    //         user_id: Math.floor(Math.random() * 3) + 1,
    //         item_name: `Item${i}`, 
    //         description: `Description${i}`, 
    //         quantity: i 
    //     });
    // }
    await knex('Item').insert(items);
};
