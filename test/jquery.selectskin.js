module("jQuery.SelectSkin", {
	setup: function() {
		$fixture = $("#qunit-fixture");
		$select = $fixture.find('select');
		$select.SelectSkin();
		console.log('setup');
	}
});

test("Test initialization", function() {
	$selectSkin = $select.parents(".select-skin");
	selectedText = $select.find('option:selected').text();
	$selectSkinText = $selectSkin.find('.select-skin-text');

	equal(typeof $select.data("SelectSkin"), "object", "SelectSkin initialized on element");
	equal($selectSkin.length, 1, "One SelectSkin wrapper created");
	equal(selectedText, $selectSkinText.text(), "Display selected option text");
});

test("API can be accessed", function(){
	var api = $select.data('SelectSkin');
	equal(typeof $select.data("SelectSkin"), "object", "API returned");
	equal(typeof api.update, "function", "API method accessed");
});