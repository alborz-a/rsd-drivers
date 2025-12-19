# Persian Localization for Navigator App (Using mo4tech Fork)

## Overview

Leverage the **mo4tech/navigator-app** fork which already has **Arabic + RTL support** to add Persian (Farsi) localization to the rsd-drivers app. This dramatically simplifies the work since both Arabic and Persian use RTL layout and similar script.

> [!IMPORTANT]
> The mo4tech fork has custom authentication code we do NOT need. We'll cherry-pick only the i18n/RTL changes.

## User Review Required

1. **Brand Name**: Should "Fleetbase" and "Navigator" be translated to Persian or replaced with a custom brand name (e.g., "اعتمادلایف" / "پیک اعتمادلایف")?
2. **Translation Scope**: Should we translate ALL UI strings or focus on core user-facing screens first?

---

## Proposed Changes

### Phase 1: Merge mo4tech Translation Infrastructure

#### [translations/en.json](file:///root/rsd-workspace/rsd-drivers/translations/en.json)

- Merge mo4tech's expanded translations (100+ keys vs current 89 keys)
- Use `git checkout mo4tech/main -- translations/en.json`

#### [NEW] [translations/ar.json](file:///root/rsd-workspace/rsd-drivers/translations/ar.json)

- Add Arabic translation as reference for Persian
- Use `git checkout mo4tech/main -- translations/ar.json`

#### [NEW] [translations/fa.json](file:///root/rsd-workspace/rsd-drivers/translations/fa.json)

- Create Persian translation by copying Arabic structure
- Use Jules to translate Arabic → Persian with context-aware translations

---

### Phase 2: RTL Support (If Not Already Present)

Check if RTL is already supported in the existing codebase. If not, cherry-pick mo4tech's RTL changes:

#### [src/utils/localize.js](file:///root/rsd-workspace/rsd-drivers/src/utils/localize.js)

- Ensure RTL detection for Persian (fa) locale

#### [src/contexts/LanguageContext.tsx](file:///root/rsd-workspace/rsd-drivers/src/contexts/LanguageContext.tsx)

- Ensure language switching supports Persian

---

### Phase 3: Persian Translation with Jules

Create Jules session to translate `en.json` → `fa.json` with the following guidelines:

- **Natural Persian** - Not literal translations
- **Delivery/Logistics context** - Use appropriate Persian terms for orders, tracking, etc.
- **Keep placeholders** - Maintain `{{variable}}` syntax

---

## Verification Plan

### 1. JSON Syntax Validation (Existing Tool)

```bash
# Verify all translation files are valid JSON
cd /root/rsd-workspace/rsd-drivers
node -e "JSON.parse(require('fs').readFileSync('translations/fa.json'))"
```

### 2. Key Consistency Check

```bash
# Verify Persian file has same keys as English
cd /root/rsd-workspace/rsd-drivers
node -e "
const en = require('./translations/en.json');
const fa = require('./translations/fa.json');
const enKeys = JSON.stringify(Object.keys(en).sort());
const faKeys = JSON.stringify(Object.keys(fa).sort());
console.log('Keys match:', enKeys === faKeys);
"
```

### 3. Build Test (User Manual)

> [!NOTE]
> Building the Android app requires Android SDK. The user should test locally:
>
> ```bash
> cd /root/rsd-workspace/rsd-drivers
> yarn install
> yarn android
> ```
>
> Then manually verify Persian translations appear correctly with RTL layout.

---

## Implementation Steps

1. ✅ Add mo4tech as git remote (done)
2. [ ] Cherry-pick translation files from mo4tech
3. [ ] Create Persian `fa.json` using Jules
4. [ ] Verify JSON syntax
5. [ ] User tests on Android device/emulator

## Previous Jules Sessions (Reference)

From conversation `9b509682-a242-45e8-b87d-6aabab460a68`:

- 7 completed research sessions (themes, screens, build system, etc.)
- 4 rogue sessions (incorrectly tried to implement instead of research)
- Session `14294004213001091724` still awaiting feedback on i18n setup
