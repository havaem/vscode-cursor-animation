# Rainbow Cursor Animation for VS Code

A script that creates a rainbow trail effect following the cursor in VS Code Editor, modified from the Editor Cursor Animation library.

## 🌈 Features

-   **Rainbow Effect**: Cursor will have a rainbow-colored trail following it
-   **Auto Color Change**: Colors change randomly every second
-   **Trail Effect**: Creates a trail following the cursor with customizable length
-   **VS Code Compatible**: Specifically designed for VS Code Editor

## 🎨 Color Palette

The script uses 5 primary colors:

-   `#ffffff` (White)
-   `#40fff5` (Cyan)
-   `#ecff40` (Yellow)
-   `#63ff40` (Green)
-   `#A052FF` (Purple)

## ⚙️ Configuration

You can customize the parameters in the `CONFIG` section:

```javascript
const CONFIG = {
	color: COLORS[0], // Default color
	trailLength: 10, // Trail length (particles count)
	size: 10, // Effect size
};
```

### Adjustable Parameters:

-   **trailLength**: Length of the trail following the cursor (default: 10)
-   **size**: Size of the effect (default: 10)
-   **color**: Default color from COLORS array

## 🚀 How to Use

### Using Custom CSS and JS Loader Extension

1. **Install Extension**:

    - Open VS Code Extensions (`Ctrl+Shift+X`)
    - Search for "Custom CSS and JS Loader"
    - Install the extension by "be5invis"

2. **Add Script Path**:

    - Open VS Code Settings (`Ctrl+,`)
    - Search for "vscode_custom_css.imports"
    - Add the absolute path to your `mouse.js` file:

    ```json
    "vscode_custom_css.imports": [
        "file:///d:/vscode-css-js/mouse.js"
    ]
    ```

3. **Enable Custom CSS**:

    - Open Command Palette (`Ctrl+Shift+P`)
    - Type "Enable Custom CSS and JS"
    - Select and execute the command
    - Restart VS Code when prompted

4. **Verify Installation**:
    - Check the console (`F12`) for the message: "Rainbow Cursor Animation is ready!"

## 🎯 How It Works

The script will:

1. **Auto-start** when VS Code Editor loads
2. **Create canvas** overlay on the editor
3. **Track cursor** and create trail effects
4. **Change colors** randomly every second
5. **Auto hide/show** when multiple cursors are present or cursor is hidden

## 🔧 Advanced Customization

### Change Colors:

```javascript
const COLORS = ["#ff0000", "#00ff00", "#0000ff"]; // Add custom colors
```

### Adjust Color Change Speed:

```javascript
window.setInterval(() => {
	// Color change logic
}, 2000); // Change from 1000ms to 2000ms
```

### Customize Effects:

```javascript
const trail = createTrail({
	length: 15, // Increase trail length
	color: "#ff0000", // Fixed color
	size: 15, // Increase size
	canvas: canvas,
});
```

## 🐛 Troubleshooting

-   **Cursor not appearing**: Check Console for error messages
-   **Laggy effects**: Reduce `trailLength` or `size` values
-   **Not working**: Ensure VS Code Editor is fully loaded and extension is properly enabled

## 📝 Console Messages

The script will display messages:

-   `Rainbow Cursor Animation is ready!` - When successfully started
-   Error messages if cursor element is not found

## 🎪 Demo

When running successfully, you will see:

-   Cursor with rainbow-colored trail effect
-   Colors changing continuously
-   Smooth effects when moving the cursor

## 📄 License

Modified from Editor Cursor Animation extension for VS Code.

---

_Fork from [Editor Cursor Animation](https://marketplace.visualstudio.com/items?itemName=zykowal.editor-cursor-animation)_
_Created by: havaem_
