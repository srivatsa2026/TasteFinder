// import { useEffect, useState } from "react";
// import { useAuthenticator } from '@aws-amplify/ui-react';


// type Category =
//   | 'Fine Dining'
//   | 'Casual Dining'
//   | 'Fast Food'
//   | 'Cafe'
//   | 'Bistro'
//   | 'Food Truck'
//   | 'Buffet'
//   | 'Pub'
//   | 'Bakery'
//   | 'Quick Bites';

// type Cuisine =
//   | 'Italian'
//   | 'Chinese'
//   | 'Japanese'
//   | 'Indian'
//   | 'Mexican'
//   | 'Thai'
//   | 'American'
//   | 'Mediterranean'
//   | 'French'
//   | 'Greek'
//   | 'Karnataka'
//   | 'Andhra'
//   | 'North Indian'
//   | 'South Indian'
//   | 'Continental';

// type PriceRange = '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';

// interface Location {
//   lat: number;
//   lng: number;
// }

// interface Restaurant {
//   id: string;
//   name: string;
//   cuisine: string;
//   category: Category;
//   priceRange: PriceRange;
//   location: Location;
//   rating: number;
//   aestheticRating: number;
//   tasteRating: number;
//   image: string;
//   address: string;
//   openingHours: string;
//   contactNumber: string;
//   description: string;
//   features: string[];
//   area: string;
// }

// interface FilterOptions {
//   selectedCategory: Category | null;
//   selectedCuisine: Cuisine | null;
//   priceRange: PriceRange[];
//   maxDistance: number;
//   minAestheticRating: number;
//   minTasteRating: number;
//   searchQuery: string;
//   currentLocation: Location | null;
//   selectedArea: string | null;
// }

// // Bangalore areas with approximate coordinates
// const BANGALORE_AREAS = [
//   { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
//   { name: 'Koramangala', lat: 12.9279, lng: 77.6271 },
//   { name: 'MG Road', lat: 12.9754, lng: 77.6048 },
//   { name: 'Whitefield', lat: 12.9698, lng: 77.7499 },
//   { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
//   { name: 'HSR Layout', lat: 12.9116, lng: 77.6454 },
//   { name: 'Marathahalli', lat: 12.9592, lng: 77.6974 },
//   { name: 'Bellandur', lat: 12.9255, lng: 77.6768 },
//   { name: 'Brigade Road', lat: 12.9734, lng: 77.6099 },
//   { name: 'Lavelle Road', lat: 12.9663, lng: 77.5946 },
// ];

// // Calculate distance between two coordinates in km (Haversine formula)
// const calculateDistance = (loc1: Location, loc2: Location): number => {
//   const R = 6371; // Earth radius in km
//   const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
//   const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
//   const a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * 
//     Math.sin(dLng/2) * Math.sin(dLng/2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//   return R * c;
// };

// // Bangalore restaurant data
// const restaurants: Restaurant[] = [
//   {
//     id: '1',
//     name: 'Karavalli',
//     cuisine: 'Karnataka',
//     category: 'Fine Dining',
//     priceRange: '₹₹₹₹',
//     location: { lat: 12.9716, lng: 77.5946 },
//     rating: 4.8,
//     aestheticRating: 4.7,
//     tasteRating: 4.9,
//     image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//     address: '66, Residency Road, Bengaluru',
//     openingHours: '12:30 PM - 3:30 PM, 7:00 PM - 11:30 PM',
//     contactNumber: '080 2221 7676',
//     description: 'One of Bangalore\'s most iconic restaurants, serving authentic coastal Karnataka cuisine in a heritage setting.',
//     features: ['Live Music', 'Outdoor Seating', 'Wine Pairing'],
//     area: 'MG Road'
//   },
//   {
//     id: '2',
//     name: 'The Black Pearl',
//     cuisine: 'Continental',
//     category: 'Fine Dining',
//     priceRange: '₹₹₹',
//     location: { lat: 12.9784, lng: 77.6408 },
//     rating: 4.6,
//     aestheticRating: 4.8,
//     tasteRating: 4.5,
//     image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//     address: '100 Feet Road, Indiranagar, Bengaluru',
//     openingHours: '12:00 PM - 11:30 PM',
//     contactNumber: '080 2520 2020',
//     description: 'Sophisticated dining with a nautical theme, offering exquisite European cuisine and an extensive wine list.',
//     features: ['Rooftop', 'Craft Cocktails', 'Chef\'s Table'],
//     area: 'Indiranagar'
//   },
//   {
//   "id": "2",
//   "name": "Udupi Aatithya",
//   "cuisine": "South Indian",
//   "category": "Casual Dining",
//   "priceRange": "₹₹",
//   "location": { "lat": 12.9615, "lng": 77.5735 },
//   "rating": 4.2,
//   "aestheticRating": 4.0,
//   "tasteRating": 4.3,
//   "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
//   "address": "11, 5th Main Rd, near Makkala Koota Park, Chikkanna Garden, Chamrajpet, Bengaluru",
//   "openingHours": "6:30 AM - 10:30 PM",
//   "contactNumber": "+91 8025747474",
//   "description": "A popular spot offering a variety of South Indian dishes in a family-friendly setting.",
//   "features": ["Pure Vegetarian", "Family Friendly", "Quick Service"],
//   "area": "Chamrajpet"
// },{
//   "id": "3",
//   "name": "South Kitchen",
//   "cuisine": "South Indian",
//   "category": "Quick Bites",
//   "priceRange": "₹",
//   "location": { "lat": 12.9398, "lng": 77.5731 },
//   "rating": 4.4,
//   "aestheticRating": 4.2,
//   "tasteRating": 4.5,
//   "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
//   "address": "No.24, 1st Main, NR Colony, Basavanagudi, Bengaluru",
//   "openingHours": "7:00 AM - 10:00 PM",
//   "contactNumber": "+91 9880980009",
//   "description": "Known for its authentic South Indian breakfast items, this eatery is a favorite among locals.",
//   "features": ["Pure Vegetarian", "Breakfast Specials", "No Onion & Garlic"],
//   "area": "Basavanagudi"
// },
//   {
//     id: '3',
//     name: 'Vidyarthi Bhavan',
//     cuisine: 'South Indian',
//     category: 'Quick Bites',
//     priceRange: '₹',
//     location: { lat: 12.9352, lng: 77.5775 },
//     rating: 4.5,
//     aestheticRating: 3.8,
//     tasteRating: 4.9,
//     image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80',
//     address: '32, Gandhi Bazaar, Basavanagudi, Bengaluru',
//     openingHours: '6:30 AM - 11:30 AM, 2:30 PM - 8:30 PM',
//     contactNumber: '080 2667 7588',
//     description: 'Legendary Bangalore institution famous for its crispy dosas and filter coffee since 1943.',
//     features: ['Heritage', 'Vegetarian', 'Quick Service'],
//     area: 'Jayanagar'
//   },
//   {
//     id: '4',
//     name: 'Toit Brewpub',
//     cuisine: 'American',
//     category: 'Pub',
//     priceRange: '₹₹₹',
//     location: { lat: 12.9289, lng: 77.6276 },
//     rating: 4.7,
//     aestheticRating: 4.5,
//     tasteRating: 4.6,
//     image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
//     address: '298, 100 Feet Road, Indiranagar, Bengaluru',
//     openingHours: '12:00 PM - 11:30 PM',
//     contactNumber: '080 4111 4848',
//     description: 'Bangalore\'s favorite brewpub with craft beers and delicious pub grub in a lively atmosphere.',
//     features: ['Microbrewery', 'Live Sports', 'Happy Hours'],
//     area: 'Indiranagar'
//   },
//   {
//     id: '5',
//     name: 'Mavalli Tiffin Room (MTR)',
//     cuisine: 'South Indian',
//     category: 'Casual Dining',
//     priceRange: '₹₹',
//     location: { lat: 12.9619, lng: 77.6028 },
//     rating: 4.4,
//     aestheticRating: 4.0,
//     tasteRating: 4.7,
//     image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80',
//     address: '11, Lalbagh Road, Bengaluru',
//     openingHours: '6:30 AM - 11:00 AM, 12:30 PM - 8:45 PM',
//     contactNumber: '080 2222 0022',
//     description: 'Historic restaurant serving legendary South Indian fare since 1924, known for its rava idli.',
//     features: ['Heritage', 'Vegetarian', 'Traditional'],
//     area: 'Lalbagh'
//   },
//   {
//     id: '6',
//     name: 'Farzi Cafe',
//     cuisine: 'Indian',
//     category: 'Casual Dining',
//     priceRange: '₹₹₹',
//     location: { lat: 12.9358, lng: 77.6255 },
//     rating: 4.5,
//     aestheticRating: 4.7,
//     tasteRating: 4.4,
//     image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//     address: 'UB City, Vittal Mallya Road, Bengaluru',
//     openingHours: '12:00 PM - 12:30 AM',
//     contactNumber: '080 2211 4848',
//     description: 'Modern Indian cuisine with molecular gastronomy twists in a chic, contemporary setting.',
//     features: ['Molecular Gastronomy', 'Cocktails', 'Rooftop'],
//     area: 'UB City'
//   },
//   {
//     id: '7',
//     name: 'Taaza Thindi',
//     cuisine: 'Karnataka',
//     category: 'Quick Bites',
//     priceRange: '₹',
//     location: { lat: 12.9352, lng: 77.5801 },
//     rating: 4.6,
//     aestheticRating: 3.9,
//     tasteRating: 4.8,
//     image: 'https://images.unsplash.com/photo-1632818924360-68d4994cfdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
//     address: '8th Cross, Jayanagar 4th Block, Bengaluru',
//     openingHours: '6:00 AM - 11:00 AM, 4:00 PM - 8:00 PM',
//     contactNumber: '080 2663 1212',
//     description: 'Authentic Bangalore street food experience with fresh, flavorful local snacks at pocket-friendly prices.',
//     features: ['Street Food', 'Vegetarian', 'Quick Service'],
//     area: 'Jayanagar'
//   },
//   {
//     id: '8',
//     name: 'The Permit Room',
//     cuisine: 'Indian',
//     category: 'Bistro',
//     priceRange: '₹₹₹',
//     location: { lat: 12.9789, lng: 77.6397 },
//     rating: 4.5,
//     aestheticRating: 4.6,
//     tasteRating: 4.4,
//     image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
//     address: 'No. 2, 100 Feet Road, Indiranagar, Bengaluru',
//     openingHours: '12:00 PM - 1:00 AM',
//     contactNumber: '080 2521 2929',
//     description: 'Modern take on traditional Bangalore bars with craft cocktails and elevated Indian small plates.',
//     features: ['Craft Cocktails', 'Live Music', 'Happy Hours'],
//     area: 'Indiranagar'
//   }
// ];

// // Utility: filter logic
// const filterRestaurants = (all: Restaurant[], filters: FilterOptions) => {
//   return all.filter((r) => {
//     const matchesLocation = !filters.currentLocation || 
//       (calculateDistance(filters.currentLocation, r.location) <= filters.maxDistance);
    
//     const matchesArea = !filters.selectedArea || 
//       r.area.toLowerCase().includes(filters.selectedArea.toLowerCase());

//     return (
//       (!filters.selectedCategory || r.category === filters.selectedCategory) &&
//       (!filters.selectedCuisine || r.cuisine === filters.selectedCuisine) &&
//       (filters.priceRange.length === 0 || filters.priceRange.includes(r.priceRange)) &&
//       r.aestheticRating >= filters.minAestheticRating &&
//       r.tasteRating >= filters.minTasteRating &&
//       r.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
//       matchesLocation &&
//       matchesArea
//     );
//   });
// };

// const App = () => {

//   const { signOut } = useAuthenticator();

//   const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
//   const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [filters, setFilters] = useState<FilterOptions>({
//     selectedCategory: null,
//     selectedCuisine: null,
//     priceRange: [],
//     maxDistance: 5, // Default to 5km radius
//     minAestheticRating: 1,
//     minTasteRating: 1,
//     searchQuery: '',
//     currentLocation: null,
//     selectedArea: null
//   });
//   const [isLocating, setIsLocating] = useState(false);

//   useEffect(() => {
//     const filtered = filterRestaurants(restaurants, filters);
//     setFilteredRestaurants(filtered);
//   }, [filters]);

//   useEffect(() => {
//     document.documentElement.className = isDarkMode ? 'dark-theme' : 'light-theme';
//   }, [isDarkMode]);

//   const updateFilters = (partial: Partial<FilterOptions>) => {
//     setFilters((prev) => ({ ...prev, ...partial }));
//   };

//   const detectLocation = () => {
//     setIsLocating(true);
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           updateFilters({
//             currentLocation: {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude
//             },
//             selectedArea: null
//           });
//           setIsLocating(false);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           setIsLocating(false);
//           // Default to MG Road if location access is denied
//           updateFilters({
//             currentLocation: BANGALORE_AREAS.find(a => a.name === 'MG Road') || null,
//             selectedArea: 'MG Road'
//           });
//         }
//       );
//     } else {
//       console.log("Geolocation is not supported by this browser.");
//       setIsLocating(false);
//       // Default to MG Road if geolocation not supported
//       updateFilters({
//         currentLocation: BANGALORE_AREAS.find(a => a.name === 'MG Road') || null,
//         selectedArea: 'MG Road'
//       });
//     }
//   };

//   // Detect location on first load
//   useEffect(() => {
//     detectLocation();
//   }, []);

//   return (
//     <div className="app-container">
//       {/* Header */}
//       <header className="app-header">
//         <div className="header-content">
//           <h1 className="app-title">Namma Bengaluru Eats</h1>
//           <div className="search-container">
//             <input
//               type="text"
//               placeholder="Search restaurants..."
//               className="search-input"
//               onChange={(e) => updateFilters({ searchQuery: e.target.value })}
//             />
//             <button 
//               className="theme-toggle"
//               onClick={() => setIsDarkMode((prev) => !prev)}
//             >
//               {isDarkMode ? '☀️ Light' : '🌙 Dark'}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="app-main">
//         <div className="main-content">
//           <div className="hero-section">
//             <h2 className="hero-title">Discover Bangalore's Culinary Treasures</h2>
//             <p className="hero-subtitle">
//               From iconic dosa joints to modern gastropubs, find your perfect meal in India's food capital
//             </p>
//           </div>

//           <div className="location-controls">
//             <div className="location-selector">
//               <label htmlFor="area-select" className="location-label">
//                 Search in Area:
//               </label>
//               <select
//                 id="area-select"
//                 className="area-select"
//                 value={filters.selectedArea || ''}
//                 onChange={(e) => updateFilters({ 
//                   selectedArea: e.target.value || null,
//                   currentLocation: BANGALORE_AREAS.find(a => a.name === e.target.value) || null
//                 })}
//               >
//                 <option value="">All Areas</option>
//                 {BANGALORE_AREAS.map(area => (
//                   <option key={area.name} value={area.name}>{area.name}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="location-action">
//               <button 
//                 onClick={detectLocation}
//                 className="locate-button"
//                 disabled={isLocating}
//               >
//                 {isLocating ? 'Detecting...' : '📍 Use My Current Location'}
//               </button>
//               {filters.currentLocation && (
//                 <span className="location-distance">
//                   {filters.selectedArea 
//                     ? `Showing restaurants in ${filters.selectedArea}`
//                     : `Within ${filters.maxDistance} km of your location`}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="content-grid">
//             {/* Filters */}
//             <aside className="filters-sidebar">
//               <div className="filter-section">
//                 <h3 className="filter-title">Refine Your Search</h3>
                
//                 <div className="filter-group">
//                   <h4 className="filter-group-title">Distance (km)</h4>
//                   <div className="slider-container">
//                     <input
//                       type="range"
//                       min={1}
//                       max={20}
//                       value={filters.maxDistance}
//                       onChange={(e) => updateFilters({ maxDistance: Number(e.target.value) })}
//                       className="distance-slider"
//                     />
//                     <span className="slider-value">{filters.maxDistance} km</span>
//                   </div>
//                 </div>

//                 <div className="filter-group">
//                   <h4 className="filter-group-title">Price Range</h4>
//                   <div className="price-range-options">
//                     {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map((range) => (
//                       <label key={range} className="price-range-label">
//                         <input
//                           type="checkbox"
//                           checked={filters.priceRange.includes(range as PriceRange)}
//                           onChange={() =>
//                             updateFilters({
//                               priceRange: filters.priceRange.includes(range as PriceRange)
//                                 ? filters.priceRange.filter((r) => r !== range)
//                                 : [...filters.priceRange, range as PriceRange],
//                             })
//                           }
//                           className="price-range-input"
//                         />
//                         <span className="price-range-display">{range}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="filter-group">
//                   <h4 className="filter-group-title">Cuisine</h4>
//                   <select
//                     className="cuisine-select"
//                     value={filters.selectedCuisine || ''}
//                     onChange={(e) => updateFilters({ selectedCuisine: e.target.value as Cuisine || null })}
//                   >
//                     <option value="">All Cuisines</option>
//                     <option value="Indian">Indian</option>
//                     <option value="South Indian">South Indian</option>
//                     <option value="Karnataka">Karnataka</option>
//                     <option value="North Indian">North Indian</option>
//                     <option value="Chinese">Chinese</option>
//                     <option value="Continental">Continental</option>
//                     <option value="Italian">Italian</option>
//                     <option value="American">American</option>
//                   </select>
//                 </div>

//                 <div className="filter-group">
//                   <h4 className="filter-group-title">Category</h4>
//                   <select
//                     className="category-select"
//                     value={filters.selectedCategory || ''}
//                     onChange={(e) => updateFilters({ selectedCategory: e.target.value as Category || null })}
//                   >
//                     <option value="">All Categories</option>
//                     <option value="Fine Dining">Fine Dining</option>
//                     <option value="Casual Dining">Casual Dining</option>
//                     <option value="Quick Bites">Quick Bites</option>
//                     <option value="Cafe">Cafe</option>
//                     <option value="Pub">Pub</option>
//                   </select>
//                 </div>

//                 <div className="filter-group">
//                   <h4 className="filter-group-title">Minimum Ratings</h4>
//                   <div className="rating-input-group">
//                     <label className="rating-label">
//                       <span>Aesthetic</span>
//                       <input
//                         type="number"
//                         min={1}
//                         max={5}
//                         step={0.1}
//                         value={filters.minAestheticRating}
//                         onChange={(e) => updateFilters({ minAestheticRating: Number(e.target.value) })}
//                         className="rating-input"
//                       />
//                     </label>
//                     <label className="rating-label">
//                       <span>Taste</span>
//                       <input
//                         type="number"
//                         min={1}
//                         max={5}
//                         step={0.1}
//                         value={filters.minTasteRating}
//                         onChange={(e) => updateFilters({ minTasteRating: Number(e.target.value) })}
//                         className="rating-input"
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </aside>

//             {/* Restaurant Listing */}
//             <section className="restaurant-listing">
//               <div className="listing-header">
//                 <h2 className="listing-title">
//                   {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'} Found
//                   {filters.selectedArea && ` in ${filters.selectedArea}`}
//                   {!filters.selectedArea && filters.currentLocation && ` within ${filters.maxDistance} km`}
//                 </h2>
//               </div>

//               {filteredRestaurants.length > 0 ? (
//                 <div className="restaurant-grid">
//                   {filteredRestaurants.map((restaurant) => {
//                     const distance = filters.currentLocation 
//                       ? calculateDistance(filters.currentLocation, restaurant.location).toFixed(1)
//                       : null;
                    
//                     return (
//                       <div
//                         key={restaurant.id}
//                         className="restaurant-card"
//                         onClick={() => {
//                           setSelectedRestaurant(restaurant);
//                           document.body.style.overflow = 'hidden';
//                         }}
//                       >
//                         <div className="card-image-container">
//                           <img 
//                             src={restaurant.image} 
//                             alt={restaurant.name} 
//                             className="card-image"
//                             loading="lazy"
//                           />
//                           <div className="card-rating">
//                             <span className="rating-star">★</span>
//                             <span>{restaurant.rating.toFixed(1)}</span>
//                           </div>
//                           {distance && (
//                             <div className="card-distance">
//                               {distance} km
//                             </div>
//                           )}
//                           <div className="card-area">
//                             {restaurant.area}
//                           </div>
//                         </div>
//                         <div className="card-content">
//                           <h3 className="card-title">{restaurant.name}</h3>
//                           <div className="card-meta">
//                             <span className="card-cuisine">{restaurant.cuisine}</span>
//                             <span className="card-category">{restaurant.category}</span>
//                             <span className="card-price">{restaurant.priceRange}</span>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               ) : (
//                 <div className="no-results">
//                   <div className="no-results-icon">🍽️</div>
//                   <h3>No restaurants match your criteria</h3>
//                   <p>Try adjusting your filters or search area</p>
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>
//         <button onClick={signOut}>Sign out</button>
//       </main>

//       {/* Footer */}
//       <footer className="app-footer">
//         <p className="footer-text">© {new Date().getFullYear()} Namma Bengaluru Eats — Discover Bangalore's Food Scene</p>
//       </footer>

//       {/* Restaurant Detail Modal */}
//       {selectedRestaurant && (
//         <div className="modal-overlay">
//           <div className="restaurant-modal">
//             <button
//               onClick={() => {
//                 setSelectedRestaurant(null);
//                 document.body.style.overflow = 'auto';
//               }}
//               className="modal-close"
//             >
//               &times;
//             </button>
            
//             <div className="modal-image-container">
//               <img 
//                 src={selectedRestaurant.image} 
//                 alt={selectedRestaurant.name} 
//                 className="modal-image"
//               />
//               <div className="image-overlay">
//                 <h2 className="modal-title">{selectedRestaurant.name}</h2>
//                 <div className="modal-meta">
//                   <span className="modal-rating">
//                     ★ {selectedRestaurant.rating.toFixed(1)}
//                   </span>
//                   <span className="modal-cuisine">
//                     {selectedRestaurant.cuisine} • {selectedRestaurant.category}
//                   </span>
//                   <span className="modal-price">
//                     {selectedRestaurant.priceRange}
//                   </span>
//                   {filters.currentLocation && (
//                     <span className="modal-distance">
//                       {calculateDistance(filters.currentLocation, selectedRestaurant.location).toFixed(1)} km away
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="modal-content">
//               <div className="modal-section">
//                 <h3 className="section-title">About</h3>
//                 <p className="modal-description">{selectedRestaurant.description}</p>
//               </div>
              
//               <div className="modal-details-grid">
//                 <div className="detail-item">
//                   <h4 className="detail-label">Address</h4>
//                   <p className="detail-value">{selectedRestaurant.address}</p>
//                   <p className="detail-area">{selectedRestaurant.area}</p>
//                 </div>
                
//                 <div className="detail-item">
//                   <h4 className="detail-label">Hours</h4>
//                   <p className="detail-value">{selectedRestaurant.openingHours}</p>
//                 </div>
                
//                 <div className="detail-item">
//                   <h4 className="detail-label">Contact</h4>
//                   <p className="detail-value">{selectedRestaurant.contactNumber}</p>
//                 </div>
                
//                 <div className="detail-item">
//                   <h4 className="detail-label">Features</h4>
//                   <div className="features-list">
//                     {selectedRestaurant.features.map((feature, index) => (
//                       <span key={index} className="feature-tag">{feature}</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               <div className="modal-ratings">
//                 <div className="rating-pill">
//                   <span className="rating-label">Aesthetic</span>
//                   <span className="rating-value">{selectedRestaurant.aestheticRating.toFixed(1)}</span>
//                 </div>
//                 <div className="rating-pill">
//                   <span className="rating-label">Taste</span>
//                   <span className="rating-value">{selectedRestaurant.tasteRating.toFixed(1)}</span>
//                 </div>
//                 <div className="rating-pill">
//                   <span className="rating-label">Area</span>
//                   <span className="rating-value">{selectedRestaurant.area}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';

const client = generateClient<Schema>();

type Category =
  | 'Fine Dining'
  | 'Casual Dining'
  | 'Fast Food'
  | 'Cafe'
  | 'Bistro'
  | 'Food Truck'
  | 'Buffet'
  | 'Pub'
  | 'Bakery'
  | 'Quick Bites';

type Cuisine =
  | 'Italian'
  | 'Chinese'
  | 'Japanese'
  | 'Indian'
  | 'Mexican'
  | 'Thai'
  | 'American'
  | 'Mediterranean'
  | 'French'
  | 'Greek'
  | 'Karnataka'
  | 'Andhra'
  | 'North Indian'
  | 'South Indian'
  | 'Continental';

type PriceRange = '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';

interface Location {
  lat: number;
  lng: number;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  category: Category;
  priceRange: PriceRange;
  location: Location;
  rating: number;
  aestheticRating: number;
  tasteRating: number;
  image: string;
  address: string;
  openingHours: string;
  contactNumber: string;
  description: string;
  features: string[];
  area: string;
  isOpen?: boolean;
}

interface FilterOptions {
  selectedCategory: Category | null;
  selectedCuisine: Cuisine | null;
  priceRange: PriceRange[];
  maxDistance: number;
  minAestheticRating: number;
  minTasteRating: number;
  searchQuery: string;
  currentLocation: Location | null;
  selectedArea: string | null;
  onlyOpenNow: boolean;
}

interface UserLocation {
  lat: number;
  lng: number;
  address?: string;
  loading: boolean;
  error?: string;
}

interface BookingDetails {
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
  specialRequests: string;
}

// Bangalore areas with approximate coordinates
const BANGALORE_AREAS = [
  { name: 'Indiranagar', lat: 12.9784, lng: 77.6408 },
  { name: 'Koramangala', lat: 12.9279, lng: 77.6271 },
  { name: 'MG Road', lat: 12.9754, lng: 77.6048 },
  { name: 'Whitefield', lat: 12.9698, lng: 77.7499 },
  { name: 'Jayanagar', lat: 12.9308, lng: 77.5838 },
  { name: 'HSR Layout', lat: 12.9116, lng: 77.6454 },
  { name: 'Marathahalli', lat: 12.9592, lng: 77.6974 },
  { name: 'Bellandur', lat: 12.9255, lng: 77.6768 },
  { name: 'Brigade Road', lat: 12.9734, lng: 77.6099 },
  { name: 'Lavelle Road', lat: 12.9663, lng: 77.5946 },
];

// Calculate distance between two coordinates in km (Haversine formula)
const calculateDistance = (loc1: Location, loc2: Location): number => {
  const R = 6371; // Earth radius in km
  const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
  const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Check if restaurant is currently open
const checkIfOpen = (openingHours: string): boolean => {
  if (!openingHours) return false;
  
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const periods = openingHours.split(', ');
    for (const period of periods) {
      const [startStr, , endStr] = period.split(' ');
      const [startHour, startMinute] = startStr.split(':').map(Number);
      const [endHour, endMinute] = endStr.split(':').map(Number);
      
      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;
      
      if (currentTime >= startTime && currentTime <= endTime) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error parsing opening hours:", error);
    return false;
  }
};

// Enhanced Bangalore restaurant data
const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Karavalli',
    cuisine: 'Karnataka',
    category: 'Fine Dining',
    priceRange: '₹₹₹₹',
    location: { lat: 12.9716, lng: 77.5946 },
    rating: 4.8,
    aestheticRating: 4.7,
    tasteRating: 4.9,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '66, Residency Road, Bengaluru',
    openingHours: '12:30-14:30, 19:00-23:30',
    contactNumber: '080 2221 7676',
    description: 'One of Bangalore\'s most iconic restaurants, serving authentic coastal Karnataka cuisine in a heritage setting.',
    features: ['Live Music', 'Outdoor Seating', 'Wine Pairing'],
    area: 'MG Road'
  },
  {
    id: '2',
    name: 'The Black Pearl',
    cuisine: 'Continental',
    category: 'Fine Dining',
    priceRange: '₹₹₹',
    location: { lat: 12.9784, lng: 77.6408 },
    rating: 4.6,
    aestheticRating: 4.8,
    tasteRating: 4.5,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: '100 Feet Road, Indiranagar, Bengaluru',
    openingHours: '12:00 PM - 11:30 PM',
    contactNumber: '080 2520 2020',
    description: 'Sophisticated dining with a nautical theme, offering exquisite European cuisine and an extensive wine list.',
    features: ['Rooftop', 'Craft Cocktails', 'Chef\'s Table'],
    area: 'Indiranagar'
  },
  {
  "id": "3",
  "name": "Udupi Aatithya",
  "cuisine": "South Indian",
  "category": "Casual Dining",
  "priceRange": "₹₹",
  "location": { "lat": 12.9615, "lng": 77.5735 },
  "rating": 4.2,
  "aestheticRating": 4.0,
  "tasteRating": 4.3,
  "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
  "address": "11, 5th Main Rd, near Makkala Koota Park, Chikkanna Garden, Chamrajpet, Bengaluru",
  "openingHours": "6:30 AM - 10:30 PM",
  "contactNumber": "+91 8025747474",
  "description": "A popular spot offering a variety of South Indian dishes in a family-friendly setting.",
  "features": ["Pure Vegetarian", "Family Friendly", "Quick Service"],
  "area": "Chamrajpet"
},{
  "id": "4",
  "name": "South Kitchen",
  "cuisine": "South Indian",
  "category": "Quick Bites",
  "priceRange": "₹",
  "location": { "lat": 12.9398, "lng": 77.5731 },
  "rating": 4.4,
  "aestheticRating": 4.2,
  "tasteRating": 4.5,
  "image": "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1470&q=80",
  "address": "No.24, 1st Main, NR Colony, Basavanagudi, Bengaluru",
  "openingHours": "7:00 AM - 10:00 PM",
  "contactNumber": "+91 9880980009",
  "description": "Known for its authentic South Indian breakfast items, this eatery is a favorite among locals.",
  "features": ["Pure Vegetarian", "Breakfast Specials", "No Onion & Garlic"],
  "area": "Basavanagudi"
},
  {
    id: '5',
    name: 'Vidyarthi Bhavan',
    cuisine: 'South Indian',
    category: 'Quick Bites',
    priceRange: '₹',
    location: { lat: 12.9352, lng: 77.5775 },
    rating: 4.5,
    aestheticRating: 3.8,
    tasteRating: 4.9,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80',
    address: '32, Gandhi Bazaar, Basavanagudi, Bengaluru',
    openingHours: '6:30 AM - 11:30 AM, 2:30 PM - 8:30 PM',
    contactNumber: '080 2667 7588',
    description: 'Legendary Bangalore institution famous for its crispy dosas and filter coffee since 1943.',
    features: ['Heritage', 'Vegetarian', 'Quick Service'],
    area: 'Jayanagar'
  },
  {
    id: '6',
    name: 'Toit Brewpub',
    cuisine: 'American',
    category: 'Pub',
    priceRange: '₹₹₹',
    location: { lat: 12.9289, lng: 77.6276 },
    rating: 4.7,
    aestheticRating: 4.5,
    tasteRating: 4.6,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
    address: '298, 100 Feet Road, Indiranagar, Bengaluru',
    openingHours: '12:00 PM - 11:30 PM',
    contactNumber: '080 4111 4848',
    description: 'Bangalore\'s favorite brewpub with craft beers and delicious pub grub in a lively atmosphere.',
    features: ['Microbrewery', 'Live Sports', 'Happy Hours'],
    area: 'Indiranagar'
  },
  {
    id: '7',
    name: 'Mavalli Tiffin Room (MTR)',
    cuisine: 'South Indian',
    category: 'Casual Dining',
    priceRange: '₹₹',
    location: { lat: 12.9619, lng: 77.6028 },
    rating: 4.4,
    aestheticRating: 4.0,
    tasteRating: 4.7,
    image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1588&q=80',
    address: '11, Lalbagh Road, Bengaluru',
    openingHours: '6:30 AM - 11:00 AM, 12:30 PM - 8:45 PM',
    contactNumber: '080 2222 0022',
    description: 'Historic restaurant serving legendary South Indian fare since 1924, known for its rava idli.',
    features: ['Heritage', 'Vegetarian', 'Traditional'],
    area: 'Lalbagh'
  },
  {
    id: '8',
    name: 'Farzi Cafe',
    cuisine: 'Indian',
    category: 'Casual Dining',
    priceRange: '₹₹₹',
    location: { lat: 12.9358, lng: 77.6255 },
    rating: 4.5,
    aestheticRating: 4.7,
    tasteRating: 4.4,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: 'UB City, Vittal Mallya Road, Bengaluru',
    openingHours: '12:00 PM - 12:30 AM',
    contactNumber: '080 2211 4848',
    description: 'Modern Indian cuisine with molecular gastronomy twists in a chic, contemporary setting.',
    features: ['Molecular Gastronomy', 'Cocktails', 'Rooftop'],
    area: 'UB City'
  },
  {
    id: '9',
    name: 'Taaza Thindi',
    cuisine: 'Karnataka',
    category: 'Quick Bites',
    priceRange: '₹',
    location: { lat: 12.9352, lng: 77.5801 },
    rating: 4.6,
    aestheticRating: 3.9,
    tasteRating: 4.8,
    image: 'https://images.unsplash.com/photo-1632818924360-68d4994cfdb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80',
    address: '8th Cross, Jayanagar 4th Block, Bengaluru',
    openingHours: '6:00 AM - 11:00 AM, 4:00 PM - 8:00 PM',
    contactNumber: '080 2663 1212',
    description: 'Authentic Bangalore street food experience with fresh, flavorful local snacks at pocket-friendly prices.',
    features: ['Street Food', 'Vegetarian', 'Quick Service'],
    area: 'Jayanagar'
  },
  {
    id: '10',
    name: 'The Permit Room',
    cuisine: 'Indian',
    category: 'Bistro',
    priceRange: '₹₹₹',
    location: { lat: 12.9789, lng: 77.6397 },
    rating: 4.5,
    aestheticRating: 4.6,
    tasteRating: 4.4,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: 'No. 2, 100 Feet Road, Indiranagar, Bengaluru',
    openingHours: '12:00 PM - 1:00 AM',
    contactNumber: '080 2521 2929',
    description: 'Modern take on traditional Bangalore bars with craft cocktails and elevated Indian small plates.',
    features: ['Craft Cocktails', 'Live Music', 'Happy Hours'],
    area: 'Indiranagar'
  }
];

const App = () => {
  const { signOut, user } = useAuthenticator();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 0,
    lng: 0,
    loading: false,
  });
  const [filters, setFilters] = useState<FilterOptions>({
    selectedCategory: null,
    selectedCuisine: null,
    priceRange: [],
    maxDistance: 5,
    minAestheticRating: 1,
    minTasteRating: 1,
    searchQuery: '',
    currentLocation: null,
    selectedArea: null,
    onlyOpenNow: false
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Memoized filtered restaurants
  const getFilteredRestaurants = useCallback((all: Restaurant[], filters: FilterOptions) => {
    return all.filter((r) => {
      const matchesLocation = !filters.currentLocation || 
        (calculateDistance(filters.currentLocation, r.location) <= filters.maxDistance);
      
      const matchesArea = !filters.selectedArea || 
        r.area.toLowerCase().includes(filters.selectedArea.toLowerCase());

      const matchesOpenNow = !filters.onlyOpenNow || r.isOpen;

      return (
        (!filters.selectedCategory || r.category === filters.selectedCategory) &&
        (!filters.selectedCuisine || r.cuisine === filters.selectedCuisine) &&
        (filters.priceRange.length === 0 || filters.priceRange.includes(r.priceRange)) &&
        r.aestheticRating >= filters.minAestheticRating &&
        r.tasteRating >= filters.minTasteRating &&
        r.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        matchesLocation &&
        matchesArea &&
        matchesOpenNow
      );
    });
  }, []);

  // Update isOpen status for restaurants
  const updateRestaurantsOpenStatus = useCallback((restaurants: Restaurant[]) => {
    return restaurants.map(r => ({
      ...r,
      isOpen: checkIfOpen(r.openingHours)
    }));
  }, []);

  // Load favorites from backend
  // const loadFavorites = useCallback(async () => {
  //   if (!user?.userId) return;
    
  //   try {
  //     const { data } = await client.models.Favorite.list({
  //       filter: { userId: { eq: user.userId } }
  //     });
  //     setFavorites(data.map(f => f.restaurantId));
  //   } catch (error) {
  //     console.error("Error loading favorites:", error);
  //   }
  // }, [user?.userId]);

//   const loadFavorites = useCallback(async () => {
//   if (!user?.userId) return;
  
//   try {
//     const { data } = await client.models.Favorite.list({
//       filter: { userId: { eq: user.userId } }
//     });
//     // Ensure we only store valid restaurant IDs that exist in our data
//     const validFavorites = data
//       .map(f => f.restaurantId)
//       .filter(id => restaurants.some(r => r.id === id));
//     setFavorites(validFavorites);
//   } catch (error) {
//     console.error("Error loading favorites:", error);
//     // Optionally show error to user
//   }
// }, [user?.userId]);

  // Toggle favorite
  // const toggleFavorite = useCallback(async (restaurantId: string) => {
  //   if (!user?.userId) return;
    
  //   try {
  //     if (favorites.includes(restaurantId)) {
  //       // Remove favorite
  //       const toRemove = await client.models.Favorite.list({
  //         filter: {
  //           userId: { eq: user.userId },
  //           restaurantId: { eq: restaurantId }
  //         }
  //       });
  //       if (toRemove.data.length > 0) {
  //         await client.models.Favorite.delete({ id: toRemove.data[0].id });
  //       }
  //       setFavorites(prev => prev.filter(id => id !== restaurantId));
  //     } else {
  //       // Add favorite
  //       await client.models.Favorite.create({
  //         userId: user.userId,
  //         restaurantId
  //       });
  //       setFavorites(prev => [...prev, restaurantId]);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling favorite:", error);
  //   }
  // }, [favorites, user?.userId]);



  const toggleFavorite = useCallback(async (restaurantId: string) => {
  if (!user?.userId) {
    alert('Please sign in to save favorites');
    return;
  }
  
  try {
    setFavorites(prev => {
      // Optimistic UI update
      if (prev.includes(restaurantId)) {
        return prev.filter(id => id !== restaurantId);
      } else {
        return [...prev, restaurantId];
      }
    });

    if (favorites.includes(restaurantId)) {
      // Remove favorite
      const { data: existingFavorites } = await client.models.Favorite.list({
        filter: {
          userId: { eq: user.userId },
          restaurantId: { eq: restaurantId }
        }
      });
      
      if (existingFavorites.length > 0) {
        await client.models.Favorite.delete({ id: existingFavorites[0].id });
      }
    } else {
      // Add favorite
      await client.models.Favorite.create({
        userId: user.userId,
        restaurantId
      });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    // Revert optimistic update on error
    setFavorites(prev => {
      if (prev.includes(restaurantId)) {
        return [...prev];
      } else {
        return prev.filter(id => id !== restaurantId);
      }
    });
    alert('Failed to update favorite. Please try again.');
  }
}, [favorites, user?.userId]);

// 3. Add loading state for favorites
const [favoritesLoading, setFavoritesLoading] = useState(false);

// Then update the loadFavorites to use it:
const loadFavorites = useCallback(async () => {
  if (!user?.userId) return;
  
  try {
    setFavoritesLoading(true);
    const { data } = await client.models.Favorite.list({
      filter: { userId: { eq: user.userId } }
    });
    const validFavorites = data
      .map(f => f.restaurantId)
      .filter((id): id is string => typeof id === 'string' && restaurants.some(r => r.id === id));
    setFavorites(validFavorites);
  } catch (error) {
    console.error("Error loading favorites:", error);
  } finally {
    setFavoritesLoading(false);
  }
}, [user?.userId]);


  // Handle booking submission
  const handleBookingSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDetails || !user?.userId) return;
    
    try {
      await client.models.Reservation.create({
        userId: user.userId,
        restaurantId: bookingDetails.restaurantId,
        date: bookingDetails.date,
        time: bookingDetails.time,
        guests: bookingDetails.guests,
        specialRequests: bookingDetails.specialRequests,
        status: 'confirmed'
      });
      
      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingForm(false);
        setBookingSuccess(false);
        setBookingDetails(null);
      }, 2000);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  }, [bookingDetails, user?.userId]);

  // Detect user location
  const detectLocation = useCallback(async () => {
    setUserLocation(prev => ({ ...prev, loading: true, error: undefined }));
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            loading: false
          };
          
          setUserLocation(newLocation);
          
          // Try to get address from coordinates
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.lat}&lon=${newLocation.lng}`
            );
            const data = await response.json();
            const address = data.display_name || 'Your location';
            
            setUserLocation(prev => ({ 
              ...prev, 
              address: address.split(',')[0] // Just get the first part of address
            }));
          } catch (error) {
            console.error("Error fetching address:", error);
          }
          
          setFilters(prev => ({
            ...prev,
            currentLocation: newLocation,
            selectedArea: null
          }));
        },
        (error) => {
          let errorMessage = "Error getting location";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Location access was denied";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Location information is unavailable";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "Location request timed out";
          }
          
          setUserLocation({
            lat: 0,
            lng: 0,
            loading: false,
            error: errorMessage
          });
          
          // Default to MG Road if location access is denied
          setFilters(prev => ({
            ...prev,
            currentLocation: BANGALORE_AREAS.find(a => a.name === 'MG Road') || null,
            selectedArea: 'MG Road'
          }));
        }
      );
    } else {
      setUserLocation({
        lat: 0,
        lng: 0,
        loading: false,
        error: "Geolocation is not supported by this browser."
      });
      // Default to MG Road if geolocation not supported
      setFilters(prev => ({
        ...prev,
        currentLocation: BANGALORE_AREAS.find(a => a.name === 'MG Road') || null,
        selectedArea: 'MG Road'
      }));
    }
  }, []);

  // Update filters
  const updateFilters = useCallback((partial: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...partial }));
  }, []);

  // Initialize
  useEffect(() => {
    // Set theme based on user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    
    // Detect location on first load
    detectLocation();
    
    // Load user favorites
    loadFavorites();
  }, [detectLocation, loadFavorites]);

  // Update filtered restaurants when filters or restaurants change
  useEffect(() => {
    const updatedRestaurants = updateRestaurantsOpenStatus(restaurants);
    const filtered = getFilteredRestaurants(updatedRestaurants, filters);
    setFilteredRestaurants(filtered);
  }, [filters, getFilteredRestaurants, updateRestaurantsOpenStatus]);

  // Apply dark/light theme
  useEffect(() => {
    document.documentElement.className = isDarkMode ? 'dark-theme' : 'light-theme';
  }, [isDarkMode]);

  // Memoized restaurant areas for filter
  const restaurantAreas = useMemo(() => {
    const areas = new Set(restaurants.map(r => r.area));
    return Array.from(areas).sort();
  }, []);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">Namma Bengaluru Eats</h1>
          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search restaurants..."
                className="search-input"
                value={filters.searchQuery}
                onChange={(e) => updateFilters({ searchQuery: e.target.value })}
              />
            </div>
            <div className="user-controls">
              <button 
                className="theme-toggle"
                onClick={() => setIsDarkMode((prev) => !prev)}
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button 
                className="sign-out-button"
                onClick={signOut}
                aria-label="Sign out"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <div className="main-content">
          <div className="hero-section">
            <h2 className="hero-title">Discover Bangalore's Culinary Treasures</h2>
            <p className="hero-subtitle">
              From iconic dosa joints to modern gastropubs, find your perfect meal in India's food capital
            </p>
          </div>

          {/* Location Controls */}
          <div className="location-controls">
            <div className="location-selector">
              <label htmlFor="area-select" className="location-label">
                Search in Area:
              </label>
              <select
                id="area-select"
                className="area-select"
                value={filters.selectedArea || ''}
                onChange={(e) => updateFilters({ 
                  selectedArea: e.target.value || null,
                  currentLocation: e.target.value ? 
                    BANGALORE_AREAS.find(a => a.name === e.target.value) || null : 
                    userLocation
                })}
              >
                <option value="">All Areas</option>
                {restaurantAreas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
            <div className="location-action">
              <button 
                onClick={detectLocation}
                className="locate-button"
                disabled={userLocation.loading}
              >
                {userLocation.loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  '📍 Use My Current Location'
                )}
              </button>
              {userLocation.error && (
                <span className="location-error">{userLocation.error}</span>
              )}
              {filters.currentLocation && !userLocation.error && (
                <div className="location-display">
                  {userLocation.address ? (
                    <span className="location-text">
                      Searching near: <strong>{userLocation.address}</strong>
                    </span>
                  ) : (
                    <span className="location-text">
                      Searching within <strong>{filters.maxDistance} km</strong> of your location
                    </span>
                  )}
                  <button 
                    className="location-clear"
                    onClick={() => {
                      setUserLocation({ lat: 0, lng: 0, loading: false });
                      updateFilters({ 
                        currentLocation: null,
                        selectedArea: null
                      });
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="content-grid">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filter-section">
                <h3 className="filter-title">Refine Your Search</h3>
                
                <div className="filter-group">
                  <h4 className="filter-group-title">Distance (km)</h4>
                  <div className="slider-container">
                    <input
                      type="range"
                      min={1}
                      max={20}
                      value={filters.maxDistance}
                      onChange={(e) => updateFilters({ maxDistance: Number(e.target.value) })}
                      className="distance-slider"
                    />
                    <span className="slider-value">{filters.maxDistance} km</span>
                  </div>
                </div>

                <div className="filter-group">
                  <label className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={filters.onlyOpenNow}
                      onChange={(e) => updateFilters({ onlyOpenNow: e.target.checked })}
                    />
                    <span>Open Now</span>
                  </label>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Price Range</h4>
                  <div className="price-range-options">
                    {['₹', '₹₹', '₹₹₹', '₹₹₹₹'].map((range) => (
                      <label key={range} className="price-range-label">
                        <input
                          type="checkbox"
                          checked={filters.priceRange.includes(range as PriceRange)}
                          onChange={() =>
                            updateFilters({
                              priceRange: filters.priceRange.includes(range as PriceRange)
                                ? filters.priceRange.filter((r) => r !== range)
                                : [...filters.priceRange, range as PriceRange],
                            })
                          }
                          className="price-range-input"
                        />
                        <span className="price-range-display">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Cuisine</h4>
                  <select
                    className="cuisine-select"
                    value={filters.selectedCuisine || ''}
                    onChange={(e) => updateFilters({ selectedCuisine: e.target.value as Cuisine || null })}
                  >
                    <option value="">All Cuisines</option>
                    <option value="Indian">Indian</option>
                    <option value="South Indian">South Indian</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="North Indian">North Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Continental">Continental</option>
                    <option value="Italian">Italian</option>
                    <option value="American">American</option>
                  </select>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Category</h4>
                  <select
                    className="category-select"
                    value={filters.selectedCategory || ''}
                    onChange={(e) => updateFilters({ selectedCategory: e.target.value as Category || null })}
                  >
                    <option value="">All Categories</option>
                    <option value="Fine Dining">Fine Dining</option>
                    <option value="Casual Dining">Casual Dining</option>
                    <option value="Quick Bites">Quick Bites</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Pub">Pub</option>
                  </select>
                </div>

                <div className="filter-group">
                  <h4 className="filter-group-title">Minimum Ratings</h4>
                  <div className="rating-input-group">
                    <label className="rating-label">
                      <span>Aesthetic</span>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        step={0.1}
                        value={filters.minAestheticRating}
                        onChange={(e) => updateFilters({ minAestheticRating: Number(e.target.value) })}
                        className="rating-input"
                      />
                    </label>
                    <label className="rating-label">
                      <span>Taste</span>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        step={0.1}
                        value={filters.minTasteRating}
                        onChange={(e) => updateFilters({ minTasteRating: Number(e.target.value) })}
                        className="rating-input"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Restaurant Listing */}
            <section className="restaurant-listing">
              <div className="listing-header">
                <h2 className="listing-title">
                  {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'} Found
                  {filters.selectedArea && ` in ${filters.selectedArea}`}
                  {!filters.selectedArea && filters.currentLocation && ` within ${filters.maxDistance} km`}
                </h2>
              </div>

              {filteredRestaurants.length > 0 ? (
                <div className="restaurant-grid">
                  {filteredRestaurants.map((restaurant) => {
                    const distance = filters.currentLocation 
                      ? calculateDistance(filters.currentLocation, restaurant.location).toFixed(1)
                      : null;
                    
                    return (
                      <div
                        key={restaurant.id}
                        className="restaurant-card"
                        onClick={() => {
                          setSelectedRestaurant(restaurant);
                          document.body.style.overflow = 'hidden';
                        }}
                      >
                        <div className="card-image-container">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="card-image"
                            loading="lazy"
                          />
                          <div className="card-rating">
                            <span className="rating-star">★</span>
                            <span>{restaurant.rating.toFixed(1)}</span>
                          </div>
                          {distance && (
                            <div className="card-distance">
                              {distance} km
                            </div>
                          )}
                          <div className="card-area">
                            {restaurant.area}
                          </div>
                          {restaurant.isOpen && (
                            <div className="card-open-badge">Open Now</div>
                          )}
                          <button 
                            className={`favorite-button ${favorites.includes(restaurant.id) ? 'favorited' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(restaurant.id);
                            }}
                            aria-label={favorites.includes(restaurant.id) ? 'Remove from favorites' : 'Add to favorites'}
                          >
                            ♥
                          </button>
                        </div>
                        <div className="card-content">
                          <h3 className="card-title">{restaurant.name}</h3>
                          <div className="card-meta">
                            <span className="card-cuisine">{restaurant.cuisine}</span>
                            <span className="card-category">{restaurant.category}</span>
                            <span className="card-price">{restaurant.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🍽️</div>
                  <h3>No restaurants match your criteria</h3>
                  <p>Try adjusting your filters or search area</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p className="footer-text">© {new Date().getFullYear()} Namma Bengaluru Eats — Discover Bangalore's Food Scene</p>
      </footer>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && (
        <div className="modal-overlay">
          <div className="restaurant-modal">
            <button
              onClick={() => {
                setSelectedRestaurant(null);
                document.body.style.overflow = 'auto';
              }}
              className="modal-close"
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <div className="modal-image-container">
              <img 
                src={selectedRestaurant.image} 
                alt={selectedRestaurant.name} 
                className="modal-image"
              />
              <div className="image-overlay">
                <h2 className="modal-title">{selectedRestaurant.name}</h2>
                <div className="modal-meta">
                  <span className="modal-rating">
                    ★ {selectedRestaurant.rating.toFixed(1)}
                  </span>
                  <span className="modal-cuisine">
                    {selectedRestaurant.cuisine} • {selectedRestaurant.category}
                  </span>
                  <span className="modal-price">
                    {selectedRestaurant.priceRange}
                  </span>
                  {filters.currentLocation && (
                    <span className="modal-distance">
                      {calculateDistance(filters.currentLocation, selectedRestaurant.location).toFixed(1)} km away
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="modal-content">
              <div className="modal-section">
                <h3 className="section-title">About</h3>
                <p className="modal-description">{selectedRestaurant.description}</p>
              </div>
              
              <div className="modal-details-grid">
                <div className="detail-item">
                  <h4 className="detail-label">Address</h4>
                  <p className="detail-value">{selectedRestaurant.address}</p>
                  <p className="detail-area">{selectedRestaurant.area}</p>
                </div>
                
                <div className="detail-item">
                  <h4 className="detail-label">Hours</h4>
                  <p className="detail-value">{selectedRestaurant.openingHours}</p>
                  {selectedRestaurant.isOpen ? (
                    <p className="open-status open">Open Now</p>
                  ) : (
                    <p className="open-status closed">Currently Closed</p>
                  )}
                </div>
                
                <div className="detail-item">
                  <h4 className="detail-label">Contact</h4>
                  <p className="detail-value">{selectedRestaurant.contactNumber}</p>
                </div>
                
                <div className="detail-item">
                  <h4 className="detail-label">Features</h4>
                  <div className="features-list">
                    {selectedRestaurant.features.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="modal-ratings">
                <div className="rating-pill">
                  <span className="rating-label">Aesthetic</span>
                  <span className="rating-value">{selectedRestaurant.aestheticRating.toFixed(1)}</span>
                </div>
                <div className="rating-pill">
                  <span className="rating-label">Taste</span>
                  <span className="rating-value">{selectedRestaurant.tasteRating.toFixed(1)}</span>
                </div>
                <div className="rating-pill">
                  <span className="rating-label">Area</span>
                  <span className="rating-value">{selectedRestaurant.area}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  className="book-button"
                  onClick={() => {
                    setBookingDetails({
                      restaurantId: selectedRestaurant.id,
                      date: '',
                      time: '',
                      guests: 2,
                      specialRequests: ''
                    });
                    setShowBookingForm(true);
                  }}
                >
                  Book a Table
                </button>
                <button 
                  className={`favorite-button ${favorites.includes(selectedRestaurant.id) ? 'favorited' : ''}`}
                  onClick={() => toggleFavorite(selectedRestaurant.id)}
                >
                  {favorites.includes(selectedRestaurant.id) ? '♥' : '♡'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBookingForm && bookingDetails && (
        <div className="modal-overlay">
          <div className="booking-modal">
            <button
              onClick={() => {
                setShowBookingForm(false);
                setBookingDetails(null);
              }}
              className="modal-close"
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <h2 className="booking-title">Book a Table at {selectedRestaurant?.name}</h2>
            
            {bookingSuccess ? (
              <div className="booking-success">
                <div className="success-icon">✓</div>
                <h3>Booking Confirmed!</h3>
                <p>Your table reservation has been confirmed.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="booking-date">Date</label>
                  <input
                    id="booking-date"
                    type="date"
                    value={bookingDetails.date}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      date: e.target.value
                    })}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="booking-time">Time</label>
                  <input
                    id="booking-time"
                    type="time"
                    value={bookingDetails.time}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      time: e.target.value
                    })}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="booking-guests">Number of Guests</label>
                  <select
                    id="booking-guests"
                    value={bookingDetails.guests}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      guests: Number(e.target.value)
                    })}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="booking-requests">Special Requests</label>
                  <textarea
                    id="booking-requests"
                    value={bookingDetails.specialRequests}
                    onChange={(e) => setBookingDetails({
                      ...bookingDetails,
                      specialRequests: e.target.value
                    })}
                    placeholder="Any special requirements?"
                  />
                </div>
                
                <button type="submit" className="submit-booking">
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;