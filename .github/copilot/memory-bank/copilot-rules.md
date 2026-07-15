# Copilot Rules - Munchies

## Core Development Rules

### 🧠 Memory Bank First
- **ALWAYS** read `.github/copilot/memory-bank/memory-bank-instructions.md` first
- **LOAD** all `.github/copilot/memory-bank/*.md` files before each task
- **CHECK** active feature folder (e.g., `.github/copilot/memory-bank/authentication/`)
- **UPDATE** memory bank files when context changes significantly

### 🚦 Kiro-Lite Workflow Compliance
- **RESPECT** all slash commands - do nothing until relevant command given
- **FOLLOW** strict phase progression: PRD → Design → Tasks → Code
- **WAIT** for explicit approval before moving to next phase
- **NEVER** skip phases or assume approval

### 📋 Task Management Rules
- **ONE TASK** at a time during implementation
- **SHOW** file plan before making changes
- **PROVIDE** diffs in ```diff``` blocks
- **INCLUDE** tests in ```code``` blocks
- **FINISH** with `/review complete` and wait

### 🔒 Code Quality Standards
- **TypeScript**: Use strict mode, proper typing
- **Testing**: Unit tests required for all business logic
- **Linting**: Follow ESLint configuration
- **Formatting**: Use Prettier for consistent style
- **Documentation**: JSDoc for public APIs

### 🏗️ Architecture Compliance
- **Monorepo**: Respect workspace boundaries
- **Patterns**: Follow established system patterns
- **APIs**: RESTful design with proper error handling
- **Database**: Use Prisma ORM, proper migrations
- **Security**: OAuth, JWT, input validation

## Development Workflow Rules

### 📁 File Organization
- Backend code in `packages/backend/src/`
- Frontend code in `packages/web/src/`
- Shared utilities in `packages/shared/`
- Tests co-located with source files
- Documentation in `docs/` or memory bank

### 🔧 Development Environment
- Use provided VS Code tasks when available
- Docker containers for local services
- Environment variables for configuration
- npm workspaces for dependency management

### 📝 Documentation Requirements
- Update memory bank when architecture changes
- Maintain API documentation
- Update progress tracking after completions
- Document architectural decisions

### 🧪 Testing Requirements
- Unit tests for all utilities and business logic
- Integration tests for API endpoints
- E2E tests for critical user journeys
- Mock external services in tests

## Code Style Rules

### TypeScript Conventions
```typescript
// Use proper interfaces
interface User {
  id: string;
  email: string;
  preferences: UserPreferences;
}

// Proper error handling
try {
  const result = await service.operation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed', { error });
  throw new AppError('Operation failed', ErrorType.SYSTEM);
}
```

### API Design Rules
- RESTful endpoints with proper HTTP methods
- Consistent response format with ApiResponse<T>
- Proper status codes (200, 201, 400, 401, 404, 500)
- Input validation on all endpoints
- Rate limiting for public endpoints

### Database Rules
- Use Prisma schema definitions
- Proper indexing for query performance
- Foreign key constraints
- Soft deletes where appropriate
- Audit fields (createdAt, updatedAt)

### Security Rules
- Never log sensitive data
- Validate all inputs
- Use parameterized queries (Prisma handles this)
- Implement proper CORS
- Rate limiting on authentication endpoints

## Communication Rules

### 🗣️ Response Format
- Clear, concise explanations
- Show file changes in diff format
- Explain reasoning for architectural decisions
- Ask for clarification when requirements unclear

### 📊 Status Updates
- Update progress.md after significant completions
- Maintain activeContext.md with current focus
- Flag blockers and dependencies clearly
- Communicate risks early

### 🎯 Focus Areas
- Prioritize Phase 1 foundation work
- Complete infrastructure before features
- Ensure quality over speed
- Document decisions for future reference

## Error Handling Rules

### 🚨 When Things Go Wrong
- Log errors with context
- Provide user-friendly error messages
- Implement graceful degradation
- Document error resolution steps

### 🔄 Recovery Procedures
- Database rollback procedures
- Service restart protocols
- Cache invalidation strategies
- User notification procedures

## Performance Rules

### ⚡ Optimization Guidelines
- Cache frequently accessed data
- Optimize database queries
- Minimize external API calls
- Compress images and assets
- Use CDN for static content

### 📈 Monitoring Requirements
- Log performance metrics
- Track API response times
- Monitor error rates
- Alert on anomalies

## Collaboration Rules

### 👥 Code Review Standards
- Review for security issues
- Check test coverage
- Verify documentation updates
- Confirm architectural compliance

### 🔀 Version Control
- Feature branches for new work
- Descriptive commit messages
- Squash commits before merge
- Update documentation in same PR

## Deployment Rules

### 🚀 Deployment Standards
- All changes through CI/CD pipeline
- Staging environment testing required
- Database migrations automated
- Rollback procedures tested

### 🔍 Quality Gates
- All tests passing
- Code coverage above 80%
- Security scan clean
- Performance benchmarks met

## Emergency Procedures

### 🆘 Critical Issues
- Document issue immediately
- Implement hotfix if needed
- Update memory bank with lessons learned
- Review and improve processes

### 📞 Escalation Process
- Technical issues: Check documentation first
- Architecture questions: Refer to memory bank
- Business decisions: Clarify requirements
- Blockers: Update activeContext.md

## Memory Bank Maintenance

### 📚 Regular Updates
- Weekly progress updates
- Architecture changes documentation
- Lessons learned capture
- Risk assessment updates

### 🧹 Cleanup Procedures
- Remove outdated information
- Consolidate duplicate content
- Update links and references
- Archive completed features
