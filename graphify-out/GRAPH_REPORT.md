# Graph Report - poker-coach-ai  (2026-10-18)

## Corpus Check
- 134 files · ~192,755 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 8 file(s) not represented in the graph (top: (none) 4, .css 3, .xml 1)

## Summary
- 980 nodes · 2277 edges · 56 communities (48 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d4364e2e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Button
- dependencies
- package.json
- sidebar.tsx
- use-toast.ts
- cn
- react
- HandDetail.tsx
- firefox-extension/manifest.json
- server/index.ts
- pagination.tsx
- extension/manifest.json
- devDependencies
- System Architecture
- HandAnalysis
- command.tsx
- compilerOptions
- menubar.tsx
- audio/client.ts
- form.tsx
- components.json
- chat/storage.ts
- client/replit_integrations/audio/index.ts
- carousel.tsx
- Fehlerbehebung
- schema.ts
- chart.tsx
- RingBuffer
- range-presets.ts
- chat.ts
- sheet.tsx
- class-variance-authority
- extension/background.js
- image/client.ts
- drawer.tsx
- navigation-menu.tsx
- select.tsx
- firefox-extension/background.js
- batch/utils.ts
- extension/content.js
- extension/popup.js
- firefox-extension/content.js
- firefox-extension/popup.js
- input-otp.tsx
- queryClient.ts
- scripts
- accordion.tsx
- avatar.tsx
- i18n.ts
- overrides
- @radix-ui/react-aspect-ratio
- @radix-ui/react-collapsible
- drizzle-kit
- optionalDependencies
- tailwindcss

## God Nodes (most connected - your core abstractions)
1. `cn()` - 227 edges
2. `react` - 65 edges
3. `Button` - 58 edges
4. `Card` - 51 edges
5. `CardContent` - 49 edges
6. `lucide-react` - 46 edges
7. `Footer()` - 39 edges
8. `Badge()` - 39 edges
9. `CardHeader` - 37 edges
10. `CardTitle` - 37 edges

## Surprising Connections (you probably didn't know these)
- `HistoryListProps` --references--> `HandAnalysis`  [EXTRACTED]
  client/src/components/HistoryList.tsx → shared/schema.ts
- `AnalysisResultProps` --references--> `PokerAnalysis`  [EXTRACTED]
  client/src/components/AnalysisResult.tsx → shared/schema.ts
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/alert-dialog.tsx → client/src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/alert-dialog.tsx → client/src/lib/utils.ts
- `AlertDialogTitle` --calls--> `cn()`  [EXTRACTED]
  client/src/components/ui/alert-dialog.tsx → client/src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (56 total, 8 thin omitted)

### Community 0 - "Button"
Cohesion: 0.09
Nodes (83): AnalysisResult(), AnalysisResultProps, recommendationStyles, CookieConsent(), Footer(), Header(), navItems, HistoryList() (+75 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, archiver, class-variance-authority, clsx, cmdk, connect-pg-simple, date-fns, drizzle-orm (+66 more)

### Community 2 - "package.json"
Cohesion: 0.05
Nodes (41): license, name, type, version, autoprefixer, bufferutil, connect-pg-simple, date-fns (+33 more)

### Community 3 - "sidebar.tsx"
Cohesion: 0.07
Nodes (31): Input, Separator, SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarGroupAction() (+23 more)

### Community 4 - "use-toast.ts"
Cohesion: 0.08
Nodes (32): App(), Router(), Theme, ThemeContext, ThemeContextType, ThemeProvider(), Toast, ToastAction (+24 more)

### Community 5 - "cn"
Cohesion: 0.09
Nodes (34): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator(), CardDescription (+26 more)

### Community 6 - "react"
Cohesion: 0.07
Nodes (24): Checkbox, HoverCardContent, PopoverContent, Progress, RadioGroup, RadioGroupItem, ScrollArea, ScrollBar (+16 more)

### Community 7 - "HandDetail.tsx"
Cohesion: 0.13
Nodes (22): Alert, AlertDescription, AlertTitle, alertVariants, Table, TableBody, TableCaption, TableCell (+14 more)

### Community 8 - "firefox-extension/manifest.json"
Cohesion: 0.07
Nodes (28): action, default_icon, default_popup, default_title, background, scripts, browser_specific_settings, gecko (+20 more)

### Community 9 - "server/index.ts"
Cohesion: 0.11
Nodes (14): esbuild, express, @replit/vite-plugin-runtime-error-modal, vite, @vitejs/plugin-react, allowlist, app, http (+6 more)

### Community 10 - "pagination.tsx"
Cohesion: 0.10
Nodes (22): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+14 more)

### Community 11 - "extension/manifest.json"
Cohesion: 0.08
Nodes (24): action, default_icon, default_popup, default_title, background, service_worker, description, suggested_key (+16 more)

### Community 12 - "devDependencies"
Cohesion: 0.08
Nodes (24): devDependencies, autoprefixer, drizzle-kit, esbuild, postcss, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner, @replit/vite-plugin-runtime-error-modal (+16 more)

### Community 13 - "System Architecture"
Cohesion: 0.10
Nodes (20): AI Services, Analysis Modes, Backend Architecture, Build and Development, Chrome Extension, Content System, Data Storage, Database (+12 more)

### Community 14 - "HandAnalysis"
Cohesion: 0.17
Nodes (7): HistoryListProps, IStorage, MemStorage, HandAnalysis, InsertHandAnalysis, InsertUser, User

### Community 15 - "command.tsx"
Cohesion: 0.13
Nodes (17): Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+9 more)

### Community 16 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowImportingTsExtensions, baseUrl, esModuleInterop, incremental, jsx, lib, module (+10 more)

### Community 17 - "menubar.tsx"
Cohesion: 0.11
Nodes (12): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+4 more)

### Community 18 - "audio/client.ts"
Cohesion: 0.24
Nodes (13): AudioFormat, convertToWav(), detectAudioFormat(), ensureCompatibleFormat(), openai, speechToText(), speechToTextStream(), textToSpeech() (+5 more)

### Community 19 - "form.tsx"
Cohesion: 0.18
Nodes (14): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+6 more)

### Community 20 - "components.json"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 21 - "chat/storage.ts"
Cohesion: 0.15
Nodes (5): drizzle-orm, openai, registerChatRoutes(), chatStorage, IChatStorage

### Community 22 - "client/replit_integrations/audio/index.ts"
Cohesion: 0.26
Nodes (9): createAudioPlaybackContext(), decodePCM16ToFloat32(), PlaybackState, SequenceBuffer, useAudioPlayback(), RecordingState, useVoiceRecorder(), StreamCallbacks (+1 more)

### Community 23 - "carousel.tsx"
Cohesion: 0.17
Nodes (14): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+6 more)

### Community 24 - "Fehlerbehebung"
Cohesion: 0.14
Nodes (13): Eigener API-Key (empfohlen), Features, Fehlerbehebung, Hotkey funktioniert nicht, Installation, "Nicht erreichbar" Fehler, Per Hotkey (empfohlen), Per Klick (+5 more)

### Community 25 - "schema.ts"
Cohesion: 0.19
Nodes (10): archiver, @google/genai, getGeminiClient(), registerRoutes(), storage, handAnalyses, insertHandAnalysisSchema, insertUserSchema (+2 more)

### Community 26 - "chart.tsx"
Cohesion: 0.24
Nodes (11): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(), ChartTooltipContent, getPayloadConfigFromPayload() (+3 more)

### Community 28 - "range-presets.ts"
Cohesion: 0.18
Nodes (7): RangeMatrixProps, ALL_HANDS, RangeCategory, RangePreset, rangePresets, RANKS, RANKS_DISPLAY

### Community 29 - "chat.ts"
Cohesion: 0.18
Nodes (10): drizzle-zod, zod, Conversation, conversations, InsertConversation, insertConversationSchema, InsertMessage, insertMessageSchema (+2 more)

### Community 30 - "sheet.tsx"
Cohesion: 0.31
Nodes (9): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants (+1 more)

### Community 31 - "class-variance-authority"
Cohesion: 0.29
Nodes (8): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants, class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group

### Community 32 - "extension/background.js"
Cohesion: 0.33
Nodes (7): captureAndAnalyze(), compressImage(), getSettings(), injectContentScriptIfNeeded(), logError(), sendToContentScript(), showNotification()

### Community 33 - "image/client.ts"
Cohesion: 0.33
Nodes (5): openai, editImages(), generateImageBuffer(), openai, registerImageRoutes()

### Community 34 - "drawer.tsx"
Cohesion: 0.25
Nodes (7): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle, vaul

### Community 35 - "navigation-menu.tsx"
Cohesion: 0.28
Nodes (8): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport, @radix-ui/react-navigation-menu

### Community 36 - "select.tsx"
Cohesion: 0.28
Nodes (8): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, @radix-ui/react-select

### Community 37 - "firefox-extension/background.js"
Cohesion: 0.39
Nodes (7): captureAndAnalyze(), compressImage(), getSettings(), injectContentScriptIfNeeded(), logError(), sendToContentScript(), showNotification()

### Community 38 - "batch/utils.ts"
Cohesion: 0.46
Nodes (6): p-limit, p-retry, BatchOptions, batchProcess(), batchProcessWithSSE(), isRateLimitError()

### Community 39 - "extension/content.js"
Cohesion: 0.38
Nodes (3): getOverlayStyles(), hideOverlay(), showOverlay()

### Community 40 - "extension/popup.js"
Cohesion: 0.33
Nodes (3): checkConnection(), style, updateConnectionStatus()

### Community 41 - "firefox-extension/content.js"
Cohesion: 0.38
Nodes (3): getOverlayStyles(), hideOverlay(), showOverlay()

### Community 42 - "firefox-extension/popup.js"
Cohesion: 0.33
Nodes (3): checkConnection(), style, updateConnectionStatus()

### Community 43 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot, input-otp

### Community 44 - "queryClient.ts"
Cohesion: 0.47
Nodes (5): apiRequest(), getQueryFn(), throwIfResNotOk(), UnauthorizedBehavior, @tanstack/react-query

### Community 45 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, check, db:push, dev, start

### Community 46 - "accordion.tsx"
Cohesion: 0.40
Nodes (4): AccordionContent, AccordionItem, AccordionTrigger, @radix-ui/react-accordion

### Community 47 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): Avatar, AvatarFallback, AvatarImage, @radix-ui/react-avatar

### Community 49 - "overrides"
Cohesion: 0.67
Nodes (3): @esbuild-kit/esm-loader, overrides, drizzle-kit

## Knowledge Gaps
- **35 isolated node(s):** `@hookform/resolvers`, `@jridgewell/trace-mapping`, `@types/archiver`, `connect-pg-simple`, `date-fns` (+30 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 386 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `Button`, `sidebar.tsx`, `use-toast.ts`, `react`, `HandDetail.tsx`, `pagination.tsx`, `command.tsx`, `menubar.tsx`, `form.tsx`, `carousel.tsx`, `chart.tsx`, `sheet.tsx`, `class-variance-authority`, `drawer.tsx`, `navigation-menu.tsx`, `select.tsx`, `input-otp.tsx`, `accordion.tsx`, `avatar.tsx`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **What connects `@hookform/resolvers`, `@jridgewell/trace-mapping`, `@types/archiver` to the rest of the system?**
  _35 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Button` be split into smaller, more focused modules?**
  _Cohesion score 0.09036385445821671 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `Button`, `package.json`, `sidebar.tsx`, `use-toast.ts`, `cn`, `HandDetail.tsx`, `pagination.tsx`, `command.tsx`, `menubar.tsx`, `form.tsx`, `client/replit_integrations/audio/index.ts`, `carousel.tsx`, `chart.tsx`, `sheet.tsx`, `class-variance-authority`, `drawer.tsx`, `navigation-menu.tsx`, `select.tsx`, `input-otp.tsx`, `accordion.tsx`, `avatar.tsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.047619047619047616 - nodes in this community are weakly interconnected._