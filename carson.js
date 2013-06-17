/*!
 * carsonJS - A jQuery+canvas plugin for making random David Carson inspired art!
 * (c) 2013 Chris Tabor <dxdstudio@gmail.com>
 * Apache 2.0 Licensed.
 * <3
 * http://dxdstudio.com/labs/carsonjs
 * http://github.com/christabor/carsonjs
 */

 (function($){
    $.fn.carson = function(options) {
        var filler = {
            generic: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, blanditiis ut iure nobis minus dolor! Harum, dolorum odit excepturi aspernatur itaque illo reiciendis nam quo voluptatibus sapiente iusto recusandae deleniti?',
            dc_quote1: 'It\'s not about knowing all the gimmicks and photo tricks. If you haven\'t got the eye, no program will give it to you.',
            dc_quote2: 'Graphic design will save the world right after rock and roll does.',
            dc_quote3: 'Don\'t confuse legibility with communication. Just because something is legible doesn\'t mean it communicates and, more importantly, doesn\'t mean it communicates the right thing.'
        },
        canvas = $(this),
        context,
        defaults = {
            fonts: ['Bodoni MT', 'Calibri', 'Cambria', 'Didot', 'Hoefler Text', 'Lucida Sans', 'Andale Mono', 'Lato', 'Bookman Old Style', 'Open Sans', 'Gentium', 'Georgia', 'Helvetica', 'Verdana', 'Century Gothic', 'Arial', 'Times New Roman', 'Monaco'],
            width: 800,
            height: 600,
            use_colors: true,
            complexity: 4,
            use_textures: true,
            use_stepped_bars: true,
            use_random_complexity: true,
            use_system_fonts: true,
            text: filler.dc_quote2,
            textures:[]
        },
        opts = $.extend(defaults, options);

        // init canvas  
        canvas = document.getElementById('carson');
        canvas.setAttribute('width', opts.width);
        canvas.setAttribute('height', opts.height);
        // check for canvas support
        if(!canvas.getContext('2d') || !(context = canvas.getContext('2d'))) {
            return;
        }
        // set context
        context = canvas.getContext('2d');

        function rando(max, rounded) {
            if(rounded) {
                return Math.random()*max>>0;
            } else {
                return Math.random() * max;
            }
        }

        function makeRandomGradient() {
            var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height),
            opacity1 = rando(1, true),
            opacity2 = rando(2, true);
            var c1 = 'rgba(' + rando(255, true)+','+rando(255, true)+','+rando(255, true)+','+opacity1 + ')',
            c2 = 'rgba(' + rando(255, true)+','+rando(255, true)+','+rando(255, true)+','+opacity2 + ')';
            grd.addColorStop(0, c1);
            grd.addColorStop(1, c2);
            context.fillStyle = grd;
            context.fill();
        }

        function makeDoubleLetterOverlay(font, letter, x, y) {
            context.font = font;
            context.fillText(letter, x, y);
            context.font = font;
            context.fillText(letter, x+10, y+10);
        }

        function makeImage() {
            // check for empty array
            if(opts.textures.length === 0) {
                return;
            }
            var img = new Image(),
            src = opts.textures[rando(4, true)];
            if(!src) {
                return;
            }
            img.src = src;
            img.onload = function() {
                var rand = rando(opts.height, true);
                context.drawImage(img, rand, rand, rand/rando(4, true), rand/rando(4, true));
            };
        }

        function makeRandomSquare(factor) {
            context.beginPath();
            context.rect(rando(opts.height, true), rando(opts.height, true), rando(opts.height, true)/factor, rando(opts.width, true)/factor);
            context.fill();
        }

        function addRandomPunctation(font) {
            var chars = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', '"', '?', '<', '>', '~', '\\', '|', '/'];
            context.font = rando(200, true)+"pt "+font;
            context.fillText(chars[rando(chars.length, true)], rando(opts.width), rando(opts.height));
            context.rotate((Math.PI) * 120);
        }

        function makeWordClump(sentence) {
            var clump = sentence.split(" ").length/2,
            font = opts.fonts[rando(opts.fonts.length, true)];
            context.font = rando(20, true)+"pt "+font;
            for(var i = 0; i <= clump; i++) {
                // randomize alignment with text blocks
                var align = rando(4, true);
                if(align === 1) {
                    context.textAlign = 'left';
                } else if(align === 2) {
                    context.textAlign = 'center';
                } else if(align === 3) {
                    context.textAlign = 'right';
                } else {
                    context.textAlign = 'justify';
                }
                context.fillStyle = '#444';
                context.fillText(sentence, rando(40*i, true), rando(40*i, true));
                context.fill();
            }
        }

        function makeSteppedComposition(steps, rotate) {
            // creates a series of mini steps of a repeating box
            var x, y = rando(opts.width, true);
            for(var i = 0; i <= steps; i++) {
                context.beginPath();
                var w = rando(2, true),
                direction = rando(1, true);
                if(direction < 0.5) {
                    context.rect((opts.width/8)*(i*2), (opts.width)/rando(opts.width/2, true), w, y);
                } else {
                    context.rect(10*i*2, rando(opts.width/2, true), w, y);
                }
                if(rotate) {
                    context.rotate((Math.PI/180) * -90);
                }
                context.fill();
            }
        }

        function compose(word) {
            var font = opts.fonts[rando(opts.fonts.length, true)] + ', ';
                // randomize font style
                if(rando(1, true) < 1) {
                    if(rando(1, false < 0.5)) {
                        font += 'serif italic';
                    } else {
                        font += 'serif';
                    }
                } else {
                    if(rando(1, false < 0.5)) {
                        font += 'sans-serif italic';
                    } else {
                        font += 'sans-serif';
                    }
                }
                if(rando(1, false) < 0.5) {
                    if(opts.use_colors) {
                        makeRandomGradient();
                    }
                    makeImage();
                    makeRandomSquare(4);
                    makeRandomSquare(8);
                    if(opts.use_stepped_bars) {
                        makeSteppedComposition(10, true);
                        makeSteppedComposition(5, false);
                    }
                }
                var full_font = rando(200, true)+"pt "+font;
                makeDoubleLetterOverlay(full_font, word, rando(opts.width), rando(opts.width));
                context.font = full_font;
                context.fillText(word, rando(opts.width), rando(opts.height));
                context.rotate((Math.PI) * 120);
                addRandomPunctation(font);
            }

            function makeWordComposition(words, split) {
                if(split) {
                    for(var word in words) {
                        if(words[word]) {
                            compose(words[word]);
                        }
                    }
                } else {
                    if(words) {
                        compose(words);
                    }
                }
            }

        // randomize complexity!
        if(opts.use_random_complexity) {
            opts.complexity = rando(4, true);
        }

        // compose based on complexity
        if(opts.complexity === 1) {
            makeWordComposition(opts.text.split(" "), true);
        } else if(opts.complexity == 2) {
            makeWordComposition(opts.text.split(" "), true);
            makeWordClump(opts.text);
        } else if(opts.complexity == 3) {
            makeWordComposition(opts.text, true);
            makeWordComposition(opts.text.split(" "), true);
            makeWordClump(opts.text);

        } else if(opts.complexity == 4) {
            makeWordComposition(opts.text, true);
            makeWordComposition(opts.text.split(" "), true);
            makeWordClump(opts.text);
        }
        return;
    };
})(jQuery);
