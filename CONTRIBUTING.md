# Contributing to VS Code Cursor Animation

Thank you for your interest in contributing to this project! Here are some guidelines to help you get started.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/havaem/vscode-cursor-animation.git
   cd vscode-cursor-animation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run linting:
   ```bash
   npm run lint
   ```

## Code Style

- Use tabs for indentation
- Use double quotes for strings
- Follow the existing code style
- Add JSDoc comments for functions and classes
- Keep functions small and focused

## Making Changes

1. Create a new branch for your changes
2. Make your changes with clear, descriptive commit messages
3. Run `npm run lint` to check for code style issues
4. Test your changes in VS Code using the Custom CSS and JS Loader extension
5. Update documentation if needed
6. Submit a pull request

## Testing

To test your changes:

1. Set up the Custom CSS and JS Loader extension in VS Code
2. Point it to your local `mouse.js` file
3. Enable the extension and restart VS Code
4. Verify the cursor animation works as expected

## Reporting Issues

When reporting issues, please include:

- VS Code version
- Operating system
- Steps to reproduce the issue
- Expected vs actual behavior
- Console error messages (if any)

## Feature Requests

Feature requests are welcome! Please provide:

- Clear description of the feature
- Use case or motivation
- Possible implementation approach (optional)

Thank you for contributing! 🎉
