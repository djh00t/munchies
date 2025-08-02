import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create system settings
    await prisma.systemSettings.upsert({
        where: { key: 'app_version' },
        update: { value: '1.0.0' },
        create: {
            key: 'app_version',
            value: '1.0.0'
        }
    });

    await prisma.systemSettings.upsert({
        where: { key: 'maintenance_mode' },
        update: { value: 'false' },
        create: {
            key: 'maintenance_mode',
            value: 'false'
        }
    });

    // Create sample users for development
    const testUser = await prisma.user.upsert({
        where: { email: 'test@munchies.app' },
        update: {},
        create: {
            email: 'test@munchies.app',
            name: 'Test User',
            provider: 'email',
            preferences: {
                create: {
                    dietaryRestrictions: ['vegetarian'],
                    allergies: ['nuts'],
                    cuisinePreferences: ['italian', 'mexican'],
                    cookingSkillLevel: 'intermediate',
                    maxCookingTime: 45,
                    servingSize: 2
                }
            }
        }
    });

    // Create sample inventory items
    const inventoryItems = [
        {
            name: 'Tomatoes',
            category: 'vegetables',
            quantity: 6,
            unit: 'pieces',
            location: 'fridge',
            expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        },
        {
            name: 'Pasta',
            category: 'grains',
            quantity: 1,
            unit: 'package',
            location: 'pantry',
            expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
        },
        {
            name: 'Olive Oil',
            category: 'oils',
            quantity: 1,
            unit: 'bottle',
            location: 'pantry',
            expirationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) // 6 months from now
        },
        {
            name: 'Cheese',
            category: 'dairy',
            quantity: 200,
            unit: 'grams',
            location: 'fridge',
            expirationDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks from now
        }
    ];

    for (const item of inventoryItems) {
        await prisma.inventoryItem.upsert({
            where: {
                id: `${testUser.id}-${item.name.toLowerCase().replace(/\s+/g, '-')}`
            },
            update: {},
            create: {
                ...item,
                userId: testUser.id
            }
        });
    }

    // Create sample recipes
    const sampleRecipe = await prisma.recipe.upsert({
        where: { id: 'sample-pasta-recipe' },
        update: {},
        create: {
            id: 'sample-pasta-recipe',
            title: 'Simple Pasta with Tomatoes',
            description: 'A quick and delicious pasta dish perfect for weeknight dinners.',
            servings: 2,
            prepTime: 10,
            cookTime: 15,
            totalTime: 25,
            difficulty: 'easy',
            calories: 450,
            source: 'admin',
            ingredients: {
                create: [
                    {
                        name: 'Pasta',
                        amount: 200,
                        unit: 'grams',
                        order: 1
                    },
                    {
                        name: 'Tomatoes',
                        amount: 4,
                        unit: 'pieces',
                        order: 2
                    },
                    {
                        name: 'Olive Oil',
                        amount: 2,
                        unit: 'tablespoons',
                        order: 3
                    },
                    {
                        name: 'Cheese',
                        amount: 50,
                        unit: 'grams',
                        order: 4
                    }
                ]
            },
            instructions: {
                create: [
                    {
                        step: 1,
                        text: 'Boil water in a large pot and cook pasta according to package instructions.'
                    },
                    {
                        step: 2,
                        text: 'While pasta is cooking, heat olive oil in a pan and add chopped tomatoes.'
                    },
                    {
                        step: 3,
                        text: 'Cook tomatoes for 5-7 minutes until they start to break down.'
                    },
                    {
                        step: 4,
                        text: 'Drain pasta and add to the tomato mixture. Toss to combine.'
                    },
                    {
                        step: 5,
                        text: 'Serve immediately with grated cheese on top.'
                    }
                ]
            },
            categories: {
                create: [
                    { category: 'pasta' },
                    { category: 'vegetarian' },
                    { category: 'quick-meals' }
                ]
            },
            tags: {
                create: [
                    { tag: 'easy' },
                    { tag: 'weeknight' },
                    { tag: 'italian' }
                ]
            }
        }
    });

    // Create a sample meal plan
    const startDate = new Date();
    const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

    await prisma.mealPlan.upsert({
        where: { id: 'sample-weekly-plan' },
        update: {},
        create: {
            id: 'sample-weekly-plan',
            userId: testUser.id,
            name: 'This Week\'s Meals',
            startDate,
            endDate,
            meals: {
                create: [
                    {
                        recipeId: sampleRecipe.id,
                        mealType: 'dinner',
                        mealDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
                        servings: 2
                    }
                ]
            }
        }
    });

    // Create a sample shopping list
    await prisma.shoppingList.upsert({
        where: { id: 'sample-shopping-list' },
        update: {},
        create: {
            id: 'sample-shopping-list',
            userId: testUser.id,
            name: 'Weekly Grocery Run',
            items: {
                create: [
                    {
                        name: 'Bread',
                        category: 'bakery',
                        quantity: 1,
                        unit: 'loaf',
                        order: 1
                    },
                    {
                        name: 'Milk',
                        category: 'dairy',
                        quantity: 1,
                        unit: 'liter',
                        order: 2
                    },
                    {
                        name: 'Eggs',
                        category: 'protein',
                        quantity: 12,
                        unit: 'pieces',
                        order: 3
                    }
                ]
            }
        }
    });

    console.log('✅ Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during database seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
