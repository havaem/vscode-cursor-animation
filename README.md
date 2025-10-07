# Rainbow Cursor Animation for VS Code

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A lightweight, performant script that creates a beautiful rainbow trail effect following your cursor in VS Code Editor. Modified and enhanced from the Editor Cursor Animation library.

## ✨ Features

-   **🌈 Rainbow Effect**: Dynamic rainbow-colored trail following your cursor
-   **🎨 Auto Color Change**: Colors cycle randomly every second for variety
-   **✏️ Trail Effect**: Smooth, customizable trail with adjustable length
-   **⚡ Performance Optimized**: Uses `requestAnimationFrame` for smooth 60fps animation
-   **🎯 Smart Visibility**: Auto-hides when multiple cursors are active
-   **📐 Responsive**: Adapts to editor resizing and content changes
-   **🛠️ Highly Configurable**: Easy customization through config constants

## 🎨 Color Palette

The script uses a vibrant 5-color palette by default:

| Color   | Hex Code  | Description |
|---------|-----------|-------------|
| White   | `#ffffff` | Clean, bright white |
| Cyan    | `#40fff5` | Electric cyan blue |
| Yellow  | `#ecff40` | Bright lemon yellow |
| Green   | `#63ff40` | Fresh lime green |
| Purple  | `#A052FF` | Rich violet purple |

## ⚙️ Configuration

Customize the animation by modifying the `CONFIG` object at the top of `mouse.js`:

```javascript
const CONFIG = {
	color: COLORS[0],    // Default starting color
	trailLength: 10,     // Number of particles (1-50 recommended)
	size: 10,            // Base size of the effect (5-20 recommended)
};
```

### Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `string` | `COLORS[0]` | Initial color from the COLORS array |
| `trailLength` | `number` | `10` | Number of particles in the trail (affects performance) |
| `size` | `number` | `10` | Base size of the cursor effect in pixels |

### Performance Tuning

The `ANIMATION_CONFIG` object contains advanced settings:

```javascript
const ANIMATION_CONFIG = {
	colorUpdateInterval: 1000,      // Color change frequency (ms)
	particleInterpolationX: 0.41,   // Horizontal smoothness (0-1)
	particleInterpolationY: 0.25,   // Vertical smoothness (0-1)
	sizeRatio: 2.2,                 // Height-to-width ratio
	clearPadding: 10,               // Canvas clear padding (pixels)
	editorCheckInterval: 100,       // Editor polling interval (ms)
};
```

## 🚀 Installation & Usage

### Prerequisites

-   VS Code (any recent version)
-   Custom CSS and JS Loader extension

### Step-by-Step Setup

#### 1. Install the Extension

Open VS Code and install the "Custom CSS and JS Loader" extension:

```
Extensions (Ctrl+Shift+X) → Search "Custom CSS and JS Loader" → Install by be5invis
```

#### 2. Download the Script

Clone this repository or download `mouse.js`:

```bash
git clone https://github.com/havaem/vscode-cursor-animation.git
# Or download mouse.js directly from GitHub
```

#### 3. Configure VS Code Settings

Add the script path to your VS Code settings:

1. Open Settings: `Ctrl+,` (Windows/Linux) or `Cmd+,` (Mac)
2. Search for: `vscode_custom_css.imports`
3. Click "Edit in settings.json"
4. Add the absolute path to `mouse.js`:

```json
{
    "vscode_custom_css.imports": [
        "file:///absolute/path/to/mouse.js"
    ]
}
```

**Example paths:**
- Windows: `"file:///C:/Users/YourName/vscode-cursor-animation/mouse.js"`
- macOS: `"file:///Users/YourName/vscode-cursor-animation/mouse.js"`
- Linux: `"file:///home/yourname/vscode-cursor-animation/mouse.js"`

#### 4. Enable Custom CSS

1. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: `Enable Custom CSS and JS`
3. Press Enter
4. Restart VS Code when prompted

#### 5. Verify Installation

1. Open Developer Tools: `Help → Toggle Developer Tools` or press `F12`
2. Check Console for: `[CursorAnimation] Rainbow Cursor Animation is ready!`
3. Move your cursor in the editor to see the rainbow trail!

### Troubleshooting Installation

If the animation doesn't work:

1. **Check file path**: Ensure the path uses forward slashes (`/`) and starts with `file:///`
2. **Reload Window**: Try `Developer: Reload Window` from Command Palette
3. **Check Console**: Look for error messages in Developer Tools (F12)
4. **Permissions**: Ensure the file is readable and not blocked by antivirus

## 🎯 How It Works

The animation system consists of several key components:

### Architecture

1. **🔍 Editor Detection**: Automatically waits for VS Code editor to load
2. **🎨 Canvas Overlay**: Creates a transparent canvas layer over the editor
3. **👁️ Cursor Tracking**: Monitors cursor position changes in real-time
4. **✨ Particle System**: Maintains a trail of particles following the cursor
5. **🎭 Color Animation**: Cycles through colors using `requestAnimationFrame`
6. **👀 Visibility Management**: Hides trail when multiple cursors are active
7. **🔄 Auto-cleanup**: Clears canvas on content changes for optimal performance

### Technical Details

-   **Animation Loop**: Uses `requestAnimationFrame` for 60fps smooth animation
-   **Optimized Clearing**: Only clears canvas regions that changed (bounding box)
-   **Particle Interpolation**: Smooth particle movement using interpolation factors
-   **Responsive Resizing**: Adapts to editor size changes using ResizeObserver
-   **Content Observation**: Uses MutationObserver to detect content changes

## 🔧 Advanced Customization

### Custom Color Palette

Replace the default colors with your own:

```javascript
const COLORS = [
    "#ff0000",  // Red
    "#00ff00",  // Green
    "#0000ff",  // Blue
    "#ffff00",  // Yellow
    "#ff00ff",  // Magenta
];
```

**Gradient ideas:**
- **Fire**: `["#ff0000", "#ff4500", "#ff8c00", "#ffa500", "#ffff00"]`
- **Ocean**: `["#000080", "#0000cd", "#1e90ff", "#00bfff", "#87ceeb"]`
- **Sunset**: `["#ff69b4", "#ff1493", "#ff4500", "#ff6347", "#ffa500"]`
- **Matrix**: `["#00ff00", "#00cc00", "#009900", "#006600", "#003300"]`

### Adjust Color Change Speed

Modify how frequently colors change:

```javascript
const ANIMATION_CONFIG = {
    colorUpdateInterval: 2000,  // Change every 2 seconds (default: 1000)
    // ... other settings
};
```

### Single Static Color

For a fixed color trail instead of rainbow:

```javascript
// Option 1: Disable color changes by setting a high interval
const ANIMATION_CONFIG = {
    colorUpdateInterval: 999999999,  // Essentially never
    // ... other settings
};

// Option 2: Use only one color
const COLORS = ["#A052FF"];  // Purple only
```

### Trail Length Customization

Adjust the trail for different effects:

```javascript
const CONFIG = {
    trailLength: 5,   // Short, snappy trail
    // trailLength: 15,  // Long, flowing trail
    // trailLength: 30,  // Very long, dramatic trail (may impact performance)
    // ... other settings
};
```

### Size Adjustments

Change the thickness of the trail:

```javascript
const CONFIG = {
    size: 5,   // Thin trail
    // size: 15,  // Thick trail
    // size: 20,  // Very thick trail
    // ... other settings
};
```

### Performance Optimization

For lower-end machines:

```javascript
const CONFIG = {
    trailLength: 5,   // Fewer particles
    size: 8,          // Smaller size
};

const ANIMATION_CONFIG = {
    colorUpdateInterval: 2000,      // Less frequent updates
    clearPadding: 5,                // Smaller clear region
    // ... other settings
};
```

## 🐛 Troubleshooting

### Common Issues

#### Animation Not Appearing

**Symptoms**: No trail effect visible when moving cursor

**Solutions**:
1. Open Developer Tools (`F12`) and check Console for errors
2. Verify the file path in settings is correct (use forward slashes `/`)
3. Ensure "Custom CSS and JS" is enabled (check Command Palette)
4. Try `Developer: Reload Window` from Command Palette
5. Check that `mouse.js` file exists and is readable

#### Laggy or Slow Performance

**Symptoms**: Animation stutters or causes VS Code to slow down

**Solutions**:
1. Reduce `trailLength` value (try 5-7 instead of 10)
2. Reduce `size` value (try 5-8 instead of 10)
3. Increase `colorUpdateInterval` to reduce color changes
4. Close unused editor groups/panels
5. Update VS Code and graphics drivers

#### Trail Appears in Wrong Location

**Symptoms**: Trail doesn't follow cursor correctly

**Solutions**:
1. Reload the window: `Developer: Reload Window`
2. Check if VS Code UI is zoomed (affects positioning)
3. Verify no other cursor extensions are conflicting
4. Try closing and reopening the file

#### Colors Not Changing

**Symptoms**: Trail stays the same color

**Solutions**:
1. Check Developer Console for JavaScript errors
2. Verify `COLORS` array has multiple colors
3. Ensure `colorUpdateInterval` isn't set too high
4. Try clearing browser cache and reloading

#### Not Working After VS Code Update

**Symptoms**: Worked before, stopped after updating VS Code

**Solutions**:
1. Re-enable Custom CSS: `Enable Custom CSS and JS` from Command Palette
2. Reinstall "Custom CSS and JS Loader" extension
3. Check for extension updates
4. Verify file path hasn't changed

### Debug Mode

To get more information about what's happening:

1. Open Developer Tools: `Help → Toggle Developer Tools` (F12)
2. Go to Console tab
3. Look for messages starting with `[CursorAnimation]`
4. Check for any red error messages

### Getting Help

If issues persist:

1. Check [existing issues](https://github.com/havaem/vscode-cursor-animation/issues)
2. Create a new issue with:
   - VS Code version
   - Operating system
   - Console error messages
   - Steps to reproduce

## 📝 Console Messages

The script provides helpful console messages:

| Message | Meaning |
|---------|---------|
| `[CursorAnimation] Rainbow Cursor Animation is ready!` | ✅ Successfully loaded and running |
| `[CursorAnimation] Canvas element is required` | ❌ Failed to create canvas |
| `[CursorAnimation] Failed to get 2D context from canvas` | ❌ Canvas initialization failed |
| `[CursorAnimation] Failed to find VS Code editor element` | ❌ Could not locate editor after 100 retries |

## 🎪 Demo & Visual Examples

When running successfully, you will see:

-   ✨ Smooth cursor trail with rainbow-colored particles
-   🌈 Colors cycling through the palette automatically
-   💫 Trail that smoothly follows cursor movement
-   🎯 Trail disappears when multiple cursors are active
-   🔄 Automatic cleanup on content changes

### Expected Behavior

- **Single Cursor**: Trail is visible and follows your cursor
- **Multiple Cursors**: Trail hides automatically (performance optimization)
- **Content Changes**: Canvas clears and redraws smoothly
- **Window Resize**: Trail adapts to new editor dimensions

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Development setup
- Code style guidelines
- Testing procedures
- How to submit pull requests

## 📊 Performance

The animation is designed to be lightweight and performant:

- **Frame Rate**: Targets 60fps using `requestAnimationFrame`
- **Memory**: ~1-2MB additional memory usage
- **CPU**: Minimal impact (~1-2% on modern CPUs)
- **Optimization**: Only redraws changed canvas regions

### Performance Tips

- Keep `trailLength` under 20 for best performance
- Use `size` values between 5-15
- On slower machines, reduce both values
- Disable when not needed for maximum performance

## 🔒 Security & Privacy

This script:

- ✅ Only reads cursor positions from VS Code DOM
- ✅ Runs entirely locally in VS Code
- ✅ Does not collect or send any data
- ✅ Does not modify your code or files
- ✅ Open source and auditable

## 📦 API Documentation

For developers who want to extend or modify the script:

### Functions

See [JSDoc comments](mouse.js) in the source code for detailed API documentation.

Key functions:
- `createTrail(options)` - Creates trail animation system
- `createCursorHandler(handlerFunctions)` - Manages cursor tracking

## 🗺️ Roadmap

Potential future enhancements:

- [ ] Multiple trail effect styles (dotted, dashed, gradient)
- [ ] Configurable trail fade-out effect
- [ ] Support for custom particle shapes
- [ ] Settings UI panel
- [ ] Preset color themes
- [ ] Performance monitoring dashboard

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

This project is modified from the [Editor Cursor Animation](https://marketplace.visualstudio.com/items?itemName=zykowal.editor-cursor-animation) extension.

## 🙏 Acknowledgments

- Original Editor Cursor Animation extension by zykowal
- Custom CSS and JS Loader extension by be5invis
- VS Code community for inspiration

## 📧 Contact

**Author**: havaem

- GitHub: [@havaem](https://github.com/havaem)
- Repository: [vscode-cursor-animation](https://github.com/havaem/vscode-cursor-animation)

---

**Made with ❤️ by havaem** | **Star ⭐ this repo if you find it useful!**
