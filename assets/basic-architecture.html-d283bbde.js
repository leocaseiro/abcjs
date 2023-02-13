import{_ as s,M as a,p as o,q as r,Q as t,t as e,N as l,a1 as n}from"./framework-2ecd7faa.js";const d={},c=n(`<h1 id="basic-architecture" tabindex="-1"><a class="header-anchor" href="#basic-architecture" aria-hidden="true">#</a> Basic Architecture</h1><p>There are two forms of this library: the npm form and a minimized form for non-npm users.</p><p>When testing abcjs changes locally, there is no build step required. A handy way to test is to run:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm link
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>On this folder, and</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm link abcjs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>in an npm-based test application (like React or Vue). Then any changes made to the abcjs code will automatically be picked up by that test application&#39;s webpack.</p><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h2><p>There are docker files included so that npm can be run without installing it. This only applies to someone who wants to keep all their development tools separate on their computer. If you have nodejs installed then you can ignore this.</p><p>To run, type:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./docker-start.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>That will create a linux virtual machine and give you a command line to run npm.</p><h2 id="building-locally" tabindex="-1"><a class="header-anchor" href="#building-locally" aria-hidden="true">#</a> Building locally</h2><p>To build the library so that it can be included with a <code>&lt;script&gt;</code> tag, there are some options:</p><p>To build everything:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This takes a little while and is probably building more things than you want.</p><p>If you want to build a version that is convenient to debug:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run build:basic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then include the file <code>dist/abcjs-basic.js</code>.</p><p>To build the same code as minimized for distribution:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> run build:basic-min
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>And include the file <code>dist/abcjs-basic-min.js</code>.</p><h2 id="greasemonkey" tabindex="-1"><a class="header-anchor" href="#greasemonkey" aria-hidden="true">#</a> Greasemonkey</h2><p>There used to be a version of the library for Greasemonkey but that has been discontinued. If you want a Greasemonkey version, do this:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">cat</span> src/plugin/greasemonkey.js bin/abcjs_plugin_5.12.0-min.js <span class="token operator">&gt;</span> bin/abcjs_plugin_5.12.0.user.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="testing" tabindex="-1"><a class="header-anchor" href="#testing" aria-hidden="true">#</a> Testing</h2><h3 id="end-to-end" tabindex="-1"><a class="header-anchor" href="#end-to-end" aria-hidden="true">#</a> End-to-end</h3><p>There are mocha tests that are run in the browser that test various functionality. They are not close to having enough test coverage, compared to the set of ABC strings described below, but they are easy to use. Contributions to these are welcome.</p><p>To run them, open the file <code>tests/all.html</code> from a server. This is run on the source code so that changes you make to the source will be immediately reflected in the tests.</p><p>To run just one test or a smaller set of them, add <code>?grep=xxxxx</code> to run only the tests that match your string.</p><p>Most of the tests are run from <code>all.html</code>, but the audio tests need to run in real-time and require a user click to start them, so they are in a separate file called <code>web-audio.html</code>. In addition, there is a file <code>browser-compatibility.html</code> that runs the tests using the built version of the abcjs library so it will run on older browsers.</p><p>The rest of the <code>.html</code> files are subsets of the tests that are just for convenience if you are working on a particular section.</p><div class="custom-container tip"><p class="custom-container-title">Notice</p><p>It is not enough to just open the file so that the address bar in the browser shows the <code>file://</code> protocol. That will not run the javascript. It must be run in the context of a server.</p><p>To start a localhost server in WebStorm, open the file and notice the floating browser icons in the upper right corner. Click on one of them to open the test runner in that browser.</p><p>To start a localhost server in VSCode, one way to do that is to install the extension &quot;Live Server&quot; and click &quot;Go Live&quot;.</p></div><h3 id="testing-intermediate-stages" tabindex="-1"><a class="header-anchor" href="#testing-intermediate-stages" aria-hidden="true">#</a> Testing Intermediate Stages</h3>`,35),u={href:"https://paulrosen.net/contact-me/",target:"_blank",rel:"noopener noreferrer"},h=n(`<p>The files in the folder <code>test</code> contain a number of functions that receive an ABC formatted string and output an easy to read dump of the resulting objects.</p><p>These objects are at various stages though the process of handling the ABC. The stages are:</p><ol><li>After parsing the ABC string into an internal object.</li><li>After laying out the placement of all elements.</li><li>After putting all elements in the time that they should sound.</li><li>After creating a set of MIDI instructions.</li></ol><p>The method of unit testing is to run all of the test files through the various linters and save the output. Then, after making changes to the code, run the test files through again and compare the output to the original output to understand the effect of the changes.</p><p>Here&#39;s an example of how to call the linting functions:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import abcjs from &#39;abcjs/test&#39;;
doTest(abcString) {
	const tuneBook = new abcjs.TuneBook(abcString);
	const abcParser = new abcjs.parse.Parse();
	const parserLint = new abcjs.test.ParserLint();
	const div = document.getElementById(&quot;comparison-engraving&quot;);
	const engraverController = new abcjs.write.EngraverController(div,
			{add_classes: true, staffwidth: 800, staffheight: 400});

	tuneBook.tunes.forEach((item) =&gt; {
		abcParser.parse(item.abc);
		const tune = abcParser.getTune();
		const warnings = abcParser.getWarnings();
		const lint1 = parserLint.lint(tune, warnings);

		engraverController.engraveABC(tune);
		const output = abcjs.test.verticalLint([tune]);
		const lint2 = output.join(&quot;\\n&quot;);

		const sequence = abcjs.midi.sequence(tune);
		const lint3 = abcjs.test.midiSequencerLint(sequence);

		const midi = abcjs.midi.flatten(sequence);
		const lint4 = abcjs.test.midiLint(midi);

		console.log(&quot;PARSER OUTPUT&quot;);
		console.log(lint1);
		console.log(&quot;ENGRAVER OUTPUT&quot;);
		console.log(lint2);
		console.log(&quot;MIDI SEQUENCE OUTPUT&quot;);
		console.log(lint3);
		console.log(&quot;MIDI OUTPUT&quot;);
		console.log(lint4);
	});
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="font-info" tabindex="-1"><a class="header-anchor" href="#font-info" aria-hidden="true">#</a> Font Info</h2><p>The glyphs in <code>src/write/abc_glyphs.js</code> are generated using the files in the <code>font_generator</code> folder.</p><p>You can see all the glyphs by loading this file in the browser: <code>abcjs/font_generator/font_gen.html</code>.</p><p>You can play with the glyphs to help you modify them in this file: <code>abcjs/font_generator/font_editor.html</code></p>`,10);function p(m,b){const i=a("ExternalLinkIcon");return o(),r("div",null,[c,t("p",null,[e("There are hundreds of test files that are stored outside of this repository. If you wish to run those unit tests, please contact "),t("a",u,[e("Paul Rosen"),l(i)]),e(" for more information.")]),h])}const g=s(d,[["render",p],["__file","basic-architecture.html.vue"]]);export{g as default};
