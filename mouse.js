const COLORS = ["#ffffff", "#40fff5", "#ecff40", "#63ff40", "#A052FF"];
const CONFIG = {
	color: COLORS[0],
	trailLength: 10,
	size: 10,
};

// Animation constants
const ANIMATION_CONFIG = {
	colorUpdateInterval: 1000,
	particleInterpolationX: 0.41,
	particleInterpolationY: 0.25,
	sizeRatio: 2.2,
	clearPadding: 10,
	editorCheckInterval: 100,
};

const createTrail = (options) => {
	const totalParticles = options?.length || 8;
	let particlesColor = options?.color || COLORS[0];
	const canvas = options?.canvas;
	const context = canvas.getContext("2d");
	let cursor = { x: 0, y: 0 };
	let particles = [];
	let width, height;
	let sizeX = options?.size || 3;
	let sizeY = sizeX * ANIMATION_CONFIG.sizeRatio;
	let cursorsInitted = false;
	let colorUpdateTimeoutId = null;
	let lastColorUpdate = 0;

	// Optimized color update using RAF instead of setInterval
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

	function updateSize(x, y) {
		if (width === x && height === y) return; // Skip if unchanged
		width = x;
		height = y;
		canvas.width = x;
		canvas.height = y;
	}

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

	class Particle {
		constructor (x, y) {
			this.position = { x, y };
		}
	}

	function addParticle(x, y) {
		particles.push(new Particle(x, y));
	}

	function calculatePosition() {
		let x = cursor.x;
		let y = cursor.y;

		const particleCount = particles.length;
		for (let i = 0; i < particleCount; i++) {
			const nextParticlePos = (particles[i + 1] || particles[0]).position;
			const particlePos = particles[i].position;

			particlePos.x = x;
			particlePos.y = y;

			x += (nextParticlePos.x - particlePos.x) * ANIMATION_CONFIG.particleInterpolationX;
			y += (nextParticlePos.y - particlePos.y) * ANIMATION_CONFIG.particleInterpolationY;
		}
	}

	function drawPath() {
		context.beginPath();
		context.fillStyle = particlesColor;
		context.globalAlpha = 1.0;

		// Cache values used in loop
		const maxDistance = Math.sqrt(width * width + height * height);
		const minSize = Math.min(sizeX, sizeY);
		const cursorX = cursor.x;
		const cursorY = cursor.y;

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
		for (let particleIndex = totalParticles - 1; particleIndex >= 0; particleIndex--) {
			const pos = particles[particleIndex].position;
			context.lineTo(pos.x, pos.y + sizeY);
		}
		context.closePath();
		context.fill();

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

	function updateCursorSize(newSize, newSizeY) {
		sizeX = newSize;
		if (newSizeY) {
			sizeY = newSizeY;
		} else {
			sizeY = newSize * ANIMATION_CONFIG.sizeRatio;
		}
	}

	function forceFullClear() {
		if (canvas && context) {
			context.clearRect(0, 0, canvas.width, canvas.height);
		}
		lastMinX = Infinity;
		lastMinY = Infinity;
		lastMaxX = -Infinity;
		lastMaxY = -Infinity;
	}

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

const createCursorHandler = async (handlerFunctions) => {
	let editor;
	while (!editor) {
		await new Promise((resolve) => setTimeout(resolve, ANIMATION_CONFIG.editorCheckInterval));
		editor = document.querySelector(".part.editor");
	}
	handlerFunctions?.onStarted(editor);

	let updateHandlers = [];
	let cursorId = 0;
	let lastObjects = {};
	let lastCursor = 0;
	let contentChangeTimeout = null;

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

	function updateEditorSize() {
		handlerFunctions?.onEditorSizeUpdated(editor.clientWidth, editor.clientHeight);
	}
	new ResizeObserver(updateEditorSize).observe(editor);
	updateEditorSize();

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

let cursorCanvas, rainbowCursorHandle;
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
	},

	onCursorPositionUpdated: (x, y) => {
		rainbowCursorHandle.move(x, y);
	},

	onEditorSizeUpdated: (x, y) => {
		rainbowCursorHandle.updateSize(x, y);
	},

	onCursorSizeUpdated: (x, y) => {
		rainbowCursorHandle.updateCursorSize(x, y);
	},

	onCursorVisibilityChanged: (visibility) => {
		cursorCanvas.style.visibility = visibility;
	},

	onContentChanged: () => {
		rainbowCursorHandle.forceFullClear();
	},

	onLoop: () => {
		rainbowCursorHandle.updateParticles();
	},
});
