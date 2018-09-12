# QuickLoad
QuickLoad is a WeChat Mini-Program for showcasing the QuickLoad trucker to shipment matching algorithm. The app takes input from the driver about the driver's truck and the intended route and makes a search request to the server. The algorithm sorts through a database of available shipments and returns a list of suitable shipment combinations (taking into consideration shipment "mixability" ie. whether certain shipments types like food or chemicals can be transported together) and individual shipments that will fit in the driver's truck (by length and total weight), and matches the intended route. The app displays the results with information such as total price and distance so that drivers can choose the most desirable shipping orders to accept. The intended purpose of the app is to optimize driver profitability per trip, reduce shipment wait times before being accepted, improve safety by preventing drivers from overloading, and reduce the  environmental impact from drivers taking less than full cargo loads.

Getting Started
Download the app from: https://github.com/git-hacker/quickload-app
Download the server from: https://github.com/git-hacker/quickload-server

Prerequisites
Download and install WeChat Mini-Program IDE (https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18091020)

<!-- Run Server instructions here -->

Running the app
Open the Wechat IDE.
If the IDE prompts you to login, scan the QR code via WeChat from your mobile device.
Select the purple box on the left for WeChat Mini-Program
Click the "+" icon on the bottom right corner of the window.
In the first input field, navigate to the quickload-app directory and click OK.
The AppID and App name fields should automatically propogate.
Click Confirm.

The first interface is the truck driver information screen. Enter the city of origin (where the driver wants to pick up shipments from) and destination city (where the driver wants to deliver to - destination field is optional and can be left blank or "所有目的地" can be selected to return results from all destinations).
Enter Driver License in next field (currently this can be any string of characters).
Enter the truck type from the picker and select confirm.
Enter the truck cargo area length (the options in this picker will change based upon the truck type selected in the previous truck type picker).
Tap the search button.

The search results interface will appear. If there are no results, a "no search results" message will be displayed. The user can choose to go back to the previous screen by tapping the back arrow in the top left. (tip: choosing a larger cargo length will yield more search results).
The search results will be sorted by total price in descending order. Each card represents either a single shipment or combination of shipments. Tapping the "see details" button will open the details interface for that shipment. 

The shipment details interface shows a breakdown of each shipment in a combination of shipments and its associated shipper name, shipment type, weight, length, and price. The user can then choose to accept the shipment by tapping the accept button at the bottom, or go back and see the list of search results again. Tapping the accept button will direct the user to the user's accepted shipments interface. Once a shipment has been accepted, a request will be sent to the server to change the status of the shipments from shipped: false, to shipped: true, and they will no longer be displayed in the search results.
