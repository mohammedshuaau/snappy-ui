# Contributing to Snap Kit

Thank you for your interest in contributing to Snap Kit! This document provides guidelines and steps for contributing to the project.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/mohammedshuaau/snap-kit.git
   cd snap-kit
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development

1. Start Storybook to view and test components:
   ```bash
   yarn storybook
   ```

2. Run tests:
   ```bash
   yarn test
   ```

3. Build the library:
   ```bash
   yarn build
   ```

## 📝 Guidelines

### Component Development

1. **File Structure**
   - Place new components in `src/components/YourComponent`
   - Include the following files:
     - `YourComponent.tsx` - Component implementation
     - `YourComponent.stories.tsx` - Storybook stories
     - `YourComponent.test.tsx` - Unit tests

2. **Code Style**
   - Follow TypeScript best practices
   - Use functional components with hooks
   - Include proper TypeScript types and interfaces
   - Add JSDoc comments for props and functions
   - Follow the existing component patterns

3. **Testing**
   - Write unit tests for all components
   - Aim for good test coverage
   - Test edge cases and error states
   - Use React Testing Library best practices

4. **Documentation**
   - Add detailed prop documentation
   - Include usage examples in stories
   - Document any complex logic or edge cases
   - Update README.md if adding major features

### Commit Messages

Follow conventional commits format:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test updates
- `chore:` Maintenance tasks

Example: `feat: add dark mode support to Button component`

## 🔄 Pull Request Process

1. **Before Submitting**
   - Ensure all tests pass
   - Update documentation if needed
   - Add/update Storybook stories
   - Run `yarn build` to verify compilation

2. **Submitting**
   - Create a pull request with a clear title and description
   - Link any related issues
   - Describe your changes and motivation
   - Add screenshots for UI changes

3. **Review Process**
   - Maintainers will review your PR
   - Address any requested changes
   - PR must pass CI checks
   - Requires approval from at least one maintainer

## 🐛 Bug Reports

When reporting bugs:

1. Use the GitHub issue tracker
2. Include a clear description
3. Provide steps to reproduce
4. Include expected vs actual behavior
5. Add relevant code samples
6. Specify your environment details

## 💡 Feature Requests

When suggesting features:

1. Check existing issues first
2. Provide a clear use case
3. Explain the expected behavior
4. Include example scenarios
5. Consider implementation details

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## ❓ Questions?

Feel free to:
- Open an issue
- Start a discussion
- Reach out to maintainers

Thank you for contributing to Snap Kit! 🙏 