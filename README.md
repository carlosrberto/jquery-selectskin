# jQuery SelectSkin

A basic html select element replacement.

## About the 2.0 release

* API with some useful methods
* Compatibility with jQuery 1.9+
* Required jQuery 1.7+

## Demo

http://carlosrberto.github.com/jquery-selectskin/

## Usage
```javascript
$(function(){
	$('select').SelectSkin();
});
```

## Download

All ready-to-use files are located in the [`dist/`](dist/) directory.

## API

Some useful methods:

|    Method   |                     Usage                     |                                                         Description                                                          |
|-------------|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|
| **update**  | ```$('select').SelectSkin('update')```        | Update SelectSkin text, useful in cases where the content of the select element is changed without using the SelectSkin API. |
| **empty**   | ```$('select').SelectSkin('empty')```         | Empty the select element.                                                                                                    |
| **append**  | ```$('select').SelectSkin('append', html)```  | Append new elements to select element, `html` must be a string, an option element or a jquery object.                        |
| **prepend** | ```$('select').SelectSkin('prepend', html)``` | Prepend new elements to select element, `html` must be a string, an option element or a jquery object.                       |
| **reset**   | ```$('select').SelectSkin('reset')```         | Reset the select element, show the first option element as selected.                                                         |
| **destroy** | ```$('select').SelectSkin('destroy')```       | Destroy all SelectSkin references, events and elements.                                                                      |
