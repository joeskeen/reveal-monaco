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

## Requirements

Requires a browser capable of loading ECMAScript modules (no IE support)
