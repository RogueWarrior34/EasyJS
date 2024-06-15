## EasyJS Framework

EasyJS is a lightweight JavaScript framework designed to simplify the creation of various web components like accordion widgets. It provides essential utility functions for everyday web development tasks, ensuring minimal overhead and ease of use.

### Features

- **Accordion Widgets**: Easily transform HTML elements into accordion-style panels.
- **Modals**: Coming soon! Simplify the creation and management of modal dialogs.
- **Table Pagination**: Coming soon! Easily add pagination to tables.
- **DOM Manipulation**: Simple methods to get and set HTML content and element values.
- **AJAX Requests**: A straightforward API for making GET and POST AJAX requests.
- **Combo Box Population**: Coming soon! Simplify the population of combo boxes from JSON data sources.

### Getting Started

To use EasyJS, include the `EasyJS.js` script in your HTML file and initialize the framework after the DOM content is loaded.

### Installation

Add the EasyJS script to your project:

```html
<script src="path/to/EasyJS.js"></script>
```

### Usage

#### Accordion Widgets

To create an accordion, set the `accordian` attribute to `true` on the container element:

```html
<div accordian="true">
    <h3>Section 1</h3>
    <div>Content for section 1.</div>
    <h3>Section 2</h3>
    <div>Content for section 2.</div>
</div>
```

The framework will automatically initialize all elements with the `accordian="true"` attribute as accordion widgets when the page loads.

#### DOM Manipulation

EasyJS wraps HTML elements in `EasyJSElement` objects, allowing easy manipulation of their contents.

```javascript
const element = $$$('elementId');  // Retrieve element by ID
element.html('<p>New HTML content</p>');  // Set inner HTML
element.value('New value');  // Set input value
```

#### AJAX Requests

Perform AJAX requests using the `$$$.ajax` function:

```javascript
$$$.ajax({
    url: 'https://api.example.com/data',
    methodType: 'GET',  // or 'POST'
    data: { key1: 'value1', key2: 'value2' },  // Optional data
    success: function(response) {
        console.log('Success:', response);
    },
    failure: function() {
        console.error('Failed to fetch data.');
    }
});
```

#### Combo Box Population

The `fillComboBox` method will soon provide a simplified way to populate `SELECT` elements from a JSON data source.

**Example Usage:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyJS Example</title>
    <script src="path/to/easyjs.js"></script>
</head>
<body>
    <select id="designationCode"></select>

    <script>
        function populateDesignations() {
            $$$.ajax({
                "url": "designationsView",
                "methodType": "GET",
                "success": function(responseData) {
                    var designations = JSON.parse(responseData);
                    $$$("designationCode").fillComboBox({
                        "dataSource": designations,
                        "text": "title",
                        "value": "code",
                        "firstOption": {
                            "text": "<select designation>",
                            "value": "-1"
                        }
                    });
                },
                "failure": function() {
                    alert("Some problem occurred while fetching designations.");
                }
            });
        }
        window.addEventListener('load', populateDesignations);
    </script>
</body>
</html>
```

In this example, the `populateDesignations` function makes an AJAX GET request to fetch a list of designations. The response is parsed and used to fill the combo box with the ID `designationCode`. The `fillComboBox` method is structured to take a `dataSource`, the text and value fields to use for options, and an optional first placeholder option.

### API Reference

#### $$$ Function

```javascript
function $$$(cid)
```

- **Description**: Selects an HTML element by its ID and returns an `EasyJSElement` object.
- **Parameters**: `cid` (string) - The ID of the HTML element.

#### `EasyJSElement` Class

- **html(content)**
  - Sets or gets the HTML content of the element.
  - **Parameters**: `content` (optional string) - The HTML content to set.

- **value(content)**
  - Sets or gets the value of input elements.
  - **Parameters**: `content` (optional string) - The value to set.

- **fillComboBox(options)**
  - **Description**: Will simplify the process of populating a `SELECT` element with options from a JSON data source.
  - **Parameters**:
    - `options` (object) - Configuration for populating the combo box.
      - `dataSource` (array) - Array of objects to populate the options.
      - `text` (string) - Key in the data objects for option text.
      - `value` (string) - Key in the data objects for option value.
      - `firstOption` (object) - Optional first option for the combo box, with `text` and `value`.

#### $$$.ajax Function

```javascript
function $$$.ajax(jsonObject)
```

- **Description**: Performs an AJAX request.
- **Parameters**:
  - `url` (string) - The URL for the request.
  - `methodType` (string) - The HTTP method (`GET` or `POST`).
  - `data` (object) - Data to send with the request.
  - `success` (function) - Callback for successful response.
  - `failure` (function) - Callback for failed response.

### Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EasyJS Example</title>
    <script src="path/to/easyjs.js"></script>
</head>
<body>
    <div accordian="true">
        <h3>Click me!</h3>
        <div>This is an accordion panel.</div>
        <h3>Click me too!</h3>
        <div>This is another accordion panel.</div>
    </div>

    <select id="designationCode"></select>

    <script>
        function populateDesignations() {
            $$$.ajax({
                "url": "designationsView",
                "methodType": "GET",
                "success": function(responseData) {
                    var designations = JSON.parse(responseData);
                    $$$("designationCode").fillComboBox({
                        "dataSource": designations,
                        "text": "title",
                        "value": "code",
                        "firstOption": {
                            "text": "<select designation>",
                            "value": "-1"
                        }
                    });
                },
                "failure": function() {
                    alert("Some problem occurred while fetching designations.");
                }
            });
        }
        window.addEventListener('load', populateDesignations);
        window.addEventListener('load', $$$.initFramework);
    </script>
</body>
</html>
```

### License

EasyJS is released under the MIT License. See the [LICENSE](LICENSE) file for more details.

**Sponsored**
Boost your development productivity with [DevTools Pro](https://www.devtoolspro.com) - Advanced tools for efficient coding, debugging, and team collaboration. Try it today!
