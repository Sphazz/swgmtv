$(document).ready(function() {
	$category = 1;
	$index = 0;
	$search = false;
	$searchArr = [];
	$('.cateLength').html(Object.keys(jsonArr[$category]).length);
	$('.cateName').html($category);
	$index = loadMobiles(jsonArr[$category], $index);

	function loadMobiles(cate, $index) {
		var maxAppend = 12;
		if ($('#mobile-container').hasClass('list-view'))
			maxAppend = Math.floor($(window).height() / 100)*3 + 3;
		else
			maxAppend = Math.floor($(window).height() / 390)*3 + 3;
		
		$('#loadMore').prop('disabled', false);

		max = $index + maxAppend;
		$output = '';

		var cateLength = Object.keys(cate).length;

		if ($index == 0)
			$('#mobile-container').html('');

		for ($index; $index <= cateLength; $index++) {
			if (cateLength == $index) {
				$('#loadMore').prop('disabled', true);
				return $index;
			}
			
			if ($index == max)
				return $index;

			$output = "<div class='col-md-4 col-sm-6 swg-mtv-wrap'><div class='swg-mtv-card'><div class='mtv-name'>" + cate[$index] + "</div><div class='mtv-image' data-mobile='" + cate[$index] + "' style='background-image: url(imgs/mobiles/thumbnails/" + cate[$index] + "_thumb.jpg)'><span class='mtv-index'>(" + ($index + 1) + ")</span></div></div></div></div>";
			$('#mobile-container').append($output);
		}
		return $index;
	}

	$('#viewType').on( "click", '.btn', function() {
		$(this).prop('disabled', true);
		if ($(this).attr('id') == 'listView')
			$('#gridView').prop('disabled', false);
		else
			$('#listView').prop('disabled', false);
		$('#mobile-container').toggleClass('list-view');
	});

	$('#mobile-container').on( "click", '.swg-mtv-card', function() {
		openModal($(this).children('.mtv-image'));
	});

	function openModal($selected) {
		var mobileName = $selected.data("mobile");
		$('#modalScreenshot').css("background-image", 'url(imgs/mobiles/full/' + $selected.data("mobile") + '.jpg)');
		$('#modalTitle').html(mobileName);
		$('#viewFull').modal();
	}

	$('.cate-button').on( "click", function() {
		window.scrollTo(0,0);
		$category = $(this).data("cate");
		$search = false;
		$index = 0;
		$('#resultsType').html('Category:');
		$('.cateLength').html(Object.keys(jsonArr[$category]).length);
		$('.cateName').html($category);
		$('.cate-button.active').toggleClass('active');
		$(this).toggleClass('active');
		$index = loadMobiles(jsonArr[$category], $index);
	});

	$('#searchMobiles').on( "click", function(e) {
		e.preventDefault();
		$('#mobile-container').html('');
		window.scrollTo(0,0);
		$searchArr = [];
		$search = true;
		$searchValue = $('#searchBox').val();
		var sCount = 0;
		var expression = new RegExp($searchValue, "i");
		$.each(jsonArr, function(key, cate) {
			$.each(cate, function(k, value) {
			    if (value.search(expression) != -1) {
			    	$searchArr.push(value);
					sCount++;
			    }
			});
		});
		$index = 0;
		$index = loadMobiles($searchArr, $index);
		$('.cate-button.active').toggleClass('active');
		$('#resultsType').html('Search Results:');
		$('.cateLength').html(sCount);
		$('.cateName').html($searchValue);
	});

	$('#loadMore').on( "click", function() {
		if ($search !== true)
			$index = loadMobiles(jsonArr[$category], $index);
		else
			$index = loadMobiles($searchArr, $index);
	});

	$('#toTop').on( "click", function() {
		 $("html, body").animate({ scrollTop: 0 }, 100);
	});

	$(window).scroll(function() {
		if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
			if ($search !== true)
				$index = loadMobiles(jsonArr[$category], $index);
			else
				$index = loadMobiles($searchArr, $index);
		}
	});
});