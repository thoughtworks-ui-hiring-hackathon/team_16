const routes = require('next-routes')

module.exports = routes()
.add('home-page', '/', 'home')
.add('movie-page', '/movie/:id([0-9]+)(/?)*', 'movie')
.add('dedicated-page', '/used-cars-in-:cityName([a-zA-Z]+)/:variant([0-9a-zA-Z\-\.\\(\\)\/\&]+)-:listingId([0-9]+)(/?)*', 'dedicated')
.add('dedicatedOld-page', '/:oldListingUrl(mostValuedCars|mvc|listings)/index/:listingId([0-9]+)(/?)*', 'dedicated')
.add('result-page', '/used:slug([-]*[0-9a-zA-Z\-\.\\(\\)\&]*)-cars-in-:cityName([a-zA-Z]+)(\/?)*', 'result')
.add('carloan', '/used-car-loan(/?)', 'carloan')
.add('insurance', '/used-car-insurance(/?)', 'insurance')
.add('papertransfer', '/used-car-paper-transfer(/?)', 'papertransfer')
.add('sellcar', '/sell-used-car(/?)*', 'sell_car')
.add('sell_car', '/sellers(/?)*', 'sell_car')
.add('sell_car_city', '/sell-used-cars-in-:cityName([a-zA-Z]+)(/?)*', 'sell_car')
.add('seo-page', '/used-cars(/?)*', 'home')
.add('contact', '/contact(/?)', 'contact_us')
.add('about', '/about(/?)', 'about')
.add('user_dashboard', '/user/dashboard(/?)', 'user_dashboard')
.add('user_subscription', '/user/subscription(/?)', 'user_subscription')
.add('seller_dashboard', '/user/seller-dashboard(/?)', 'seller_dashboard')
.add('checkout', '/checkout(/?)', 'checkout')
.add('seller_checkout', '/sellerDashboardCheckout(/?)', 'seller_checkout')