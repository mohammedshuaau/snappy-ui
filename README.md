# 🎨 Snap Kit

A modern, fully-featured React component library built with TypeScript and Tailwind CSS.

[![npm version](https://img.shields.io/npm/v/@mohammedshuaau/snappy-ui.svg)](https://www.npmjs.com/package/@mohammedshuaau/snappy-ui)
[![License](https://img.shields.io/npm/l/@mohammedshuaau/snappy-ui.svg)](https://github.com/mohammedshuaau/snap-kit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Powered-06B6D4.svg)](https://tailwindcss.com/)

## ✨ Features

- 📦 70+ Production-Ready Components
- 🎯 TypeScript First Approach
- 🎨 Tailwind CSS Styling
- 🌙 Dark Mode Support
- ♿ Accessibility Built-in
- 📱 Responsive Design
- ⌨️ Keyboard Navigation
- 🔍 Screen Reader Support
- 🎭 Customizable Themes
- 📚 Comprehensive Documentation
- ✅ Unit Tests
- 🔧 Easy to Extend

## 📦 Installation

```bash
# Using npm
npm install @mohammedshuaau/snappy-ui

# Using yarn
yarn add @mohammedshuaau/snappy-ui

# Using pnpm
pnpm add @mohammedshuaau/snappy-ui
```

## 🚀 Quick Start

```jsx
import { Button, Input } from '@mohammedshuaau/snappy-ui';

function App() {
  return (
    <div>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Click me!</Button>
    </div>
  );
}
```

## 📚 Components

### Data Display
- 🪗 Accordion
- 👤 Avatar
- 🎴 Card
- 📝 List
- 📊 Progress
- 💀 Skeleton
- 📋 Table
- 🏷️ Tag
- ⏳ Timeline
- 🌳 Tree
- 📜 Typography

### Feedback
- ⚠️ Alert
- 🔰 Badge
- 💬 Dialog
- 🔄 LoadingOverlay
- 📨 Message
- 💭 Popover
- 🌀 Spinner
- 🍞 Toast
- 💡 Tooltip

### Layout
- 📐 AspectRatio
- 📦 Box
- 🏢 Container
- ➖ Divider
- 💪 Flex
- 🎯 Grid
- 🌌 Spacer
- 📚 Stack

### Media
- 🔊 Audio
- 🎨 Icon
- 🖼️ Image
- 🎥 Video

### Navigation
- 🍞 Breadcrumb
- 🔗 Link
- 📑 Menu
- 🧭 Navbar
- 📄 Pagination
- 📌 Sidebar
- 🪜 Stepper
- 📑 Tabs

### Form
- 🔘 Button
- ✅ Checkbox
- 🎨 ColorPicker
- 📅 DatePicker
- 📆 DateRangePicker
- ⏰ DateTimePicker
- 📁 FileUpload
- 📝 Form
- ⌨️ Input
- 🔢 NumberInput
- 🔑 PasswordInput
- ⭕ Radio
- 📝 RichTextEditor
- 📊 Select
- 🎚️ Slider
- 🔄 Switch
- 📝 Textarea
- ⏰ TimePicker

### Advanced
- 📅 Calendar
- 👨‍💻 CodeEditor
- ⌨️ CommandPalette
- 🎯 DragAndDrop
- ♾️ InfiniteScroll
- 📋 KanbanBoard
- 📝 Markdown
- ↔️ ResizablePanel
- 📜 VirtualList

### Charts
- 📊 BarChart
- 🌡️ Heatmap
- 📈 LineChart
- 🥧 PieChart
- 🎯 Gauge
- ⭕ ProgressCircle
- ✨ Sparkline
- 📊 StatCard

## 🎨 Customization

Snap Kit components can be customized using:

1. **Variant Props**: Built-in variants for different styles
2. **sx Prop**: Direct style overrides
3. **className**: Tailwind CSS classes
4. **Theme**: Global theme customization

```jsx
// Using variants
<Button variant="primary" size="lg" />

// Using sx prop
<Box sx={{ backgroundColor: '#f0f0f0', padding: '1rem' }} />

// Using className
<Card className="shadow-lg hover:shadow-xl" />
```

## 📖 Documentation

For detailed documentation and examples, check out our [Storybook](https://your-storybook-url.com).

Each component includes:
- Live examples
- Props API
- Usage guidelines
- Accessibility notes
- Custom styling examples

## 🛠️ Utils, Hooks & Context

### Utility Functions
- 📅 Date Utils (formatting, parsing, manipulation)

### Custom Hooks
- 🖱️ useClickOutside
- ⏱️ useDebounce
- 🔍 useFocus
- 📝 useForm
- 🖱️ useHover
- 🆔 useId
- ⌨️ useKeyboard
- 🤔 useMemoCompare
- 📜 useScroll
- 📱 useWindowSize

### Context
- 📐 BreakpointContext
- 📐 DirectionContext
- 📐 MediaQueryContext

## 🤝 Contributing

I want to make contributing to Snap Kit as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

Check out our [Contributing Guide](CONTRIBUTING.md) for more information.

## 📝 License

Snap Kit is [MIT licensed](./LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Tabler Icons](https://tabler-icons.io/)
- Date handling by [date-fns](https://date-fns.org/)
- Charts powered by [Recharts](https://recharts.org/)
- Toast powered by [React Toastify](https://www.npmjs.com/package/react-toastify)