# Frequently Asked Questions (FAQ)

## General Questions

### What is VS Code Cursor Animation?
VS Code Cursor Animation is a JavaScript script that creates a beautiful rainbow trail effect following your cursor in VS Code. It uses HTML5 Canvas to render smooth, colorful animations as you type and navigate.

### Is it free?
Yes! This project is completely free and open source under the MIT License.

### Does it affect VS Code performance?
The animation is highly optimized and uses `requestAnimationFrame` for smooth 60fps performance. On modern machines, you'll typically see only 1-2% CPU usage. If you experience lag, try reducing the `trailLength` or `size` values.

### Will it work with other editors?
No, this script is specifically designed for VS Code's DOM structure. It may not work correctly in other editors.

## Installation & Setup

### Where do I put the mouse.js file?
You can place it anywhere on your computer. Just make sure to use the absolute path in your VS Code settings. Common locations:
- Windows: `C:\Users\YourName\vscode-cursor-animation\mouse.js`
- macOS: `/Users/YourName/vscode-cursor-animation/mouse.js`
- Linux: `/home/yourname/vscode-cursor-animation/mouse.js`

### The animation isn't showing up, what should I do?
1. Check Developer Tools (F12) for error messages
2. Verify your file path uses forward slashes (`/`) and starts with `file:///`
3. Make sure "Custom CSS and JS" is enabled (Command Palette → "Enable Custom CSS and JS")
4. Try reloading the window (Command Palette → "Developer: Reload Window")
5. Verify the file exists and is readable

### Do I need to restart VS Code after changing settings?
Yes, after changing the configuration in `mouse.js`, you need to:
1. Save the file
2. Reload VS Code window (Command Palette → "Developer: Reload Window")

### Can I use this without the Custom CSS and JS Loader extension?
No, the Custom CSS and JS Loader extension is required to load external JavaScript files into VS Code.

## Customization

### How do I change the colors?
Edit the `COLORS` array at the top of `mouse.js`:
```javascript
const COLORS = ["#ff0000", "#00ff00", "#0000ff"];  // Your colors here
```

### How do I make the trail longer or shorter?
Change the `trailLength` value in the `CONFIG` object:
```javascript
const CONFIG = {
    trailLength: 15,  // Increase for longer trail
    // ...
};
```

### Can I use just one color instead of rainbow?
Yes! Set only one color in the COLORS array:
```javascript
const COLORS = ["#A052FF"];  // Purple only
```

### How do I make it slower or faster?
Adjust the `colorUpdateInterval` in `ANIMATION_CONFIG`:
```javascript
const ANIMATION_CONFIG = {
    colorUpdateInterval: 2000,  // 2 seconds (slower)
    // colorUpdateInterval: 500,  // 0.5 seconds (faster)
    // ...
};
```

### Can I make the trail thicker or thinner?
Yes, adjust the `size` value:
```javascript
const CONFIG = {
    size: 15,  // Thicker trail
    // size: 5,   // Thinner trail
    // ...
};
```

## Troubleshooting

### The trail appears in the wrong location
Try these solutions:
1. Reload the window
2. Check if VS Code is zoomed (Ctrl+0 to reset zoom)
3. Restart VS Code completely
4. Verify no other cursor extensions are installed

### Colors aren't changing
1. Check the console for errors (F12)
2. Make sure you have multiple colors in the `COLORS` array
3. Verify `colorUpdateInterval` isn't set extremely high

### Animation is laggy
Performance optimization steps:
1. Reduce `trailLength` to 5-7
2. Reduce `size` to 8
3. Increase `colorUpdateInterval` to 2000
4. Close unused editor groups
5. Update your graphics drivers

### Trail disappears when I use multiple cursors
This is intentional behavior to maintain performance. The animation automatically hides when multiple cursors are detected and shows again when you return to a single cursor.

### After VS Code update, the animation stopped working
1. Open Command Palette (Ctrl+Shift+P)
2. Type "Enable Custom CSS and JS"
3. Select and run the command
4. Restart VS Code

### Can I disable the animation temporarily?
Yes, several ways:
1. Disable the "Custom CSS and JS Loader" extension
2. Comment out the file path in settings
3. Remove the script path from `vscode_custom_css.imports`

## Technical Questions

### What technologies does it use?
- HTML5 Canvas for rendering
- `requestAnimationFrame` for smooth animation
- MutationObserver for detecting content changes
- ResizeObserver for responsive sizing

### Does it modify my code files?
No! The animation only renders on a canvas overlay. It never touches your actual code files.

### Does it send data anywhere?
No, absolutely not. The script runs entirely locally in VS Code and doesn't collect or send any data.

### Can I contribute to the project?
Yes! We welcome contributions. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How is performance optimized?
- Only redraws changed canvas regions (bounding box)
- Uses `requestAnimationFrame` instead of `setInterval`
- Caches frequently accessed values
- Auto-hides on multiple cursors
- Debounced content change handling

## Advanced Usage

### Can I animate multiple cursors?
Not currently. The animation hides automatically with multiple cursors to maintain performance. This is by design.

### Can I add my own particle shapes?
The current implementation uses line-based rendering. Modifying this would require changes to the `drawPath()` function in `mouse.js`.

### Can I make the trail fade out?
The current implementation doesn't support fade-out, but this could be added by modifying the opacity calculations in `drawPath()`.

### How do I debug issues?
1. Open Developer Tools (Help → Toggle Developer Tools)
2. Go to Console tab
3. Look for messages starting with `[CursorAnimation]`
4. Check for any red error messages
5. Try adding `console.log()` statements to `mouse.js` for debugging

## Getting Help

### Where can I get support?
- Check this FAQ first
- Read the [README.md](README.md) documentation
- Look through [existing issues](https://github.com/havaem/vscode-cursor-animation/issues)
- Create a new issue with details about your problem

### How do I report a bug?
Use the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- VS Code version
- Operating system
- Console error messages
- Steps to reproduce

### How do I request a feature?
Use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and describe:
- What you want
- Why it would be useful
- How it might work

---

**Still have questions?** Open an issue on [GitHub](https://github.com/havaem/vscode-cursor-animation/issues)!
