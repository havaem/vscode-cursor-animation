# Configuration Examples

This directory contains various configuration examples you can use to customize your cursor animation.

## How to Use

1. Choose a configuration example below
2. Copy the configuration into your `mouse.js` file
3. Reload VS Code to see the changes

## Available Examples

### Fire Theme
Hot, fiery trail effect with warm colors.

```javascript
const COLORS = ["#ff0000", "#ff4500", "#ff8c00", "#ffa500", "#ffff00"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 15,
	size: 12,
};
```

### Ocean Theme
Cool, calm ocean-inspired colors.

```javascript
const COLORS = ["#000080", "#0000cd", "#1e90ff", "#00bfff", "#87ceeb"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 12,
	size: 10,
};
```

### Matrix Theme
Green matrix-style effect.

```javascript
const COLORS = ["#00ff00", "#00cc00", "#009900", "#006600", "#003300"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 20,
	size: 8,
};
const ANIMATION_CONFIG = {
	colorUpdateInterval: 500,  // Fast color changes
	particleInterpolationX: 0.41,
	particleInterpolationY: 0.25,
	sizeRatio: 2.2,
	clearPadding: 10,
	editorCheckInterval: 100,
};
```

### Sunset Theme
Warm sunset gradient colors.

```javascript
const COLORS = ["#ff69b4", "#ff1493", "#ff4500", "#ff6347", "#ffa500"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 10,
	size: 15,
};
```

### Minimalist Theme
Single color, short trail for minimal distraction.

```javascript
const COLORS = ["#808080"];  // Gray
const CONFIG = {
	color: COLORS[0],
	trailLength: 5,
	size: 8,
};
const ANIMATION_CONFIG = {
	colorUpdateInterval: 999999999,  // Never change color
	particleInterpolationX: 0.41,
	particleInterpolationY: 0.25,
	sizeRatio: 2.2,
	clearPadding: 10,
	editorCheckInterval: 100,
};
```

### Cosmic Theme
Purple and blue cosmic colors.

```javascript
const COLORS = ["#9b59b6", "#8e44ad", "#3498db", "#2980b9", "#1abc9c"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 18,
	size: 12,
};
```

### Retro Theme
Neon retro colors.

```javascript
const COLORS = ["#ff006e", "#fb5607", "#ffbe0b", "#8338ec", "#3a86ff"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 12,
	size: 10,
};
```

### Performance Mode
Optimized for lower-end machines.

```javascript
const COLORS = ["#40fff5", "#A052FF"];  // Only 2 colors
const CONFIG = {
	color: COLORS[0],
	trailLength: 5,   // Shorter trail
	size: 8,          // Smaller size
};
const ANIMATION_CONFIG = {
	colorUpdateInterval: 2000,  // Less frequent updates
	particleInterpolationX: 0.41,
	particleInterpolationY: 0.25,
	sizeRatio: 2.2,
	clearPadding: 5,  // Smaller clear region
	editorCheckInterval: 100,
};
```

### Drama Mode
Maximum visual impact with long, thick trail.

```javascript
const COLORS = ["#ffffff", "#ff0080", "#ff00ff", "#8000ff", "#0080ff", "#00ffff"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 30,  // Very long trail
	size: 20,         // Very thick
};
```

## Creating Your Own

Mix and match these settings:

1. **COLORS**: Choose 1-10 hex color codes
2. **trailLength**: 1-50 (recommended 5-20 for best performance)
3. **size**: 1-50 (recommended 5-20 for best appearance)
4. **colorUpdateInterval**: 100-5000ms (1000 = 1 second)

### Color Palette Resources

- [Coolors.co](https://coolors.co/) - Color palette generator
- [Color Hunt](https://colorhunt.co/) - Color palette inspiration
- [Adobe Color](https://color.adobe.com/) - Advanced color tools
