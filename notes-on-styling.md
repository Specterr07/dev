# Landing Page
    we have a landing page with:
1. Navbar (Responsive)
2. Hero Section (Grid Layout)
3. Code Feature (Transforms)
4. Bento Grid (Cards)

## Hero Section Styling

What you just learned (Responsive Design):
Look at the main container line: `<main class="... grid md:grid-cols-2 ...">`

`grid`: This turns on the Grid engine. By default (mobile), it has 1 column. Everything stacks vertically.

`md:grid-cols-2`: This is the Responsive Prefix Strategy.

`md`: means "On Medium screens (like tablets/laptops) and larger..."

`grid-cols-2` means "...switch to 2 columns."

Try resizing your browser window narrower and wider. You will see the layout snap from stacked (mobile) to side-by-side (desktop) automatically.

`gap-12`: Adds consistent space between the columns so they don't touch.

`space-y-6` (on the Left Column div): This is a magical utility. It says "Put margin-top on every child element except the first one." It evenly spaces out your H1, Paragraph, and Buttons without you needing to add margin-bottom to every single tag.

### Code Card of Hero Section

> The hover effect it actually very low effort but is super coool.

 Learned hover rotate effect:
1. `-rotate-1 hover:rotate-0`: This is the Interaction Strategy.

- `-rotate-1`: Tilts the card slightly (1 degree) to the left. It makes the site feel "organic" and less boxy.

- `hover:rotate-0`: When your mouse touches it, it snaps straight. This tiny animation makes the site feel alive.

- `transition duration-500`: Makes that snap take 0.5 seconds, so it's smooth, not jerky.

2. `shadow-2xl`: Adds a deep shadow behind the card to make it "float" above the white background.

3. `font-mono`: Switches the text to a Monospace font (like Courier New), which is standard for code.

4. `<pre>` html tag is used to preserve all the spacing and show text as it is.

5. `<code>` tag is used to show code.

6. `<span>` tag inside the code are used to give css style to them and give syntax colour.

## Cards Section

This is the standard formula for making any "Card" in Tailwind:

1. `p-8`: "Padding 8" (2rem). This gives the text room to breathe inside the box. Never let text touch the borders!

2. `rounded-2xl`: Adds heavy rounding to the corners. Modern design prefers soft curves over sharp squares.

3. `border border-orange-100`: This is the Subtle Border Strategy.

4. A white card on a white background is invisible.

5. A black border is too harsh.

6. A very light colored border (like orange-100 or slate-100) creates a boundary that you "feel" rather than see.

7. `bg-orange-50`: This is a "Tint". It's the lightest possible version of orange. It highlights the first card as "special" without being blindingly bright.

## Footer

The Divider Strategy:

1. `border-t border-slate-200`: Instead of using a <hr> tag (which can be hard to style), we just add a "Top Border" to the footer itself.

2. `border-t`: Adds a 1px line to the top.

3. `border-slate-200`: Colors it very lightly so it separates the content without being ugly.

4. `mt-20`: "Margin Top 20" (5rem). This pushes the footer away from your Bento Grid. Never let your footer cramp your content. White space is luxury.

5. `text-slate-400 vs text-slate-500`: Notice the links are lighter (400) than the copyright (500)? This is Visual Hierarchy. You make less important things lighter so they don't distract the user, but darken them on hover so they are usable.

## Most of the Div

Most div are Structured with `<h1>`, then `<p>` or `<h3>`, then `<p>`.

check [diagram-on-styling](diagram-on-styling.excalidraw).





