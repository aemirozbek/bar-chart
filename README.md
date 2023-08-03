# Gross Domestic Product (GDP) Visualization Bar Chart - D3.js

This web application visualizes Gross Domestic Product (GDP) data as a bar chart using D3.js, a powerful JavaScript library for data visualization. The app fetches GDP data from a JSON file and creates a bar chart to represent the GDP values over time.

## Features

- Interactive Bar Chart: The main feature of this app is an interactive bar chart that displays GDP values over time. Each bar represents the GDP value for a specific date, and hovering over a bar will display a tooltip with the date and GDP value.
- Data Source: The data used for this visualization is sourced from [freeCodeCamp's GitHub repository](https://github.com/freeCodeCamp/ProjectReferenceData). It contains historical GDP data for different dates.

## Usage

To run this app, follow these steps:

1. Clone the repository to your local machine.
2. Open the `index.html` file in a web browser that supports ES6 modules.
3. The app will fetch the GDP data from the provided URL and generate the visualization.

## Technologies Used

- D3.js: A powerful JavaScript library for data visualization, used to create the bar chart and handle interactive features.

## How the App Works

1. The app fetches the GDP data from the provided URL using the `fetch()` function.

2. It then processes the data and creates a time-based scale for the x-axis (representing dates) using D3's `scaleUtc()`.

3. A linear scale for the y-axis (representing GDP values) is also created using D3's `scaleLinear()`.

4. The app generates a responsive SVG container and draws rectangles (bars) using the fetched data. Each bar's height corresponds to the GDP value, and its width is calculated based on the number of data points.

5. The x-axis and y-axis are added to the chart using D3's `axisBottom()` and `axisLeft()` functions.

6. A tooltip is implemented using D3 to display additional information when the user hovers over a bar. The tooltip shows the date and GDP value, with the GDP value formatted to include commas for readability.