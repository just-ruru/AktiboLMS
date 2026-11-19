# AktiboLMS Frontend Implementation Design Document

## Intent and Why
We need to implement the remaining Figma screens for the AktiboLMS frontend as fully responsive React+Tailwind pages. This includes:
- Role selection flow (student vs instructor)
- Student learning path (enroll → lesson → practice → results)
- Instructor management path (create course → edit → publish → analytics)
- All existing pages must be made responsive to avoid breaking layouts on smaller screens

The design must match Figma frames exactly while using the project's existing Tailwind design system and component patterns.

## Goals
- Implement all 17+ Figma screens as functional, accessible, and visually accurate components
- Ensure 100% responsive behavior across mobile (375px), tablet (768px), and desktop (1440px) breakpoints
- Maintain visual fidelity to Figma designs using project design tokens
- Preserve existing component patterns and conventions (e.g., Card, Navbar, Input)
- Fix all existing fixed-width layouts that break on smaller screens
- Ensure role selection properly routes to different workflows

## Goals
- Implement all 17+ Figma screens as functional, accessible, and visually accurate components
- Ensure 100% responsive behavior across mobile (375px), tablet (768px), and desktop (1440px) breakpoints
- Maintain visual fidelity to Figma designs using project design tokens
- Preserve existing component patterns and conventions (e.g., Card, Navbar, Input)
- Fix all existing fixed-width layouts that break on smaller screens
- Ensure role selection properly routes to different workflows

## Success Criteria
- All screens pass visual verification against Figma using Playwright screenshots
- All responsive breakpoints work without layout shifts or content overflow
- All attribute-selector hacks are removed from App.css and replaced with proper Tailwind responsive classes
- All new screens follow existing component patterns and styling conventions
- Build passes with `npm run build` (tsc -b + vite build) with no errors

## What's Left to the Builder
- Detailed implementation of each screen based on Figma designs
- Responsive layout conversions for all existing pages
- Removal of all fixed-width CSS hacks and replacement with proper Tailwind responsive classes
- Component composition to match Figma layouts exactly
- State management for demo flows (student/instructor paths)
- Responsive testing at all breakpoints

**Nothing important left** - the design document is complete and ready for the builder to plan the implementation.