/**
 * Rainbow Cursor Animation for VS Code
 * Creates a rainbow trail effect following the cursor in VS Code Editor
 * @author havaem
 * @version 1.0.0
 */

/**
 * Validates configuration values and logs warnings for invalid settings
 * @param {Object} config - Configuration object to validate
 * @returns {boolean} True if configuration is valid
 */
function validateConfig(config) {
	let isValid = true;
	
	if (config.trailLength < 1 || config.trailLength > 100) {
		console.warn("[CursorAnimation] trailLength should be between 1 and 100. Current value:", config.trailLength);
		isValid = false;
	}
	
	if (config.size < 1 || config.size > 50) {
		console.warn("[CursorAnimation] size should be between 1 and 50. Current value:", config.size);
		isValid = false;
	}
	
	return isValid;
}

/**
 * Color palette for rainbow effect
 * @type {string[]}
 */
const COLORS = ["#ffffff", "#40fff5", "#ecff40", "#63ff40", "#A052FF"];

/**
 * User-configurable settings
 * @type {Object}
 * @property {string} color - Default color from COLORS array
 * @property {number} trailLength - Length of the trail following the cursor
 * @property {number} size - Size of the cursor effect
 */
const CONFIG = {
	color: COLORS[0],
	trailLength: 10,
	size: 10,
};

/**
 * Internal animation configuration constants
 * @type {Object}
 * @property {number} colorUpdateInterval - Interval for color updates in milliseconds
 * @property {number} particleInterpolationX - Horizontal interpolation factor for particle movement
 * @property {number} particleInterpolationY - Vertical interpolation factor for particle movement
 * @property {number} sizeRatio - Aspect ratio for cursor size
 * @property {number} clearPadding - Padding for canvas clear operations
 * @property {number} editorCheckInterval - Interval for checking editor availability in milliseconds
 */
const ANIMATION_CONFIG = {
	colorUpdateInterval: 1000,
	particleInterpolationX: 0.41,
	particleInterpolationY: 0.25,
	sizeRatio: 2.2,
	clearPadding: 10,
	editorCheckInterval: 100,
};

/**
 * Creates a trail effect for the cursor
 * @param {Object} options - Configuration options
 * @param {number} [options.length=8] - Number of particles in the trail
 * @param {string} [options.color] - Initial color for particles
 * @param {number} [options.size=3] - Size of the cursor effect
 * @param {HTMLCanvasElement} options.canvas - Canvas element for rendering
 * @returns {Object} Trail controller with update methods
 */
const createTrail = (options) => {
	const totalParticles = options?.length || 8;
	let particlesColor = options?.color || COLORS[0];
	const canvas = options?.canvas;
	
	// Validate canvas
	if (!canvas) {
		console.error("[CursorAnimation] Canvas element is required");
		return null;
	}
	
	const context = canvas.getContext("2d");
	if (!context) {
		console.error("[CursorAnimation] Failed to get 2D context from canvas");
		return null;
	}
	
	const cursor = { x: 0, y: 0 };
	const particles = [];
	let width, height;
	let sizeX = options?.size || 3;
	let sizeY = sizeX * ANIMATION_CONFIG.sizeRatio;
	let cursorsInitted = false;
	let colorUpdateTimeoutId = null;
	let lastColorUpdate = 0;

	/**
	 * Updates cursor colors using requestAnimationFrame for smooth animation
	 * Changes colors at intervals specified by ANIMATION_CONFIG.colorUpdateInterval
	 */
	const updateCursorColors = () => {
		const now = Date.now();
		if (now - lastColorUpdate < ANIMATION_CONFIG.colorUpdateInterval) {
			colorUpdateTimeoutId = requestAnimationFrame(updateCursorColors);
			return;
		}
		lastColorUpdate = now;

		const cursorElements = document.querySelectorAll(".cursor");
		if (cursorElements.length > 0) {
			const newIndex = Math.floor(Math.random() * COLORS.length);
			const color = COLORS[newIndex];
			particlesColor = color;

			for (const cursorElement of cursorElements) {
				if (cursorElement) {
					cursorElement.style.backgroundColor = color;
					cursorElement.style.boxShadow = `0 0 12px ${color}`;
					cursorElement.style.borderRadius = "1px";
				}
			}
		}
		colorUpdateTimeoutId = requestAnimationFrame(updateCursorColors);
	};
	colorUpdateTimeoutId = requestAnimationFrame(updateCursorColors);

	/**
	 * Updates the canvas size
	 * @param {number} x - New width
	 * @param {number} y - New height
	 */
	function updateSize(x, y) {
		if (width === x && height === y) return; // Skip if unchanged
		width = x;
		height = y;
		canvas.width = x;
		canvas.height = y;
	}

	/**
	 * Moves the cursor to a new position
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 */
	function move(x, y) {
		x += sizeX / 2;
		cursor.x = x;
		cursor.y = y;
		if (!cursorsInitted) {
			cursorsInitted = true;
			for (let i = 0; i < totalParticles; i++) {
				addParticle(x, y);
			}
		}
	}

	/**
	 * Represents a particle in the trail effect
	 */
	class Particle {
		/**
		 * Creates a new particle
		 * @param {number} x - Initial X position
		 * @param {number} y - Initial Y position
		 */
		constructor (x, y) {
			this.position = { x, y };
		}
	}

	/**
	 * Adds a new particle to the trail
	 * @param {number} x - X position
	 * @param {number} y - Y position
	 */
	function addParticle(x, y) {
		particles.push(new Particle(x, y));
	}

	/**
	 * Calculates and updates particle positions based on cursor movement
	 * Uses interpolation for smooth trail animation
	 */
	function calculatePosition() {
		let x = cursor.x;
		let y = cursor.y;

		const particleCount = particles.length;
		const interpX = ANIMATION_CONFIG.particleInterpolationX;
		const interpY = ANIMATION_CONFIG.particleInterpolationY;
		
		for (let i = 0; i < particleCount; i++) {
			const nextParticlePos = (particles[i + 1] || particles[0]).position;
			const particlePos = particles[i].position;

			particlePos.x = x;
			particlePos.y = y;

			x += (nextParticlePos.x - particlePos.x) * interpX;
			y += (nextParticlePos.y - particlePos.y) * interpY;
		}
	}

	/**
	 * Renders the trail path on the canvas
	 * Creates a gradient effect based on distance from cursor
	 */
	function drawPath() {
		context.beginPath();
		context.fillStyle = particlesColor;
		context.globalAlpha = 1.0;

		// Cache values used in loop to avoid repeated calculations
		const maxDistance = Math.sqrt(width * width + height * height);
		const minSize = Math.min(sizeX, sizeY);
		const cursorX = cursor.x;
		const cursorY = cursor.y;

		// Draw the main trail path
		for (let particleIndex = 0; particleIndex < totalParticles; particleIndex++) {
			const pos = particles[particleIndex].position;
			const dx = cursorX - pos.x;
			const dy = cursorY - pos.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const sizeFactor = 1 - distance / maxDistance;

			context.lineWidth = minSize * sizeFactor;

			if (particleIndex === 0) {
				context.moveTo(pos.x, pos.y);
			} else {
				context.lineTo(pos.x, pos.y);
			}
		}
		
		// Create closed path by drawing back along the bottom edge
		for (let particleIndex = totalParticles - 1; particleIndex >= 0; particleIndex--) {
			const pos = particles[particleIndex].position;
			context.lineTo(pos.x, pos.y + sizeY);
		}
		context.closePath();
		context.fill();

		// Draw center stroke for enhanced visibility
		context.beginPath();
		context.lineJoin = "round";
		context.strokeStyle = particlesColor;
		context.lineWidth = minSize;
		const offset = -sizeX / 2 + sizeY / 2;
		for (let particleIndex = 0; particleIndex < totalParticles; particleIndex++) {
			const pos = particles[particleIndex].position;
			if (particleIndex === 0) {
				context.moveTo(pos.x, pos.y + offset);
			} else {
				context.lineTo(pos.x, pos.y + offset);
			}
		}
		context.stroke();
	}

	let lastMinX = Infinity,
		lastMinY = Infinity,
		lastMaxX = -Infinity,
		lastMaxY = -Infinity;

	/**
	 * Updates particle positions and redraws the trail
	 * Optimizes canvas clearing by only clearing affected areas
	 */
	function updateParticles() {
		if (!cursorsInitted) return;

		let minX = Infinity;
		let minY = Infinity;
		let maxX = -Infinity;
		let maxY = -Infinity;

		// Single loop to find bounds
		for (let i = 0; i < particles.length; i++) {
			const pos = particles[i].position;
			if (pos.x < minX) minX = pos.x;
			if (pos.y < minY) minY = pos.y;
			if (pos.x > maxX) maxX = pos.x;
			if (pos.y > maxY) maxY = pos.y;
		}

		if (minX !== lastMinX || minY !== lastMinY || maxX !== lastMaxX || maxY !== lastMaxY) {
			const padding = ANIMATION_CONFIG.clearPadding;
			context.clearRect(
				minX - padding,
				minY - padding,
				maxX - minX + sizeX + 2 * padding,
				maxY - minY + sizeY + 2 * padding
			);
			lastMinX = minX;
			lastMinY = minY;
			lastMaxX = maxX;
			lastMaxY = maxY;
		}

		calculatePosition();
		drawPath();
	}

	/**
	 * Updates the cursor size
	 * @param {number} newSize - New width
	 * @param {number} [newSizeY] - Optional new height (calculated from width if not provided)
	 */
	function updateCursorSize(newSize, newSizeY) {
		sizeX = newSize;
		if (newSizeY) {
			sizeY = newSizeY;
		} else {
			sizeY = newSize * ANIMATION_CONFIG.sizeRatio;
		}
	}

	/**
	 * Forces a complete clear of the entire canvas
	 * Resets bounding box tracking
	 */
	function forceFullClear() {
		if (canvas && context) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		lastMinX = Infinity;
		lastMinY = Infinity;
		lastMaxX = -Infinity;
		lastMaxY = -Infinity;
	}

	/**
	 * Cleans up resources and stops animations
	 */
	function cleanup() {
		if (colorUpdateTimeoutId) {
			cancelAnimationFrame(colorUpdateTimeoutId);
			colorUpdateTimeoutId = null;
		}
	}

	return {
		updateParticles,
		move,
		updateSize,
		updateCursorSize,
		forceFullClear,
		cleanup,
	};
};

/**
 * Creates a cursor handler that manages cursor tracking and animation in VS Code
 * @param {Object} handlerFunctions - Callback functions for cursor events
 * @param {Function} [handlerFunctions.onReady] - Called when handler is ready
 * @param {Function} [handlerFunctions.onStarted] - Called when handler starts with editor element
 * @param {Function} [handlerFunctions.onCursorPositionUpdated] - Called when cursor position changes
 * @param {Function} [handlerFunctions.onEditorSizeUpdated] - Called when editor size changes
 * @param {Function} [handlerFunctions.onCursorSizeUpdated] - Called when cursor size changes
 * @param {Function} [handlerFunctions.onCursorVisibilityChanged] - Called when cursor visibility changes
 * @param {Function} [handlerFunctions.onContentChanged] - Called when content changes
 * @param {Function} [handlerFunctions.onLoop] - Called on each animation frame
 * @returns {Promise<void>}
 */
const createCursorHandler = async (handlerFunctions) => {
	let editor;
	let retryCount = 0;
	const maxRetries = 100;
	
	while (!editor && retryCount < maxRetries) {
		await new Promise((resolve) => setTimeout(resolve, ANIMATION_CONFIG.editorCheckInterval));
		editor = document.querySelector(".part.editor");
		retryCount++;
	}
	
	if (!editor) {
		console.error("[CursorAnimation] Failed to find VS Code editor element after maximum retries");
		return;
	}
	
	handlerFunctions?.onStarted(editor);

	const updateHandlers = [];
	let cursorId = 0;
	const lastObjects = {};
	let lastCursor = 0;
	let contentChangeTimeout = null;

	/**
	 * Creates an update handler for a specific cursor element
	 * @param {HTMLElement} target - The cursor element to track
	 * @param {number} cursorId - Unique identifier for this cursor
	 * @param {HTMLElement} cursorHolder - The container element for the cursor
	 * @param {HTMLElement} minimap - The minimap element (if present)
	 * @returns {void}
	 */
	const createCursorUpdateHandler = (target, cursorId, cursorHolder, minimap) => {
		let lastX, lastY;
		const update = (editorX, editorY) => {
			if (!lastObjects[cursorId]) {
				updateHandlers.splice(updateHandlers.indexOf(update), 1);
				return;
			}

			const rect = target.getBoundingClientRect();
			const revX = rect.left - editorX;
			const revY = rect.top - editorY;

			if (revX === lastX && revY === lastY && lastCursor === cursorId) return;
			lastX = revX;
			lastY = revY;

			if (revX <= 0 || revY <= 0) return;
			if (target.style.visibility === "hidden") return;
			if (minimap && minimap.offsetWidth !== 0 && minimap.getBoundingClientRect().left <= rect.left) return;
			if (cursorHolder.getBoundingClientRect().left > rect.left) return;

			lastCursor = cursorId;
			handlerFunctions?.onCursorPositionUpdated(revX, revY);
			handlerFunctions?.onCursorSizeUpdated(target.clientWidth, target.clientHeight);
		};
		updateHandlers.push(update);
	};

	let lastVisibility = "hidden";
	let lastCursorCount = 0;

	/**
	 * Scans for cursor elements and manages their tracking
	 * Automatically handles multiple cursors
	 */
	const updateCursors = () => {
		const now = [];
		let count = 0;
		const cursorElements = editor.getElementsByClassName("cursor");

		for (const target of cursorElements) {
			if (target.style.visibility !== "hidden") count++;

			if (target.hasAttribute("cursorId")) {
				now.push(+target.getAttribute("cursorId"));
				continue;
			}

			const thisCursorId = cursorId++;
			now.push(thisCursorId);
			lastObjects[thisCursorId] = target;
			target.setAttribute("cursorId", thisCursorId);
			const cursorHolder = target.parentElement.parentElement.parentElement;
			const minimap = cursorHolder.parentElement.querySelector(".minimap");
			createCursorUpdateHandler(target, thisCursorId, cursorHolder, minimap);
		}

		if (count !== lastCursorCount) {
			const visibility = count <= 1 ? "visible" : "hidden";
			if (visibility !== lastVisibility) {
				handlerFunctions?.onCursorVisibilityChanged(visibility);
				lastVisibility = visibility;
			}
			lastCursorCount = count;
		}

		for (const id in lastObjects) {
			if (!now.includes(+id)) {
				delete lastObjects[+id];
			}
		}
		requestAnimationFrame(updateCursors);
	};
	requestAnimationFrame(updateCursors);

	/**
	 * Main animation loop for updating cursor positions
	 */
	function updateLoop() {
		const editorRect = editor.getBoundingClientRect();
		const editorX = editorRect.left;
		const editorY = editorRect.top;

		for (const handler of updateHandlers) {
			handler(editorX, editorY);
		}
		handlerFunctions?.onLoop();
		requestAnimationFrame(updateLoop);
	}

	/**
	 * Updates the editor size when it changes
	 */
	function updateEditorSize() {
		handlerFunctions?.onEditorSizeUpdated(editor.clientWidth, editor.clientHeight);
	}
	new ResizeObserver(updateEditorSize).observe(editor);
	updateEditorSize();

	// Observe content changes to trigger canvas clear when needed
	const contentObserver = new MutationObserver(() => {
		if (contentChangeTimeout) {
			clearTimeout(contentChangeTimeout);
		}
		contentChangeTimeout = setTimeout(() => {
			handlerFunctions?.onContentChanged?.();
		}, 16); // ~1 frame
	});

	const viewLines = editor.querySelector(".view-lines");
	if (viewLines) {
		contentObserver.observe(viewLines, {
			childList: true,
			subtree: true,
			characterData: true,
		});
	}

	updateLoop();
	handlerFunctions?.onReady();
};

// Global state for cursor animation
let cursorCanvas, rainbowCursorHandle;

// Validate configuration before initialization
validateConfig(CONFIG);

// Initialize cursor handler with callbacks
createCursorHandler({
	onReady: () => {
		if (cursorCanvas) {
			cursorCanvas.style.visibility = "visible";
		}
		console.log("%c[CursorAnimation]", "color:rgb(183, 0, 255); font-weight: bold;", "Rainbow Cursor Animation is ready!");
	},
	onStarted: (editor) => {
		cursorCanvas = document.createElement("canvas");
		cursorCanvas.style.pointerEvents = "none";
		cursorCanvas.style.position = "absolute";
		cursorCanvas.style.top = "0px";
		cursorCanvas.style.left = "0px";
		cursorCanvas.style.zIndex = "1000";
		editor.appendChild(cursorCanvas);

		rainbowCursorHandle = createTrail({
			length: CONFIG.trailLength,
			color: CONFIG.color,
			size: CONFIG.size,
			canvas: cursorCanvas,
		});
		
		// Handle case where trail creation failed
		if (!rainbowCursorHandle) {
			console.error("[CursorAnimation] Failed to create cursor trail");
		}
	},

	onCursorPositionUpdated: (x, y) => {
		if (rainbowCursorHandle) {
			rainbowCursorHandle.move(x, y);
		}
	},

	onEditorSizeUpdated: (x, y) => {
		if (rainbowCursorHandle) {
			rainbowCursorHandle.updateSize(x, y);
		}
	},

	onCursorSizeUpdated: (x, y) => {
		if (rainbowCursorHandle) {
			rainbowCursorHandle.updateCursorSize(x, y);
		}
	},

	onCursorVisibilityChanged: (visibility) => {
		if (cursorCanvas) {
			cursorCanvas.style.visibility = visibility;
		}
	},

	onContentChanged: () => {
		if (rainbowCursorHandle) {
			rainbowCursorHandle.forceFullClear();
		}
	},

	onLoop: () => {
		if (rainbowCursorHandle) {
			rainbowCursorHandle.updateParticles();
		}
	},
});
