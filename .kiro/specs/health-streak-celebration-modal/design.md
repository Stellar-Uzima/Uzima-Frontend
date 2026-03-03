# Design Document: Health Streak Celebration Modal

## Overview

The Health Streak Celebration Modal is a gamification feature that celebrates user health streak milestones with a full-screen modal experience. When users reach exactly 7, 14, or 30 consecutive days of health activity, they are rewarded with an animated celebration displaying their achievement, XLM cryptocurrency bonus, and motivational African proverbs.

The feature is implemented as two React components in a Next.js application:
- **StreakCelebrationModal**: The main modal component that handles rendering, animations, and user interactions
- **StreakCelebrationGate**: A wrapper component that reads URL parameters and conditionally renders the modal

The design emphasizes cultural authenticity through warm African-inspired aesthetics (terracotta, amber, gold color palette), accessibility through reduced motion support, and user engagement through social sharing capabilities.

## Architecture

### Component Structure

```
app/page.tsx
  └── StreakCelebrationGate (Client Component)
        └── StreakCelebrationModal (Client Component)
```

### Data Flow

1. URL query parameter `?streak=N` is read by StreakCelebrationGate
2. Parameter is parsed to integer (defaults to 0 if invalid)
3. Value is passed as `streakDays` prop to StreakCelebrationModal
4. Modal determines if value is a milestone (7, 14, or 30)
5. If milestone, modal renders with animations and content
6. User can share achievement or dismiss modal

### State Management

The modal uses React local state for:
- `dismissed`: Boolean tracking if user has closed the modal
- `copied`: Boolean tracking clipboard copy feedback (1500ms timeout)
- `proverb`: String storing randomly selected proverb on mount
- `bonusDisplay`: Number tracking animated count-up value
- `reduceMotionRef`: Ref storing user's motion preference

### External Dependencies

- Next.js `useSearchParams` hook for URL parameter reading
- Browser Web Share API (with clipboard fallback)
- Browser `matchMedia` API for reduced motion detection
- `requestAnimationFrame` for count-up animation

## Components and Interfaces

### StreakCelebrationGate

**Purpose**: URL parameter handler and modal trigger

**Props**: None (reads from URL)

**Implementation**:
```typescript
'use client';
import { useSearchParams } from 'next/navigation';
import StreakCelebrationModal from './StreakCelebrationModal';

export default function StreakCelebrationGate() {
  const params = useSearchParams();
  const streakParam = params.get('streak');
  const days = streakParam ? parseInt(streakParam, 10) : 0;
  return <StreakCelebrationModal streakDays={Number.isFinite(days) ? days : 0} />;
}
```

**Responsibilities**:
- Read `streak` query parameter from URL
- Parse parameter to integer with fallback to 0
- Validate parsed value is finite number
- Pass validated value to modal component

### StreakCelebrationModal

**Purpose**: Main celebration modal with animations and interactions

**Props**:
```typescript
interface StreakCelebrationModalProps {
  streakDays: number;
}
```

**Key Constants**:
```typescript
type Milestone = 7 | 14 | 30;

const PROVERBS = [
  'Health is wealth; a strong body builds a strong village.',
  'When the body is well, the mind dances.',
  'A river that forgets its source will dry; care for yourself.',
  'The child who is loved grows strong; love your health.',
  'Morning steps plant seeds of long life.',
];

const BONUS_BY_MILESTONE: Record<Milestone, number> = {
  7: 2.0,
  14: 5.0,
  30: 12.0,
};
```

**Responsibilities**:
- Determine if streakDays is a valid milestone
- Randomly select and display African proverb
- Animate XLM bonus count-up (1200ms, cubic ease-out)
- Generate 60 confetti pieces with randomized properties
- Handle social sharing with Web Share API fallback
- Respect reduced motion preferences
- Manage modal dismissal state

### Animation System

**Flame Flicker Animation** (CSS):
- Duration: 1.5s infinite ease-in-out
- Keyframes: translateY(-2px) and scale(1.03) at 50%
- Applied via `animate-flicker` utility class
- Disabled when `prefers-reduced-motion: reduce`

**Confetti Fall Animation** (CSS):
- 60 pieces with randomized properties:
  - Horizontal position: 0-100% viewport width
  - Size: 6-11px width, 60% height ratio
  - Delay: 0-0.6s
  - Duration: 3.5-6.0s
  - Colors: Cycle through gold, terracotta, orange, green, cream
- Keyframes: translateY(-100vh to 110vh) + rotate(720deg)
- Linear timing function
- Not rendered when `prefers-reduced-motion: reduce`

**XLM Bonus Count-Up** (JavaScript):
- Duration: 1200ms
- Easing: Cubic ease-out (1 - (1-t)³)
- Uses `requestAnimationFrame` for smooth animation
- Displays final value immediately when reduced motion enabled
- Format: 1 decimal place precision

## Data Models

### Milestone Type
```typescript
type Milestone = 7 | 14 | 30;
```
Literal union type representing valid streak milestones.

### Bonus Mapping
```typescript
const BONUS_BY_MILESTONE: Record<Milestone, number> = {
  7: 2.0,
  14: 5.0,
  30: 12.0,
};
```
Maps milestone days to XLM bonus amounts.

### Proverb Collection
```typescript
const PROVERBS: string[] = [
  'Health is wealth; a strong body builds a strong village.',
  'When the body is well, the mind dances.',
  'A river that forgets its source will dry; care for yourself.',
  'The child who is loved grows strong; love your health.',
  'Morning steps plant seeds of long life.',
];
```
Array of 5 African health proverbs for random selection.

### Confetti Piece
```typescript
interface ConfettiPiece {
  id: number;
  size: number;        // 6-11px
  left: number;        // 0-100%
  delay: number;       // 0-0.6s
  duration: number;    // 3.5-6.0s
  color: string;       // One of 5 colors
}
```
Generated dynamically using `useMemo` with 60 pieces.

### Share Data
```typescript
interface ShareData {
  title: string;       // "Stellar Uzima Streak"
  text: string;        // "[N]-Day Streak on Stellar Uzima! I earned +[X] XLM."
  url: string;         // window.location.href
}
```
Data structure for Web Share API.


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Non-milestone values prevent rendering

*For any* integer value that is not exactly 7, 14, or 30, the modal component should return null and not render any DOM elements.

**Validates: Requirements 1.4**

### Property 2: URL parameter parsing handles invalid input

*For any* non-numeric or invalid string value in the streak URL parameter, the StreakCelebrationGate component should parse it as 0 and pass 0 to the modal.

**Validates: Requirements 1.6, 10.6**

### Property 3: Milestone title format consistency

*For any* valid milestone value (7, 14, or 30), the modal should display a title following the exact format "[N]-Day Streak! Incredible!" where N is the milestone number.

**Validates: Requirements 2.5**

### Property 4: XLM bonus decimal precision

*For any* milestone value, the displayed XLM bonus should always be formatted with exactly 1 decimal place throughout the count-up animation and final display.

**Validates: Requirements 4.6**

### Property 5: Proverb selection from collection

*For any* modal rendering, the displayed proverb should be one of the 5 proverbs from the PROVERBS collection.

**Validates: Requirements 5.2**

### Property 6: Share text format consistency

*For any* milestone value, the share text should follow the exact format "[N]-Day Streak on Stellar Uzima! I earned +[X] XLM." where N is the milestone days and X is the bonus amount with 1 decimal place.

**Validates: Requirements 6.3**

### Property 7: Confetti pieces have valid properties

*For any* confetti piece generated, it should have:
- A horizontal position between 0% and 100%
- A size between 6px and 11px
- An animation delay between 0 and 0.6 seconds
- A fall duration between 3.5 and 6.0 seconds

**Validates: Requirements 8.2, 8.3, 8.4, 8.5**

### Property 8: Confetti color cycling

*For any* set of confetti pieces, the colors should cycle through the 5-color palette (gold #F0C050, terracotta #B84E20, orange #E08B2E, green #5A7A4A, cream #FFFDF5) using modulo distribution based on piece index.

**Validates: Requirements 8.8**

## Error Handling

### Invalid URL Parameters

**Scenario**: User navigates to page with invalid streak parameter (e.g., `?streak=abc`, `?streak=7.5`)

**Handling**:
- `parseInt()` returns `NaN` for non-numeric strings
- `Number.isFinite()` check catches `NaN` and `Infinity`
- Component defaults to `streakDays=0`
- Modal returns `null` (no error thrown)

**User Experience**: No modal appears, page loads normally

### Missing Web Share API

**Scenario**: Browser doesn't support `navigator.share` (desktop browsers, older mobile browsers)

**Handling**:
- Check `if (navigator.share)` before calling API
- Fallback to `navigator.clipboard.writeText()`
- Display "Copied!" feedback for 1500ms
- If clipboard also fails, silently fail (no error thrown)

**User Experience**: Share button copies text to clipboard instead of opening native share sheet

### Share API Rejection

**Scenario**: User cancels native share dialog or share fails

**Handling**:
- Catch exception from `navigator.share()`
- Attempt clipboard fallback in catch block
- If clipboard succeeds, show "Copied!" feedback
- If clipboard fails, silently fail

**User Experience**: Graceful degradation to clipboard copy

### Animation Frame Cleanup

**Scenario**: Component unmounts during count-up animation

**Handling**:
- `useEffect` returns cleanup function
- Cleanup calls `cancelAnimationFrame(raf)`
- Prevents memory leaks and state updates on unmounted component

**User Experience**: No visible impact, prevents console warnings

### Reduced Motion Preference

**Scenario**: User has `prefers-reduced-motion: reduce` enabled

**Handling**:
- Check `window.matchMedia('(prefers-reduced-motion: reduce)')` on mount
- Store result in ref to avoid re-renders
- Skip count-up animation (show final value immediately)
- Skip confetti generation (return empty array)
- CSS media query disables flame flicker animation

**User Experience**: Static modal without animations, fully accessible

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, integration points, and error conditions
- **Property tests**: Verify universal properties hold across all valid inputs through randomization

### Unit Testing Focus

Unit tests should cover:

1. **Specific milestone examples**:
   - Modal renders for streak=7, 14, 30
   - Correct XLM bonus displayed for each milestone (2.0, 5.0, 12.0)
   - Modal doesn't render for streak=0, 1, 8, 15, 29, 31

2. **Edge cases**:
   - Empty streak parameter (`?streak=`)
   - Missing streak parameter (no query string)
   - Negative values (`?streak=-7`)
   - Very large values (`?streak=999`)
   - Decimal values (`?streak=7.5`)
   - Non-numeric strings (`?streak=abc`, `?streak=7days`)

3. **Integration points**:
   - StreakCelebrationGate correctly reads URL parameters
   - Modal is rendered in app/page.tsx
   - Button click handlers update state correctly
   - Dismissal prevents re-rendering

4. **Error conditions**:
   - Web Share API not available (mock `navigator.share` as undefined)
   - Share API throws error (mock rejection)
   - Clipboard API not available (mock `navigator.clipboard` as undefined)
   - Clipboard write fails (mock rejection)

5. **Accessibility**:
   - ARIA attributes present (role="dialog", aria-modal="true")
   - Semantic button elements used
   - Reduced motion disables animations
   - Reduced motion skips confetti generation

6. **Visual elements**:
   - Flame emoji rendered
   - Gradient background applied
   - Proverb displayed in italics
   - All 5 proverbs present in collection
   - Confetti count is exactly 60
   - CSS animations defined in globals.css

### Property-Based Testing Configuration

**Library**: Use `fast-check` for TypeScript/JavaScript property-based testing

**Configuration**:
- Minimum 100 iterations per property test
- Each test must reference its design document property
- Tag format: `// Feature: health-streak-celebration-modal, Property {number}: {property_text}`

**Property Test Implementations**:

1. **Property 1: Non-milestone values prevent rendering**
   - Generator: `fc.integer().filter(n => n !== 7 && n !== 14 && n !== 30)`
   - Assertion: Component returns null

2. **Property 2: URL parameter parsing handles invalid input**
   - Generator: `fc.string()` (non-numeric strings)
   - Assertion: Parsed value equals 0

3. **Property 3: Milestone title format consistency**
   - Generator: `fc.constantFrom(7, 14, 30)`
   - Assertion: Title matches regex `/^\d+-Day Streak! Incredible!$/`

4. **Property 4: XLM bonus decimal precision**
   - Generator: `fc.constantFrom(7, 14, 30)`
   - Assertion: Bonus display matches `/^\d+\.\d$/` throughout animation

5. **Property 5: Proverb selection from collection**
   - Generator: `fc.constantFrom(7, 14, 30)` (trigger modal)
   - Assertion: Displayed proverb is in PROVERBS array

6. **Property 6: Share text format consistency**
   - Generator: `fc.constantFrom(7, 14, 30)`
   - Assertion: Share text matches `/^\d+-Day Streak on Stellar Uzima! I earned \+\d+\.\d XLM\.$/`

7. **Property 7: Confetti pieces have valid properties**
   - Generator: Generate confetti array (internal logic)
   - Assertion: All pieces satisfy range constraints

8. **Property 8: Confetti color cycling**
   - Generator: Generate confetti array (internal logic)
   - Assertion: `confetti[i].color === COLORS[i % 5]`

### Test File Structure

```
__tests__/
  components/
    dashboard/
      StreakCelebrationModal.test.tsx       # Unit tests
      StreakCelebrationModal.property.test.tsx  # Property tests
      StreakCelebrationGate.test.tsx        # Unit tests
      StreakCelebrationGate.property.test.tsx   # Property tests
  integration/
    streak-celebration-flow.test.tsx        # End-to-end integration
```

### Testing Tools

- **Test Runner**: Jest or Vitest
- **React Testing**: React Testing Library
- **Property Testing**: fast-check
- **Mocking**: Mock Service Worker (MSW) for Web Share API
- **Coverage Target**: 90%+ line coverage, 100% property coverage

### Manual Testing Checklist

- [ ] Test on mobile device with native share sheet
- [ ] Test on desktop with clipboard fallback
- [ ] Test with reduced motion enabled in OS settings
- [ ] Test with screen reader (NVDA/JAWS/VoiceOver)
- [ ] Test confetti animation performance on low-end devices
- [ ] Verify gradient renders correctly across browsers
- [ ] Test modal dismissal and non-reappearance
- [ ] Verify XLM count-up animation smoothness

