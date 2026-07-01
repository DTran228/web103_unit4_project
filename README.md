# WEB103 Unit 4 - *Bolt Bucket* 🏎️

Submitted by: **Duc Tran**

About this web app: **Bolt Bucket is a car customizer that lets users design their own custom car by choosing exterior color, roof type, wheels, and interior. The price updates dynamically as options are selected, and an SVG car preview changes visually in real time. Users can save their custom cars, then view, edit, or delete them from a list backed by a PostgreSQL database.**

Time spent: **___ hours**

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from an API**
- [x] **Data is supplied to the app using a Render PostgreSQL database**
  - [x] The web app uses a Render PostgreSQL database
  - [x] The PostgreSQL database includes a table that matches the data displayed in the web app
- [x] **The web app has a well-structured user interface**
  - [x] The app provides multiple features of the `CustomItem` (car) for the user to customize: Exterior Color, Roof Type, Wheels, and Interior
  - [x] Each customizable feature has multiple options to choose from (e.g. Exterior: Black, Red, Blue, White, Silver)
  - [x] The price of the `CustomItem` changes dynamically as different options are selected
  - [x] The visual interface changes in response to at least one customizable feature (SVG car preview updates color, roof shape, wheel color, and interior color in real time)
- [x] **The web app allows the user to save new `CustomItem`s**
  - [x] The user can submit their choices to save the `CustomItem` to the list of created `CustomItem`s
  - [x] Users can view a list of all submitted `CustomItem`s
  - [x] If a user submits a feature combo that is impossible (Convertible roof + Off-Road wheels), they receive an appropriate error message
- [x] **Saved `CustomItem`s can be updated and deleted**
  - [x] Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s
  - [x] Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s

The following **optional** features are implemented:

- [ ] User is alerted to impossible combos early (before form submission)

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='walkthrough.gif' title='Video Walkthrough' width='800' alt='Video Walkthrough' />

GIF created with [LICEcap](https://www.cockos.com/licecap/) / [ScreenToGif](https://www.screentogif.com/)

## Notes

The main challenge was setting up the PostgreSQL connection with Render and structuring the Express API routes to correctly handle all CRUD operations. The SVG car preview required careful coordinate planning to visually represent all customization options in real time.

## License

Copyright **2026** **Duc Tran**

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
