export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export const menuItems: MenuItem[] = [
  // Meals
  {
    id: '1',
    name: 'Fusion Burger Deluxe',
    description: 'Premium beef patty with fusion spices, cheese, and our signature sauce',
    price: 14.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meals',
    rating: 4.8,
    reviews: 142,
    isSpicy: true
  },
  {
    id: '2',
    name: 'Asian Fusion Bowl',
    description: 'Fresh vegetables, rice, and your choice of protein with teriyaki glaze',
    price: 12.99,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meals',
    rating: 4.6,
    reviews: 89,
    isVegetarian: true
  },
  {
    id: '3',
    name: 'Spicy Fusion Pasta',
    description: 'Creamy pasta with fusion spices and grilled chicken',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meals',
    rating: 4.7,
    reviews: 76,
    isSpicy: true
  },
  {
    id: '4',
    name: 'Mediterranean Wrap',
    description: 'Fresh vegetables, hummus, and grilled halloumi in a soft tortilla',
    price: 11.99,
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meals',
    rating: 4.5,
    reviews: 93,
    isVegetarian: true
  },
  
  // Snacks
  {
    id: '5',
    name: 'Fusion Spring Rolls',
    description: 'Crispy rolls filled with fresh vegetables and served with sweet chili sauce',
    price: 7.99,
    image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Snacks',
    rating: 4.4,
    reviews: 67,
    isVegetarian: true
  },
  {
    id: '6',
    name: 'Loaded Nachos',
    description: 'Crispy tortilla chips with cheese, jalapeños, and fusion spices',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Snacks',
    rating: 4.3,
    reviews: 54,
    isSpicy: true
  },
  {
    id: '7',
    name: 'Fusion Wings',
    description: 'Crispy chicken wings with our signature fusion glaze',
    price: 10.99,
    image: 'https://images.pexels.com/photos/2255801/pexels-photo-2255801.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Snacks',
    rating: 4.6,
    reviews: 128,
    isSpicy: true
  },
  
  // Desserts
  {
    id: '8',
    name: 'Fusion Cheesecake',
    description: 'Creamy cheesecake with exotic fruit topping',
    price: 6.99,
    image: 'https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts',
    rating: 4.8,
    reviews: 95,
    isVegetarian: true
  },
  {
    id: '9',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    price: 7.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts',
    rating: 4.9,
    reviews: 156,
    isVegetarian: true
  },
  
  // Drinks
  {
    id: '10',
    name: 'Fusion Smoothie',
    description: 'Tropical fruit blend with coconut and lime',
    price: 4.99,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Drinks',
    rating: 4.5,
    reviews: 73,
    isVegetarian: true
  },
  {
    id: '11',
    name: 'Iced Coffee Fusion',
    description: 'Cold brew coffee with fusion spices and cream',
    price: 3.99,
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Drinks',
    rating: 4.4,
    reviews: 89,
    isVegetarian: true
  },
  {
    id: '12',
    name: 'Fresh Lemonade',
    description: 'Refreshing lemonade with mint and ginger',
    price: 2.99,
    image: 'https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Drinks',
    rating: 4.2,
    reviews: 45,
    isVegetarian: true
  }
];

export const categories = ['All', 'Meals', 'Snacks', 'Desserts', 'Drinks'];