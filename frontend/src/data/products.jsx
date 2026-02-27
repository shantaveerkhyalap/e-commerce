export const CATEGORIES = [
    { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
    { id: 'footwear', name: 'Footwear', icon: 'Footprints' },
    { id: 'audio', name: 'Audio', icon: 'Headphones' },
    { id: 'watches', name: 'Watches', icon: 'Watch' },
    { id: 'food', name: 'Food & Nutrition', icon: 'Apple' },
    { id: 'toys', name: 'Toys & Games', icon: 'Gamepad2' },
    { id: 'fitness', name: 'Fitness', icon: 'Dumbbell' },
    { id: 'accessories', name: 'Accessories', icon: 'Glasses' },
    { id: 'kids', name: 'Kids', icon: 'Baby' },
    { id: 'home', name: 'Home & Living', icon: 'Home' },
    { id: 'books', name: 'Books', icon: 'Book' },
    { id: 'beauty', name: 'Beauty', icon: 'Sparkles' }
];

export const PRODUCTS = [
    // Fashion
    { _id: 'f1', name: 'Slim Fit Denim Jeans', price: 1999, discount: 400, category: 'fashion', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80', desc: 'Classic slim-fit denim jeans with stretch comfort. Perfect for casual and semi-formal occasions.' },
    { _id: 'f2', name: 'Casual Linen Shirt', price: 1499, discount: 200, category: 'fashion', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80', desc: 'Breathable linen shirt ideal for summer. Available in multiple colors.' },
    { _id: 'f3', name: 'Graphic Print T-Shirt', price: 799, discount: 100, category: 'fashion', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&q=80', desc: 'Trendy oversized graphic tee with premium cotton blend.' },
    { _id: 'f4', name: 'Cotton Chino Pants', price: 1799, discount: 300, category: 'fashion', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80', desc: 'Premium cotton chinos with a comfortable tapered fit.' },
    { _id: 'f5', name: 'Winter Puffer Jacket', price: 3499, discount: 500, category: 'fashion', image: 'https://images.unsplash.com/photo-1544923246-77307dd270b5?w=400&q=80', desc: 'Insulated puffer jacket for cold weather. Water-resistant outer shell.' },
    { _id: 'f6', name: 'Formal Blazer', price: 4999, discount: 700, category: 'fashion', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80', desc: 'Tailored fit formal blazer. Ideal for business and special occasions.' },
    { _id: 'f7', name: 'Hoodie Sweatshirt', price: 1299, discount: 200, category: 'fashion', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&q=80', desc: 'Cozy fleece-lined hoodie. Perfect for layering and streetwear looks.' },
    { _id: 'f8', name: 'Silk Saree with Embroidery', price: 4500, discount: 500, category: 'fashion', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80', desc: 'Elegant traditional silk saree with intricate gold embroidery.' },
    { _id: 'f9', name: 'Men\'s Kurta Pajama', price: 2499, discount: 300, category: 'fashion', image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=400&q=80', desc: 'Classic cotton kurta set for festive occasions.' },

    // Electronics
    { _id: 'e1', name: 'MacBook Air M3', price: 99999, discount: 10000, category: 'electronics', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400&q=80', desc: 'Apple MacBook Air with M3 chip. 15-hour battery life.' },
    { _id: 'e2', name: 'iPad Pro 12.9"', price: 89999, discount: 5000, category: 'electronics', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', desc: 'Liquid Retina XDR display. M2 chip for pro performance.' },
    { _id: 'e3', name: 'MacBook Pro 16" MAX', price: 249999, discount: 15000, category: 'electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', desc: 'Full 16-inch laptop screen. Unmatched pro performance M3 Max.' },
    { _id: 'e4', name: 'Mechanical Keyboard RGB', price: 4999, discount: 800, category: 'electronics', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', desc: 'Hot-swappable mechanical keyboard with per-key RGB lighting.' },
    { _id: 'e5', name: 'Wireless Gaming Mouse', price: 2999, discount: 500, category: 'electronics', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80', desc: 'High-precision wireless gaming mouse with 25K DPI sensor.' },
    { _id: 'e6', name: '4K Monitor 27"', price: 24999, discount: 3000, category: 'electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80', desc: '4K UHD IPS monitor with USB-C connectivity and HDR400.' },
    { _id: 'e9', name: 'iPhone 15 Pro Max', price: 149900, discount: 5000, category: 'electronics', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=400&q=80', desc: 'Titanium design, A17 Pro chip, 5x Telephoto camera.' },
    { _id: 'e10', name: 'Gaming Desktop PC', price: 125000, discount: 8000, category: 'electronics', image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80', desc: 'High-end gaming PC with RTX 4070, i9 processor.' },

    // Footwear
    { _id: 's1', name: 'Nike Air Max 270', price: 12999, discount: 2000, category: 'footwear', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&q=80', desc: 'Iconic Air Max with 270-degree visible air unit.' },
    { _id: 's2', name: 'Adidas Ultraboost', price: 14999, discount: 3000, category: 'footwear', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&q=80', desc: 'Energy-returning Boost midsole. Primeknit upper for comfort.' },
    { _id: 's3', name: 'Retro Jordan 1', price: 16999, discount: 2000, category: 'footwear', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80', desc: 'Timeless Jordan 1 silhouette. Premium leather construction.' },
    { _id: 's6', name: 'Casual Leather Loafers', price: 3499, discount: 500, category: 'footwear', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80', desc: 'Classy handcrafted leather loafers for men.' },
    { _id: 's7', name: 'Stiletto Heels', price: 2999, discount: 400, category: 'footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80', desc: 'Elegant high heel stilettos for parties and events.' },

    // Audio
    { _id: 'a1', name: 'Sony WH-1000XM5', price: 24999, discount: 5000, category: 'audio', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80', desc: 'Industry-leading noise cancellation. 30-hour battery life.' },
    { _id: 'a2', name: 'AirPods Pro 2', price: 24900, discount: 2000, category: 'audio', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80', desc: 'Active noise cancellation with adaptive transparency mode.' },
    { _id: 'a3', name: 'JBL Bluetooth Speaker', price: 6999, discount: 1500, category: 'audio', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', desc: 'Portable waterproof speaker with 20-hour battery.' },
    { _id: 'a6', name: 'Bose SoundLink III', price: 18500, discount: 2000, category: 'audio', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80', desc: 'Premium portable speaker with deep, rich sound.' },

    // Watches
    { _id: 'w1', name: 'Apple Watch Ultra 2', price: 79999, discount: 5000, category: 'watches', image: 'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&q=80', desc: 'Titanium case. GPS + Cellular. Designed for extreme conditions.' },
    { _id: 'w2', name: 'Casio G-Shock', price: 8999, discount: 1000, category: 'watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80', desc: 'Shock-resistant digital watch with 200m water resistance.' },
    { _id: 'w4', name: 'Rolex Submariner Style', price: 15000, discount: 2000, category: 'watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80', desc: 'Classic diver watch design with automatic movement.' },

    // Food & Nutrition
    { _id: 'fd7', name: 'Pure Cow Ghee 1L', price: 699, discount: 100, category: 'food', image: 'https://images.unsplash.com/photo-1631515243349-e1cb754a1892?w=400&q=80', desc: '100% pure and traditional cow ghee. Rich in nutrients.' },
    { _id: 'fd8', name: 'Fresh Farm Curd 500g', price: 80, discount: 10, category: 'food', image: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=400&q=80', desc: 'Thick, fresh, and creamy farm curd. Natural probiotic.' },
    { _id: 'fd9', name: 'Almonds Premium 500g', price: 499, discount: 50, category: 'food', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400&q=80', desc: 'High-quality crunchy California almonds.' },
    { _id: 'fd10', name: 'Himalayan Pink Salt 1kg', price: 149, discount: 20, category: 'food', image: 'https://images.unsplash.com/photo-1605796248670-349079acc944?w=400&q=80', desc: 'Mineral-rich 100% natural Himalayan pink salt.' },

    // Toys & Games
    { _id: 't1', name: 'LEGO Technic Race Car', price: 4999, discount: 800, category: 'toys', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=400&q=80', desc: '1,580 piece building set with working suspension.' },
    { _id: 't2', name: 'RC Drone with 4K Camera', price: 12999, discount: 2000, category: 'toys', image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&q=80', desc: '4K camera drone with GPS return and stable gimbal.' },

    // Fitness
    { _id: 'g1', name: 'Yoga Mat Premium', price: 1299, discount: 200, category: 'fitness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&q=80', desc: 'Non-slip 6mm thick yoga mat with carrying strap.' },
    { _id: 'g5', name: 'Dumbbell Set 10kg', price: 2999, discount: 500, category: 'fitness', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80', desc: 'Pair of 5kg vinyl coated dumbbells for home workout.' },

    // Accessories
    { _id: 'ac1', name: 'Leather Bifold Wallet', price: 1499, discount: 200, category: 'accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80', desc: 'Genuine leather wallet with RFID blocking technology.' },
    { _id: 'ac8', name: 'Aviator Sunglasses', price: 3499, discount: 500, category: 'accessories', image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&q=80', desc: 'Ray-Ban style polarized aviator sunglasses.' },

    // Kids
    { _id: 'k1', name: 'Kids Drawing Tablet', price: 2499, discount: 500, category: 'kids', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&q=80', desc: 'LCD drawing tablet for kids. No paper, no mess.' },
    { _id: 'k4', name: 'Baby Cotton Onesie Set', price: 1299, discount: 200, category: 'kids', image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&q=80', desc: 'Soft 100% organic cotton onesies for babies.' },

    // Home & Living
    { _id: 'h1', name: 'Scented Candle Set', price: 799, discount: 100, category: 'home', image: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&q=80', desc: 'Set of 3 soy wax candles with aromatherapy scents.' },
    { _id: 'h5', name: 'King Size Bedset', price: 5499, discount: 800, category: 'home', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80', desc: 'Premium cotton bedsheet with 2 pillow covers.' },

    // Books
    { _id: 'b1', name: 'Atomic Habits', price: 450, discount: 50, category: 'books', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80', desc: 'By James Clear. Build good habits and break bad ones.' },
    { _id: 'b4', name: 'Rich Dad Poor Dad', price: 399, discount: 50, category: 'books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', desc: 'By Robert Kiyosaki. Personal finance classic.' },

    // Beauty
    { _id: 'be4', name: 'Men\'s Beard Trimmer Pro', price: 1899, discount: 400, category: 'beauty', image: 'https://images.unsplash.com/photo-1503460293346-a4a369229923?w=400&q=80', desc: 'Precision beard and hair trimmer with adjustable length.' },
    { _id: 'be10', name: 'Matte Liquid Lipstick', price: 899, discount: 100, category: 'beauty', image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=400&q=80', desc: 'Long-lasting smudge-proof matte liquid lipstick.' }
];
