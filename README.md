# ![theriggingloft](src/logo.png)

The Rigging Loft

A tool for FAA riggers to record information about customers, their equipment and the work that they do.

## Setup & install
1. Clone file (git@github.com:calebsjames/theRiggingLoft.git)
2. cd into "theRiggingLoft" directory
3. From API directory, `json-server -p 8088 -w database.json`
4. From theRiggingLoft directory, `npm install`
5. From theRiggingLoft directory, `npm start`

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
