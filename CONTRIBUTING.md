# Contributing to Stellar Uzima Frontend

> **Ubuntu** - *"I am because we are"*

Thank you for your interest in contributing to Stellar Uzima! This project is built on the African philosophy of Ubuntu, emphasizing community, collaboration, and collective well-being. We welcome contributions from the African tech community and global supporters of African healthcare.

## Our Mission

Stellar Uzima is more than just a healthcare platform - it's a movement to bridge traditional healing wisdom with modern medicine through blockchain technology. Every contribution helps strengthen healthcare communities across Africa.

## How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Use the appropriate template** (Bug Report or Feature Request)
3. **Provide clear, detailed information**
4. **Be respectful and constructive**

### Suggesting Features

We welcome feature suggestions that align with our mission:

- **Cultural Sensitivity**: Features that respect African cultures and traditions
- **Accessibility**: Improvements for users with varying abilities
- **Offline-First**: Enhancements for low-connectivity environments
- **Community Building**: Features that strengthen healthcare communities
- **Educational**: Tools that promote health knowledge sharing

### Code Contributions

#### Getting Started

1. **Fork the repository**
2. **Clone your fork**: `git clone https://github.com/your-username/uzima-frontend.git`
3. **Create a feature branch**: `git checkout -b feature/amazing-feature`
4. **Install dependencies**: `npm install`
5. **Start development server**: `npm run dev`

#### Development Workflow

```bash
# Create and switch to feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... code changes ...

# Run tests
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check

# Commit your changes
git add .
git commit -m "feat: add amazing feature"

# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request
```

#### Code Standards

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow our ESLint configuration
- **Prettier**: Code is automatically formatted
- **Conventional Commits**: Use standard commit message format
- **Testing**: Include tests for new functionality
- **Documentation**: Update docs for new features

#### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(telemedicine): add video call functionality`
- `fix(offline): resolve sync issues with medical records`
- `docs(readme): update installation instructions`
- `style(ui): improve accessibility for screen readers`

### Types of Contributions

#### UI/UX Design
- **Accessibility improvements**
- **Mobile-first responsive design**
- **Cultural sensitivity in design**
- **Offline-first user experience**

#### 💻 Frontend Development
- **React/Next.js components**
- **TypeScript interfaces**
- **State management**
- **Performance optimization**

#### Internationalization
- **Translation support**
- **Cultural adaptations**
- **Localization testing**
- **Regional content**

#### Mobile Development
- **Progressive Web App features**
- **Offline functionality**
- **Mobile performance**
- **Touch interactions**

#### DevOps & Infrastructure
- **Deployment automation**
- **Performance monitoring**
- **Security improvements**
- **CI/CD pipeline**

#### Documentation
- **Code documentation**
- **User guides**
- **API documentation**
- **Tutorial content**

## Contribution Guidelines

### Cultural Sensitivity

- **Respect African cultures**: Ensure contributions honor diverse African traditions
- **Inclusive language**: Use inclusive, respectful language
- **Community context**: Consider the impact on African healthcare communities
- **Traditional knowledge**: Respect traditional healing practices and protocols

### Technical Standards

- **Accessibility**: Maintain WCAG 2.1 AA compliance
- **Performance**: Optimize for low-bandwidth connections
- **Mobile-first**: Prioritize mobile user experience
- **Offline capability**: Ensure core features work offline
- **Security**: Follow security best practices for healthcare data

### Code Quality

- **Clean code**: Write readable, maintainable code
- **Documentation**: Document complex logic and APIs
- **Testing**: Include unit and integration tests
- **Performance**: Consider performance implications
- **Security**: Follow security best practices

## Pull Request Process

### Before Submitting

1. **Test thoroughly**: Ensure all tests pass
2. **Run linting**: Fix any linting errors
3. **Type checking**: Resolve TypeScript errors
4. **Update documentation**: Document new features
5. **Test on mobile**: Verify mobile functionality
6. **Accessibility check**: Ensure accessibility standards

### Pull Request Template

When creating a pull request, please include:

- **Description**: Clear description of changes
- **Type**: Bug fix, feature, documentation, etc.
- **Testing**: How you tested the changes
- **Screenshots**: If applicable, include screenshots
- **Breaking changes**: Note any breaking changes
- **Related issues**: Link to related issues

### Review Process

1. **Automated checks**: CI/CD pipeline runs automatically
2. **Code review**: Maintainers review the code
3. **Testing**: Additional testing if needed
4. **Approval**: Maintainer approval required
5. **Merge**: Changes merged to main branch

## 🏗️ Development Setup

### Prerequisites

- **Node.js 16+**
- **npm or yarn**
- **Git**
- **Modern web browser**

### Environment Setup

1. **Clone repository**:
   ```bash
   git clone https://github.com/your-org/uzima-frontend.git
   cd uzima-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## Testing

### Testing Philosophy

- **Test-driven development**: Write tests before implementation
- **Comprehensive coverage**: Aim for high test coverage
- **Accessibility testing**: Test with screen readers and keyboard navigation
- **Mobile testing**: Test on various mobile devices
- **Offline testing**: Verify offline functionality

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: End-to-end testing
- **Accessibility testing**: axe-core integration
- **Performance testing**: Lighthouse CI

## Documentation

### Documentation Standards

- **Clear and concise**: Write for your future self
- **Examples**: Include code examples
- **Screenshots**: Visual aids when helpful
- **Cultural context**: Explain cultural considerations
- **Accessibility notes**: Document accessibility features

### Documentation Types

- **Code comments**: Inline documentation
- **API documentation**: Function and component docs
- **User guides**: End-user documentation
- **Developer guides**: Technical documentation
- **Cultural guides**: Cultural sensitivity guidelines

## Design Guidelines

### Design Principles

- **Ubuntu philosophy**: Community-first design
- **Accessibility**: Inclusive design for all users
- **Cultural sensitivity**: Respectful of African cultures
- **Mobile-first**: Optimized for mobile devices
- **Offline-first**: Works without internet connection

### UI/UX Standards

- **Consistent design system**: Use established patterns
- **Accessible colors**: Sufficient color contrast
- **Readable typography**: Clear, readable fonts
- **Touch-friendly**: Appropriate touch targets
- **Loading states**: Clear feedback for users

## Internationalization

### Language Support

We support multiple African languages:

- **English** (primary)
- **French** (West/Central Africa)
- **Arabic** (North Africa)
- **Swahili** (East Africa)
- **Hausa** (West Africa)
- **Yoruba** (Nigeria)
- **And many more...**

### Cultural Considerations

- **Regional content**: Localized health information
- **Cultural protocols**: Respect traditional healing customs
- **Local expertise**: Feature local healthcare professionals
- **Community guidelines**: Culturally appropriate interactions

## What Not to Contribute

Please avoid:

- **Culturally insensitive content**
- **Non-accessible features**
- **Performance-heavy additions**
- **Breaking changes without discussion**
- **Code without tests**
- **Undocumented features**

## Getting Help

### Community Support

- **GitHub Discussions**: Ask questions and share ideas
- **Discord**: Real-time community chat
- **Email**: support@stellaruzima.com
- **Documentation**: [docs.stellaruzima.com](https://docs.stellaruzima.com)

### Technical Support

- **Issues**: Report bugs and request features
- **Pull Requests**: Submit code contributions
- **Code Review**: Get feedback on your code
- **Mentorship**: Connect with experienced contributors

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. We pledge to respect all people who contribute through reporting issues, posting feature requests, updating documentation, submitting pull requests or patches, and other activities.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at conduct@stellaruzima.com. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances.

## Acknowledgments

- **African Healthcare Workers**: For their dedication and inspiration
- **Traditional Healers**: For sharing their ancestral wisdom
- **Open Source Community**: For the tools and libraries that make this possible
- **Stellar Development Foundation**: For blockchain infrastructure
- **African Tech Communities**: For feedback and support

## License

By contributing to Stellar Uzima, you agree that your contributions will be licensed under the MIT License.

---

**Ubuntu** - *"I am because we are"*

Thank you for contributing to African healthcare through technology!

Built with ❤️ for African healthcare communities