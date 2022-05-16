# Monaco Editor Plugin for Reveal.js

A small plugin that allows you to use the Monaco Editor in your reveal.js presentations (i.e. live coding, etc.)

## Setup

* Copy the plugin file (`plugin.js`) into the `/plugin/monaco` folder of your presentation
* Import and register the plugin: 
    ```html
    <script type="module">
      import RevealMonaco from "./plugin/monaco/plugin.js";
      // More info about initialization & config:
      // - https://revealjs.com/initialization/
      // - https://revealjs.com/config/
      Reveal.initialize({
        hash: true,

        monaco: {
          defaultLanguage: 'python' // optional, defaults to 'javascript'
        },

        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [
          RevealMarkdown,
          RevealNotes,
          RevealMonaco,
          // RevealHighlight <-- comment this one out!
        ],
      });
    </script>
    ```

    Note that the built-in `RevealHighlight` plugin **will not** work with the Monaco plugin out-of-the-box.
    Save yourself some headache and remove it (it's in the code snippet above by default).
* To use the Monaco Editor in your slide, just add a preformatted code block with the class "monaco":
    ```html
    <section>
      <h2>My Code</h2>
      <!-- specifying the language below is optional, will fall back to default -->
      <pre><code class="monaco" language="javascript">
    function helloWorld() {
      console.log('hello, world!')
    }
      </code></pre>
    </section>
    ```
* You can use CSS to customize the appearance, for example: 
    ```css
    .reveal pre code.monaco {
      min-height: 200px;
      padding: 0;
      padding-top: 3px;
      background-color: white;
    }
    ```

## Requirements

Requires a browser capable of loading ECMAScript modules (no IE support)

## Troubleshooting

If your code isn't displaying correctly, try wrapping it in `<script type="text/template">...</script>`. The plugin will automatically unwrap the contents of that tag before passing it to the Monaco Editor.

```html
<section data-auto-animate>
  <h2>My Code</h2>
  <pre><code class="monaco" language="javascript"><script type="text/template">
import React, { useState } from 'react';

function Example() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}

function SecondExample() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me
			</button>
		</div>
	);
}
  </script></code></pre>
</section>
```

### Using reveal-monaco plugin with highlight plugin

There is a workaround if you would like to use both the built-in Highlight plugin with the Monaco Editor plugin that allows each to work side-by-side:

* Open all the source code files for the highlight plugin
* Find `pre code` and replace it with `pre code.hljs`
* Now any code blocks tagged with the `hljs` class will use the Highlight plugin, and code blocks tagged with `monaco` will use the Monaco plugin.