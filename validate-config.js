#!/usr/bin/env node

/**
 * Configuration Validator for VS Code Cursor Animation
 * Run this script to validate your configuration before using it
 * 
 * Usage: node validate-config.js <path-to-mouse.js>
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
	reset: '\x1b[0m',
	green: '\x1b[32m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	cyan: '\x1b[36m',
	bold: '\x1b[1m'
};

function log(message, color = 'reset') {
	console.log(`${colors[color]}${message}${colors.reset}`);
}

function validateConfig(filePath) {
	log('\n' + '='.repeat(60), 'cyan');
	log('VS Code Cursor Animation - Configuration Validator', 'bold');
	log('='.repeat(60), 'cyan');
	
	// Check if file exists
	if (!fs.existsSync(filePath)) {
		log(`\n✗ Error: File not found: ${filePath}`, 'red');
		return false;
	}
	
	log(`\n✓ File found: ${filePath}`, 'green');
	
	// Read file content
	const content = fs.readFileSync(filePath, 'utf8');
	
	// Extract CONFIG
	const configMatch = content.match(/const CONFIG = \{([^}]+)\}/s);
	if (!configMatch) {
		log('✗ Error: Could not find CONFIG object', 'red');
		return false;
	}
	
	// Extract COLORS
	const colorsMatch = content.match(/const COLORS = \[(.*?)\]/s);
	if (!colorsMatch) {
		log('✗ Error: Could not find COLORS array', 'red');
		return false;
	}
	
	log('✓ Configuration structure found', 'green');
	
	// Parse and validate
	let hasErrors = false;
	let hasWarnings = false;
	
	// Extract values (simple parsing)
	const trailLengthMatch = content.match(/trailLength:\s*(\d+)/);
	const sizeMatch = content.match(/size:\s*(\d+)/);
	const colorsArray = colorsMatch[1].split(',').map(c => c.trim().replace(/["']/g, ''));
	
	log('\n' + '-'.repeat(60), 'cyan');
	log('Configuration Values:', 'bold');
	log('-'.repeat(60), 'cyan');
	
	// Validate trail length
	if (trailLengthMatch) {
		const trailLength = parseInt(trailLengthMatch[1]);
		log(`\nTrail Length: ${trailLength}`);
		
		if (trailLength < 1) {
			log('  ✗ Error: Trail length must be at least 1', 'red');
			hasErrors = true;
		} else if (trailLength > 100) {
			log('  ✗ Error: Trail length should not exceed 100', 'red');
			hasErrors = true;
		} else if (trailLength > 30) {
			log('  ⚠ Warning: High trail length may impact performance', 'yellow');
			hasWarnings = true;
		} else {
			log('  ✓ Valid', 'green');
		}
	}
	
	// Validate size
	if (sizeMatch) {
		const size = parseInt(sizeMatch[1]);
		log(`\nSize: ${size}`);
		
		if (size < 1) {
			log('  ✗ Error: Size must be at least 1', 'red');
			hasErrors = true;
		} else if (size > 50) {
			log('  ✗ Error: Size should not exceed 50', 'red');
			hasErrors = true;
		} else if (size > 25) {
			log('  ⚠ Warning: Large size may look too thick', 'yellow');
			hasWarnings = true;
		} else {
			log('  ✓ Valid', 'green');
		}
	}
	
	// Validate colors
	log(`\nColors: ${colorsArray.length} defined`);
	const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
	let validColors = 0;
	
	for (const color of colorsArray) {
		if (color && hexColorRegex.test(color)) {
			validColors++;
		} else if (color) {
			log(`  ✗ Invalid color format: ${color}`, 'red');
			hasErrors = true;
		}
	}
	
	if (validColors === 0) {
		log('  ✗ Error: No valid colors found', 'red');
		hasErrors = true;
	} else if (validColors === 1) {
		log('  ⚠ Warning: Only 1 color (no rainbow effect)', 'yellow');
		hasWarnings = true;
	} else {
		log(`  ✓ ${validColors} valid hex colors`, 'green');
	}
	
	// Final summary
	log('\n' + '='.repeat(60), 'cyan');
	
	if (hasErrors) {
		log('✗ Validation Failed - Please fix errors above', 'red');
		return false;
	} else if (hasWarnings) {
		log('⚠ Validation Passed with Warnings', 'yellow');
		log('Your configuration will work but consider the warnings', 'yellow');
		return true;
	} else {
		log('✓ Validation Passed - Configuration looks good!', 'green');
		return true;
	}
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
	log('Usage: node validate-config.js <path-to-mouse.js>', 'yellow');
	log('Example: node validate-config.js ./mouse.js', 'cyan');
	process.exit(1);
}

const filePath = path.resolve(args[0]);
const isValid = validateConfig(filePath);

process.exit(isValid ? 0 : 1);
