const products = [
        {
            id: 1,
            name: "Smartphone X",
            category: "Electronics",
            price: 499.99,
            description: "A powerful smartphone with advanced features.",
            brand: "X-Tech",
            color: "Black",
            screen_size: "6.5 inches",
            image: "https://www.dataselect.com/wp-content/uploads/2023/08/Smartphone-Specifications-Explained-2.webp"
        },
        {
            id: 2,
            name: "Organic Cotton T-Shirt",
            category: "Fashion",
            price: 19.99,
            description: "Comfortable and sustainable t-shirt made from organic cotton.",
            size: "Medium",
            color: "White",
            material: "100% organic cotton",
            image: "https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png"
        },
        {
            id: 3,
            name: "Running Shoes",
            category: "Sports",
            price: 99.99,
            description: "Durable running shoes with excellent cushioning.",
            brand: "SpeedRun",
            color: "Blue",
            size: "US 10",
            image: "https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png"
        },
        {
            id: 4,
            name: "Stainless Steel Water Bottle",
            category: "Home & Kitchen",
            price: 24.99,
            description: "Reusable water bottle made from durable stainless steel.",
            capacity: "750ml",
            color: "Silver",
            material: "Stainless steel",
            image: "https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png"
        },
        {
            id: 5,
            name: "Graphic Design Book",
            category: "Books",
            price: 29.99,
            description: "Comprehensive guide to graphic design principles.",
            author: "John Smith",
            pages: 250,
            language: "English",
            image: "https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png"
        },
        {
            id: 6,
            name: "Gaming Mouse",
            category: "Gaming",
            price: 59.99,
            description: "High-precision gaming mouse with customizable buttons.",
            brand: "GamerTech",
            dpi: 12000,
            connectivity: "Wired",
            image: "https://miro.medium.com/v2/resize:fit:1400/1*KuGlXZjyTw7q38uzY_aZRA.png"
        },
        {
            id: 7,
            name: "Yoga Mat",
            category: "Sports",
            price: 29.99,
            description: "High-quality yoga mat for comfortable workouts.",
            color: "Purple",
            thickness: "6mm",
            material: "Eco-friendly TPE"
        },
        {
            id: 8,
            name: "Electric Kettle",
            category: "Home & Kitchen",
            price: 39.99,
            description: "Fast-boiling electric kettle with temperature control.",
            brand: "QuickHeat",
            capacity: "1.7 liters",
            color: "Black"
        },
        {
            id: 9,
            name: "Gaming Keyboard",
            category: "Gaming",
            price: 79.99,
            description: "Mechanical gaming keyboard with RGB lighting.",
            brand: "RGBMaster",
            switch_type: "Cherry MX Blue",
            layout: "Full-size"
        },
        {
            id: 10,
            name: "Fiction Novel",
            category: "Books",
            price: 14.99,
            description: "Engaging fiction novel from a renowned author.",
            author: "Jane Doe",
            pages: 320,
            language: "English"
        },
        {
            id: 11,
            name: "Gaming Headset",
            category: "Gaming",
            price: 99.99,
            description: "Immersive gaming headset with surround sound.",
            brand: "SoundWarrior",
            compatibility: "PC, PS4, Xbox One",
            wireless: true
        },
        {
            id: 12,
            name: "Wireless Headphones",
            category: "Electronics",
            price: 79.99,
            description: "High-quality wireless headphones with noise cancellation.",
            brand: "AudioBliss",
            color: "Silver",
            connectivity: "Bluetooth"
        },
        {
            id: 13,
            name: "Leather Wallet",
            category: "Fashion",
            price: 49.99,
            description: "Handcrafted leather wallet with multiple compartments.",
            color: "Brown",
            material: "Genuine leather"
        },
        {
            id: 14,
            name: "Laptop Pro",
            category: "Electronics",
            price: 1299.99,
            description: "A high-performance laptop for professionals.",
            brand: "TechGenius",
            screen_size: "15.6 inches",
            ram: "16GB",
            storage: "512GB SSD"
        },
        {
            id: 15,
            name: "Essential Oil Diffuser",
            category: "Home & Kitchen",
            price: 34.99,
            description: "Aromatherapy diffuser for creating a relaxing atmosphere.",
            brand: "ZenLiving",
            color: "Wood Grain",
            capacity: "300ml"
        }
    ]
;

module.exports = [
    {
        id: 'products',
        url: '/api/products',
        method: 'GET',
        variants: [
            {
                id: 'ok',
                type: 'json',
                options: {
                    status: 200,
                    body: products,
                }
            },
            {
                id: 'no-results',
                type: 'json',
                options: {
                    status: 200,
                    body: []
                }
            },
            {
                id: 'internal-error',
                type: 'text',
                options: {
                    status: 500,
                    body: ''
                }
            }
        ]
    },
    {
        id: 'product',
        method: 'GET',
        url: '/api/product?:id',
        variants: [
            {
                id: 'ok',
                type: 'json',
                options: {
                    status: 200,
                    body: products[0]
                }
            }
        ]
    },
    {
        id: 'search',
        url: '/api/search?:query',
        method: 'GET',
        variants: [
            {
                id: 'ok',
                type: 'json',
                options: {
                    status: 200,
                    body: products,
                }
            },
            {
                id: 'no-results',
                type: 'json',
                options: {
                    status: 200,
                    body: []
                }
            },
            {
                id: 'internal-error',
                type: 'text',
                options: {
                    status: 500,
                    body: ''
                }
            }
        ]
    }
];
