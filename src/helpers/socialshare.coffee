define ->

	_arr =
		facebook: "http://facebook.com/sharer.php?s=100&p[url]={{url}}&p[title]={{title}}&p[summary]={{summary}}"
		twitter: "http://twitter.com/share?text={{title}} - {{summary}}&url={{url}}"

	return (social, title, summary) ->
		url = _arr[social]

		url = url.replace "{{url}}", window.location.href
		url = url.replace "{{title}}", title
		url = url.replace "{{summary}}", summary

		window.open encodeURI(url)