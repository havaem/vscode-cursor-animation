# Quick Reference Guide

A quick cheat sheet for common tasks with VS Code Cursor Animation.

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/havaem/vscode-cursor-animation.git

# 2. Install dependencies (optional, for development)
npm install

# 3. Add to VS Code settings
{
  "vscode_custom_css.imports": [
    "file:///path/to/mouse.js"
  ]
}

# 4. Enable in VS Code
Ctrl+Shift+P → "Enable Custom CSS and JS" → Restart
```

## ⚙️ Common Configurations

### Change Trail Length
```javascript
const CONFIG = {
  trailLength: 15,  // Longer trail
  // ...
};
```

### Change Colors
```javascript
const COLORS = ["#ff0000", "#00ff00", "#0000ff"];  // Red, Green, Blue
```

### Change Size
```javascript
const CONFIG = {
  size: 15,  // Larger size
  // ...
};
```

### Change Color Speed
```javascript
const ANIMATION_CONFIG = {
  colorUpdateInterval: 2000,  // Every 2 seconds
  // ...
};
```

## 🔧 npm Commands

```bash
npm run lint         # Check code quality
npm run lint:fix     # Fix linting issues automatically
npm run validate     # Validate configuration
```

## 🐛 Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Animation not showing | Check console (F12), verify file path |
| Laggy performance | Reduce `trailLength` to 5-7 |
| Colors not changing | Check `COLORS` array has multiple values |
| After VS Code update | Re-enable Custom CSS in Command Palette |

## 📝 Console Messages

```javascript
// Success
"[CursorAnimation] Rainbow Cursor Animation is ready!"

// Errors
"[CursorAnimation] Canvas element is required"
"[CursorAnimation] Failed to get 2D context from canvas"
"[CursorAnimation] Failed to find VS Code editor element"
```

## 📚 Quick Links

- [Full Documentation](README.md)
- [FAQ](FAQ.md)
- [Configuration Examples](examples/README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## 🎨 Popular Themes

```javascript
// Fire Theme
const COLORS = ["#ff0000", "#ff4500", "#ff8c00", "#ffa500", "#ffff00"];

// Ocean Theme
const COLORS = ["#000080", "#0000cd", "#1e90ff", "#00bfff", "#87ceeb"];

// Matrix Theme
const COLORS = ["#00ff00", "#00cc00", "#009900", "#006600", "#003300"];

// Minimalist (Single Color)
const COLORS = ["#A052FF"];
const ANIMATION_CONFIG = { colorUpdateInterval: 999999999, ... };
```

## 🔍 File Paths Examples

```json
// Windows
"file:///C:/Users/YourName/vscode-cursor-animation/mouse.js"

// macOS
"file:///Users/YourName/vscode-cursor-animation/mouse.js"

// Linux
"file:///home/yourname/vscode-cursor-animation/mouse.js"
```

## ⌨️ VS Code Commands

```
Ctrl+Shift+P           Open Command Palette
F12                    Open Developer Tools
Ctrl+,                 Open Settings
Ctrl+Shift+X           Open Extensions
Developer: Reload Window    Reload VS Code
Enable Custom CSS and JS    Enable the extension
```

## 📊 Performance Tuning

```javascript
// For slower machines
const CONFIG = {
  trailLength: 5,
  size: 8,
};

const ANIMATION_CONFIG = {
  colorUpdateInterval: 2000,
  clearPadding: 5,
  // ...
};

// For maximum visual impact
const CONFIG = {
  trailLength: 30,
  size: 20,
};
```

## 🆘 Getting Help

1. Check [FAQ.md](FAQ.md)
2. Search [existing issues](https://github.com/havaem/vscode-cursor-animation/issues)
3. Create new issue with bug report template
4. Include console output from Developer Tools (F12)

---

**Quick Tips:**
- Always use absolute paths starting with `file:///`
- Reload window after config changes
- Check console for errors
- Reduce trail length if laggy
- Use `npm run validate` to check config
