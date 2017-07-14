angular.module('starter')

	.controller('MenuCtrl', function($scope, $http, $sce, $ionicScrollDelegate){
		
		$scope.categories = [];

		$http.get("https://hackitech.com/api/get_category_index/").then(
			function(returnData){

				$scope.categories = returnData.data.categories;
				$scope.categories.forEach(function(element, index, array){
					element.title = $sce.trustAsHtml(element.title);

				})

				console.log(returnData);

			}, function(err) {

				console.log(err);

			})
	})


	.controller('MainCtrl', function($scope, $http, $sce, $ionicScrollDelegate) {

		$scope.offset = 0;
		$scope.count_total = 1;

		$scope.doRefresh = function()
		{
			$scope.recent_posts = [];

			$http.get("https://hackitech.com/api/get_posts/").then(
				function(returnPostData) {
					console.log(returnPostData);
					$scope.recent_posts = returnPostData.data.posts;
					$scope.count_total = returnPostData.data.count_total;	

					$scope.recent_posts.forEach(function(element, index, array){
						element.excerpt = element.excerpt.substr(0,90);
						element.excerpt = element.excerpt + '...<i>Read More</i>';
						element.excerpt = $sce.trustAsHtml(element.excerpt);
						element.title = $sce.trustAsHtml(element.title);
					})

					$scope.$broadcast('scroll.refreshComplete');

				}, function(err) {

			})
		}

		$scope.recent_posts = [];

		$scope.canLoadMore = function()
		{
			return true;
		};


		$scope.loadMore = function()
		{
			

			$http.get("https://hackitech.com/api/get_posts/?offset="+$scope.offset).then(
				function(returnPostData) {
					var newPosts = returnPostData.data.posts;
					$scope.count_total = returnPostData.data.count_total;

					newPosts.forEach(function(element, index, array){
						element.excerpt = element.excerpt.substr(0,90);
						element.excerpt = element.excerpt + '...<i>Read More</i>';
						element.excerpt = $sce.trustAsHtml(element.excerpt);
						element.title = $sce.trustAsHtml(element.title);
					})

					$scope.recent_posts.push.apply($scope.recent_posts, newPosts);
					$scope.$broadcast("scroll.infiniteScrollComplete");
					$scope.offset += 10;

			});
		};

		$scope.searchTextChanged = function()
		{
			$ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(true);
		}
	})

	.controller('PostCtrl', function($http, $scope, $stateParams, $sce){
		
		$http.get('https://hackitech.com/api/get_post/?id=' + $stateParams.postId).then(
			function(returnPost) {
				$scope.post_title = returnPost.data.post.title;
				$scope.post_category = returnPost.data.post.categories[0].title ? returnPost.data.post.categories[0].title : 'no category';
				$scope.post_content = $sce.trustAsHtml(returnPost.data.post.content);
				$scope.post_date = returnPost.data.post.date;
				$scope.post_authorName = returnPost.data.post.author.first_name + " " + returnPost.data.post.author.last_name;
					if($scope.post_authorName.trim() == '')
						$scope.post_authorName = "Manjeet Bargoti";
					$scope.post_authorImage = 'http://ionicframework.com/img/docs/mcfly.jpg';
					$scope.post_image = returnPost.data.post.thumbnail_images.full.url;
					$scope.post_commentCount = returnPost.data.post.comment_count;
					$scope.post_views = returnPost.data.post.custom_fields.post_views_count[0];
					$scope.post_url = returnPost.data.post.url;
			}, function(err) {

			})

	})

	.controller('CatCtrl', function($http, $scope, $stateParams, $sce) {
		
		// $scope.doRefresh = function()
		// {
			$http.get('https://hackitech.com/api/get_category_posts/?id=' + $stateParams.catId).than(
			function(returnCatPost) {
				$scope.category_posts = returnCatPost.data.posts;
				$scope.category_posts.forEach(function(element, index, array) {
					element.excerpt = element.excerpt.substr(0,90);
					element.excerpt = element.excerpt + '...<i>Read More</i>';
					element.excerpt = $sce.trustAsHtml(element.excerpt);
					element.title = $sce.trustAsHtml(element.title);
				})
				$scope.category_title = returnCatPost.data.category.title;
				$scope.$broadcast('scroll.refreshComplete');	
			}, function(err) {

			})
		// }
		// $scope.doRefresh();
	})


