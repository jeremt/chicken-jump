define ->
	class Menu

		constructor: (parent, first, @pages) ->
			obj = @
			for selector, callback of @pages
				@pages[selector] =
					callback: callback
					elem: document.querySelector selector

			@switchPage first

			links = document.querySelectorAll parent + " button[data-target]"
			for link in links
				switchTo = (e) ->
					selector = "#" + @dataset["target"]
					obj.switchPage selector
				link.onclick = switchTo
				link.ontouchstart = switchTo

		switchPage: (selector) ->
			for key, page of @pages
				page.elem.style.display = if key is selector then "block" else "none"
			@pages[selector].callback?()