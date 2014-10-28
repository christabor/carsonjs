## A jQuery+canvas plugin for making random David Carson inspired art!

**How to use:**
`// Call the plugin on document.ready on a given canvas id:
$('#carson').carson();
`

### Override the Options:
*   delay **Boolean** - toggles delay.
*   delay_amount **Number** - the time (in milliseconds) for delay
*   fonts: **Array** of your fonts.
*   width: **Number** for width of canvas.
*   height: **Number** for height of canvas.
*   use_colors: **Boolean** to make it black and white or randomized colors.
*   complexity: **Number** (1,2,3 or 4) to determine complexity level (higher is more complex).
*   use_textures: **Boolean** if you want textures on or off.
*   use_stepped_bars: **Boolean** if you want to use the technique of having thin stepped lines across the canvas.
*   use_random_complexity: **Boolean** if you want the complexity level to be randomized.
*   text: **String** a string of text to use &mdash; you'll likely want to override this.
*   textures: **Array** of your texture filenames (relative filepath is required &mdash; e.g: img1.jpg, img2.jpg).

## Dependencies:

* jQuery 1.7 (can quickly be removed though)
