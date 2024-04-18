/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
    // delete existing entries
    await knex('Item').del();
    await knex('User').del();

    // insert seed entries
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
    await knex('User').insert(users);

    const items = [
        { user_id: 1, item_name: "Cars", description: "Cars are vehicles with four wheels that are primarily used for transportation. They come in various models and colors.", quantity: 10 },
        { user_id: 2, item_name: "Bananas", description: "Bananas are a popular fruit that are rich in potassium. They have a sweet taste and a creamy texture.", quantity: 20 },
        { user_id: 3, item_name: "Laptops", description: "Laptops are portable computers that you can take with you and use in different environments. They are great for work and entertainment.", quantity: 30 },
        { user_id: 1, item_name: "Coffee", description: "Coffee is a popular beverage that is enjoyed by many people around the world. It is often consumed to boost energy levels.", quantity: 40 },
        { user_id: 2, item_name: "Keyboards", description: "Keyboards are input devices used with computers. They have keys for letters, numbers and special characters.", quantity: 50 },
        { user_id: 3, item_name: "Books", description: "Books are a collection of pages that are bound together, usually containing text for reading. They are a great source of knowledge and entertainment.", quantity: 60 },
        { user_id: 3, item_name: "Fish oil", description: "Fish oil is a dietary supplement that is rich in omega-3 fatty acids. It's known to have many health benefits.", quantity: 70 },
    ];
    await knex('Item').insert(items);
};
