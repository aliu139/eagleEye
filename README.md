# [eagleEye](https://aliu139.github.io/eagleEye/index.html)
Think Google Analytics... but for the real world

![Eagle Eye](res/ee.png "EagleEye")

## Team
* [Austin Liu](https://github.com/aliu139)
* Benjamin Jiang
* Mahima Shah
* Namit Juneja

## Al
EagleEye is watching out for you. Our program links into already existing CCTV feeds + webcam streams but provides a new wealth of data, simply by pairing the power of machine learning algorithms with the wealth of data already being captured. All of this is then output to a simple-to-use front-end website, where you can not only view updates in real-time but also filter your existing data to derive actionable insights about your customer base. The outputs are incredibly intuitive and no technical knowledge is required to create beautiful dashboards that replicate the effects of complicated SQL queries. All data automatically syncs through Firebase and the site is mobile compatible.

## Technologies Used
* AngularJS
* Charts.js
* OpenCV
* Python
* SciKit
* Pandas
* FireBase

## Technical Writeup
Image processing is done using OpenCV with Python bindings. This data is posted to Firebase which continuously syncs with the local server. The dashboard pulls this information and displays it using Angular. Every several minutes, the front-end pulls the data that has not already been clustered and lumps it together in a Pandas dataframe for quicker calculations. The data is clustered using a modified SciKit library and reinserted into a separate Firebase. The chart with filters pulls from this database because it is not as essential for these queries to operate in real time.

All of the front-end is dynamically generated using AngularJS. All of the data is fetched using API calls to the Firebase. By watching $scope variables, we can have the charts update in real time. In addition, by using charts.js, we also get smoother transitions and a more aesthetic UI. All of the processing that occurs on the filters page is also calculated by services and linked into the controller. All calculations are done on the fly with minimal processing time.
