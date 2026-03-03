# Requirements Document

## Introduction

The Health Streak Celebration Modal is a gamification feature for the Stellar Uzima health platform that celebrates user health streak milestones (7, 14, and 30 consecutive days) with a full-screen modal displaying their achievement, XLM cryptocurrency bonus rewards, and motivational African proverbs. The feature encourages continued engagement and social sharing while maintaining cultural authenticity through warm, African-inspired design aesthetics.
J
## Glossary

- **Streak_Modal**: The full-screen celebration modal component that displays milestone achievements
- **Milestone**: A streak achievement threshold at exactly 7, 14, or 30 consecutive days
- **XLM_Bonus**: Stellar Lumens cryptocurrency reward amount earned for reaching a milestone
- **Celebration_Gate**: The component that monitors URL parameters and triggers the Streak_Modal
- **Web_Share_API**: Browser native sharing interface for social media and messaging apps
- **Reduced_Motion**: Browser accessibility preference that disables animations for users with motion sensitivity

## Requirements

### Requirement 1: Milestone Detection and Modal Triggering

**User Story:** As a user, I want to see a celebration modal when I reach health streak milestones, so that I feel recognized for my consistent health efforts.

#### Acceptance Criteria

1. WHEN the streakDays prop equals exactly 7, THE Streak_Modal SHALL render and display
2. WHEN the streakDays prop equals exactly 14, THE Streak_Modal SHALL render and display
3. WHEN the streakDays prop equals exactly 30, THE Streak_Modal SHALL render and display
4. WHEN the streakDays prop is any value other than 7, 14, or 30, THE Streak_Modal SHALL NOT render
5. THE Celebration_Gate SHALL read the streak value from the URL query parameter named "streak"
6. WHEN the streak query parameter is not a valid integer, THE Celebration_Gate SHALL pass 0 to the Streak_Modal

### Requirement 2: Visual Design and Layout

**User Story:** As a user, I want the celebration modal to have warm, African-inspired aesthetics, so that the experience feels culturally authentic and visually appealing.

#### Acceptance Criteria

1. THE Streak_Modal SHALL display a full-screen dark semi-transparent overlay covering the entire viewport
2. THE Streak_Modal SHALL display a centered card with maximum width of 576px and 92% viewport width on smaller screens
3. THE Streak_Modal SHALL apply a gradient background transitioning from terracotta (rgba(184,78,32,0.95)) through orange (rgba(224,139,46,0.90)) to gold (rgba(240,192,80,0.90))
4. THE Streak_Modal SHALL display a flame emoji (🔥) at 48px size within a circular container
5. THE Streak_Modal SHALL display the milestone title in serif font at 30px size with format "[N]-Day Streak! Incredible!"
6. THE Streak_Modal SHALL display white text on the gradient background for optimal contrast

### Requirement 3: Flame Icon Animation

**User Story:** As a user, I want to see an animated flame icon, so that the celebration feels dynamic and engaging.

#### Acceptance Criteria

1. THE Streak_Modal SHALL apply a looping CSS animation to the flame icon container
2. THE Flame_Animation SHALL use the flameFlicker keyframes with 1.5 second duration
3. THE Flame_Animation SHALL loop infinitely using ease-in-out timing
4. THE Flame_Animation SHALL translate vertically by -2px and scale to 1.03 at the midpoint
5. WHEN Reduced_Motion preference is enabled, THE Streak_Modal SHALL disable the Flame_Animation

### Requirement 4: XLM Bonus Display and Count-Up Animation

**User Story:** As a user, I want to see my XLM bonus count up from zero, so that the reward feels exciting and earned.

#### Acceptance Criteria

1. WHEN the milestone is 7 days, THE Streak_Modal SHALL display "+2.0 XLM Streak Bonus"
2. WHEN the milestone is 14 days, THE Streak_Modal SHALL display "+5.0 XLM Streak Bonus"
3. WHEN the milestone is 30 days, THE Streak_Modal SHALL display "+12.0 XLM Streak Bonus"
4. THE XLM_Bonus SHALL count up from 0.0 to the target value over exactly 1200 milliseconds
5. THE Count_Up_Animation SHALL use cubic ease-out easing (1 - (1-t)³)
6. THE XLM_Bonus SHALL display with exactly 1 decimal place precision
7. WHEN Reduced_Motion preference is enabled, THE Streak_Modal SHALL display the final XLM_Bonus value immediately without animation

### Requirement 5: Motivational Proverb Display

**User Story:** As a user, I want to see African proverbs about health, so that I feel culturally connected and motivated.

#### Acceptance Criteria

1. THE Streak_Modal SHALL maintain a collection of exactly 5 African health proverbs
2. WHEN the Streak_Modal opens, THE Streak_Modal SHALL randomly select one proverb from the collection
3. THE Streak_Modal SHALL display the selected proverb in italic text style
4. THE Proverb_Collection SHALL include: "Health is wealth; a strong body builds a strong village."
5. THE Proverb_Collection SHALL include: "When the body is well, the mind dances."
6. THE Proverb_Collection SHALL include: "A river that forgets its source will dry; care for yourself."
7. THE Proverb_Collection SHALL include: "The child who is loved grows strong; love your health."
8. THE Proverb_Collection SHALL include: "Morning steps plant seeds of long life."

### Requirement 6: Social Sharing Functionality

**User Story:** As a user, I want to share my streak achievement with my community, so that I can celebrate publicly and inspire others.

#### Acceptance Criteria

1. THE Streak_Modal SHALL display a "Share My Achievement" button
2. WHEN the user clicks "Share My Achievement" AND the Web_Share_API is available, THE Streak_Modal SHALL invoke the native share dialog
3. THE Share_Text SHALL follow the format: "[N]-Day Streak on Stellar Uzima! I earned +[X] XLM."
4. THE Share_Data SHALL include the title "Stellar Uzima Streak"
5. THE Share_Data SHALL include the current page URL
6. WHEN the Web_Share_API is not available, THE Streak_Modal SHALL copy the share text and URL to the clipboard
7. WHEN the share fails, THE Streak_Modal SHALL attempt to copy to clipboard as fallback
8. WHEN text is copied to clipboard, THE Streak_Modal SHALL change the button text to "Copied!" for 1500 milliseconds

### Requirement 7: Modal Dismissal

**User Story:** As a user, I want to close the celebration modal and continue using the app, so that I can proceed with my health activities.

#### Acceptance Criteria

1. THE Streak_Modal SHALL display a "Keep Going →" button with outline styling
2. WHEN the user clicks "Keep Going →", THE Streak_Modal SHALL set its dismissed state to true
3. WHEN the dismissed state is true, THE Streak_Modal SHALL remove itself from the DOM
4. THE Streak_Modal SHALL NOT re-appear after dismissal until the page is reloaded with a milestone streak parameter

### Requirement 8: Confetti Animation

**User Story:** As a user, I want to see confetti falling across the screen, so that the celebration feels festive and joyful.

#### Acceptance Criteria

1. THE Streak_Modal SHALL generate exactly 60 confetti pieces using CSS-only animation
2. EACH Confetti_Piece SHALL have a random horizontal position between 0% and 100% of viewport width
3. EACH Confetti_Piece SHALL have a random size between 6px and 11px
4. EACH Confetti_Piece SHALL have a random animation delay between 0 and 0.6 seconds
5. EACH Confetti_Piece SHALL have a random fall duration between 3.5 and 6.0 seconds
6. THE Confetti_Animation SHALL use the confettiFall keyframes with linear timing
7. THE Confetti_Animation SHALL rotate each piece 720 degrees during the fall
8. THE Confetti_Pieces SHALL cycle through 5 colors: gold (#F0C050), terracotta (#B84E20), orange (#E08B2E), green (#5A7A4A), and cream (#FFFDF5)
9. WHEN Reduced_Motion preference is enabled, THE Streak_Modal SHALL NOT render any confetti pieces

### Requirement 9: Accessibility and Semantic HTML

**User Story:** As a user with assistive technology, I want the modal to be properly announced and accessible, so that I can understand and interact with the celebration.

#### Acceptance Criteria

1. THE Streak_Modal SHALL use a div element with role="dialog" attribute
2. THE Streak_Modal SHALL include aria-modal="true" attribute
3. THE Streak_Modal SHALL display above all other content with z-index of 50
4. THE Streak_Modal SHALL respect the Reduced_Motion media query for all animations
5. THE Streak_Modal SHALL use semantic button elements for all interactive actions

### Requirement 10: Integration and URL Parameter Handling

**User Story:** As a developer, I want the modal to trigger based on URL parameters, so that I can test and integrate the feature easily.

#### Acceptance Criteria

1. THE Celebration_Gate SHALL be rendered on the home page of the application
2. THE Celebration_Gate SHALL use Next.js useSearchParams hook to read URL query parameters
3. WHEN the URL contains "?streak=7", THE Celebration_Gate SHALL pass streakDays=7 to the Streak_Modal
4. WHEN the URL contains "?streak=14", THE Celebration_Gate SHALL pass streakDays=14 to the Streak_Modal
5. WHEN the URL contains "?streak=30", THE Celebration_Gate SHALL pass streakDays=30 to the Streak_Modal
6. WHEN the streak parameter contains non-numeric characters, THE Celebration_Gate SHALL parse it as 0
7. WHEN the streak parameter is absent, THE Celebration_Gate SHALL pass streakDays=0 to the Streak_Modal
