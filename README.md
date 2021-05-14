# The Rigging Loft

#### A tool for FAA riggers to record information about customers, their equipment and the work that they do.

# ![theriggingloft](src/logo.png)


## Setup & install
1. Clone file (git@github.com:calebsjames/theRiggingLoft.git)
2. `mkdir theRiggingLoftAPI`
3. `cd theRiggingLoftAPI`
4. `touch database.json`
5. `json-server -p 8088 -w database.json`
6. cd into "theRiggingLoft" directory
7. From theRiggingLoft directory, `npm install`
8. From theRiggingLoft directory, `npm start`

## Testing
1. From the landing page, create a new user account and log in.
2. No information will be available to you as all data is user-specific.
3. Navigate to "customers" section and click the "+" button to create a new customer.
4. After creating the new customer you will be brought back to the landing page where you will see your newly added customer.
5. Click the customers name and you will be brought to a page to see all previous work for that customer. Click the "New Inspection" button to begin a new inspection.
6. Upon saving the inspection, you will be brought back to the home page that displays all your previous work.
7. If you would like to edit or delete the customer or inspection you can click on the customer's name to see and edit details.
8. If you would like to begin a new inspection on the same gear, you can click "New Inspection" in the customer details page and it will automatically populate your new inspection fields with the related data.

## Alternative Testing
1. Navigate to https://theriggingloft.herokuapp.com/home
2. Because it is hosted on Heroku it may take a minute to load. Please refresh if it times out.
3. The hosted application comes with a logged in user and pre-loaded data. It takes additional time for this to load as well and may need a refresh.

### ERD:
https://dbdiagram.io/d/60243d7b80d742080a3a0cdb

## created with 
React, Javascript

### users
    "email": "franky@gmail.com",
    "name": "Franky Frankerson",
    "id": 1
 
### customers
    "name": "Bobo",
    "phone": "123-456-7899",
    "customerNotes": "Notes about Bobo",
    "userId": 1,
    "id": 1
  
 ### containers
    "manufacturer": "Sunpath",
    "model": "Javelin",
    "size": "TJNK",
    "serialNumber": "32098",
    "color": "black",
    "dom": "07/2009",
    "notes": "Notes about container",
    "userId": 1,
    "id": 1
  
  ### aads 
    "manufacturer": "Vigil USA",
    "model": "Quatro",
    "serialNumber": "67890",
    "dom": "06/2020",
    "nextServiceDate": "06/2026",
    "notes": "Notes on AAD",
    "userId": 1,
    "id": 1
  
  ### reserves
    "manufacturer": "Performance Designs",
    "model": "PDR",
    "size": "124",
    "serialNumber": "19877",
    "color": "White",
    "dom": "12/2020",
    "userId": 1,
    "notes": "Notes on reserve",
    "id": 1
  
  ### mainParachutes
    "manufacturer": "Performance Designs",
    "model": "Sabre 3",
    "size": "150",
    "serialNumber": "8970",
    "color": "Red",
    "dom": "12/2019",
    "userId": 1,
    "notes": "Notes on Main",
    "id": 1
  
  
### inspections
    "userId": 1,
    "customerId": 14,
    "date": "2021-03-24T16:14:20.727Z",
    "containerId": 29,
    "containerMainTray": false,
    "containerReserveTray": false,
    "containerHardware": false,
    "containerChestStrap": false,
    "containerLegStraps": false,
    "containerRisers": false,
    "containerStitching": false,
    "containerGrommets": false,
    "containerReserveHandle": false,
    "containerCutawayHandle": false,
    "containerWebbing": true,
    "containerNotes": "Notes",
    "reserveDBag": false,
    "reserveLinks": false,
    "reserveSuspensionLines": false,
    "reserveBridlePilotchute": false,
    "reserveCrossports": false,
    "reserveSeamFabric": false,
    "reserveSlider": false,
    "reserveNotes": "Notes",
    "reserveId": 31,
    "mainDBag": false,
    "mainLinks": false,
    "mainSuspensionLines": false,
    "mainBridlePilotchute": false,
    "mainCrossports": false,
    "mainSeamFabric": false,
    "mainSlider": false,
    "mainNotes": "Notes",
    "mainParachuteId": 34,
    "aadInstallation": false,
    "aadCables": false,
    "aadInService": false,
    "aadNotes": "Notes",
    "aadId": 33,
    "id": 39
