// Seed data — the 20 default sari-sari store products.
// Matches the original server/schema.sql INSERT statements.
// Used by App.jsx when running in Demo Mode (VITE_USE_MOCK_API=true).

const seedItems = [
  { id: 1,  name: 'Piattos Cheese',       category: 'Snacks',        price: 22.00, current_stock: 18, min_threshold: 5  },
  { id: 2,  name: 'Boy Bawang Garlic',     category: 'Snacks',        price: 15.00, current_stock: 25, min_threshold: 5  },
  { id: 3,  name: 'Oishi Prawn Crackers',  category: 'Snacks',        price: 12.00, current_stock: 30, min_threshold: 5  },
  { id: 4,  name: 'Chippy Barbecue',       category: 'Snacks',        price: 10.00, current_stock: 3,  min_threshold: 5  },
  { id: 5,  name: 'Argentina Corned Beef',  category: 'Canned Goods',  price: 42.00, current_stock: 12, min_threshold: 5  },
  { id: 6,  name: 'Century Tuna Flakes',   category: 'Canned Goods',  price: 38.00, current_stock: 8,  min_threshold: 5  },
  { id: 7,  name: 'Ligo Sardines',         category: 'Canned Goods',  price: 18.00, current_stock: 20, min_threshold: 5  },
  { id: 8,  name: 'San Mig Light 330ml',   category: 'Beverages',     price: 45.00, current_stock: 24, min_threshold: 10 },
  { id: 9,  name: 'Coke Mismo',            category: 'Beverages',     price: 15.00, current_stock: 36, min_threshold: 10 },
  { id: 10, name: 'RC Cola 250ml',         category: 'Beverages',     price: 12.00, current_stock: 2,  min_threshold: 10 },
  { id: 11, name: 'Kopiko Brown 25g',      category: 'Beverages',     price:  7.00, current_stock: 40, min_threshold: 10 },
  { id: 12, name: 'Lucky Me Pancit Canton', category: 'Noodles',       price: 14.00, current_stock: 48, min_threshold: 10 },
  { id: 13, name: 'Nissin Cup Noodles',    category: 'Noodles',       price: 28.00, current_stock: 15, min_threshold: 5  },
  { id: 14, name: 'Payless Mami',          category: 'Noodles',       price:  8.00, current_stock: 4,  min_threshold: 10 },
  { id: 15, name: 'Alaska Evap 140ml',     category: 'Dairy',         price: 22.00, current_stock: 14, min_threshold: 5  },
  { id: 16, name: 'Bear Brand 33g',        category: 'Dairy',         price: 12.00, current_stock: 50, min_threshold: 10 },
  { id: 17, name: 'Safeguard Ivory 60g',   category: 'Personal Care', price: 28.00, current_stock: 10, min_threshold: 3  },
  { id: 18, name: 'Colgate Fresh Cool 22ml', category: 'Personal Care', price: 12.00, current_stock: 1, min_threshold: 5 },
  { id: 19, name: 'Joy Lemon 22ml',        category: 'Household',     price:  8.00, current_stock: 18, min_threshold: 5  },
  { id: 20, name: 'Surf Powder 55g',       category: 'Household',     price: 10.00, current_stock: 22, min_threshold: 5  },
];

export default seedItems;
