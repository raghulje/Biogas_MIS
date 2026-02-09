# Quick Reference - Mobile Responsive Patterns

## 🎯 Patterns Used in Email Notifications Page

Use these patterns as a reference for making other pages mobile-responsive.

---

## 1. **Responsive Heights** (Critical Fix)

### ❌ **Don't Use Fixed Heights**
```typescript
// BAD - Doesn't adapt to screen size
<Paper sx={{ height: 400, overflow: 'auto' }}>
```

### ✅ **Use Responsive Heights**
```typescript
// GOOD - Adapts to viewport
<Paper sx={{ 
  maxHeight: { xs: '50vh', sm: '60vh', md: 400 }, 
  overflow: 'auto' 
}}>
```

**Why:** Fixed pixel heights cause scrolling issues on small screens. Viewport units (`vh`) adapt to screen size.

---

## 2. **Touch-Friendly Targets** (WCAG 2.1)

### ✅ **Minimum 48px Height on Mobile**
```typescript
// List Items
<ListItem sx={{ 
  minHeight: isPhone ? 56 : undefined,
  px: isPhone ? 2 : 1,
  py: isPhone ? 1.5 : undefined
}}>

// Buttons
<Button
  size={isPhone ? 'large' : 'medium'}
  sx={{ minHeight: isPhone ? 48 : undefined }}
>

// Checkboxes
<Checkbox size={isPhone ? 'medium' : 'small'} />
```

**Why:** WCAG 2.1 requires minimum 44x44px touch targets. We use 48px for comfort.

---

## 3. **Full-Width Buttons on Mobile**

### ✅ **Responsive Button Width**
```typescript
<Button
  fullWidth={isMobile}
  size={isPhone ? 'large' : 'medium'}
  sx={{
    py: { xs: 1.75, sm: 1.5 },
    minHeight: isPhone ? 48 : undefined,
    fontSize: { xs: '1rem', sm: '0.875rem' }
  }}
>
```

**Why:** Full-width buttons are easier to tap on mobile and feel more native.

---

## 4. **Tap Feedback Animations**

### ✅ **Scale Animation on Tap**
```typescript
<Button sx={{
  '&:active': isPhone ? {
    transform: 'scale(0.98)',
    boxShadow: 1
  } : undefined
}}>

<Card sx={{
  '&:active': isPhone ? {
    boxShadow: 1  // Reduce from 2 to 1
  } : undefined
}}>
```

**Why:** Provides visual feedback that the tap was registered, like native apps.

---

## 5. **Responsive Typography**

### ✅ **Larger Text on Mobile**
```typescript
// Headings
<Typography variant="h6" sx={{ 
  fontSize: { xs: '1.125rem', sm: '1.25rem' } 
}}>

// Body Text
<Typography variant="body2" sx={{ 
  fontSize: { xs: '0.9375rem', sm: '0.875rem' },
  lineHeight: 1.6
}}>

// Input Fields
<TextField sx={{
  '& .MuiOutlinedInput-root': {
    fontSize: { xs: '1rem', sm: '1rem' }
  },
  '& .MuiOutlinedInput-input': {
    padding: { xs: '16px 14px', sm: '16.5px 14px' }
  }
}}>
```

**Why:** Larger text is easier to read on small screens. 16px font prevents iOS auto-zoom.

---

## 6. **Rounded Corners on Mobile**

### ✅ **Modern Card Styling**
```typescript
<Card sx={{
  borderRadius: { xs: '16px', md: '4px' },
  boxShadow: isPhone ? 2 : 1
}}>

<Paper sx={{
  borderRadius: { xs: '12px', md: '4px' }
}}>
```

**Why:** Rounded corners feel more modern and native-app-like on mobile.

---

## 7. **Custom Scrollbars**

### ✅ **Themed, Thin Scrollbars**
```typescript
<Paper sx={{
  overflow: 'auto',
  '&::-webkit-scrollbar': { 
    width: { xs: 6, md: 8 } 
  },
  '&::-webkit-scrollbar-thumb': { 
    backgroundColor: 'rgba(40, 121, 182, 0.3)', 
    borderRadius: 4,
    '&:hover': {
      backgroundColor: 'rgba(40, 121, 182, 0.5)'
    }
  }
}}>
```

**Why:** Thinner scrollbars save space on mobile. Themed colors match the design.

---

## 8. **Responsive Spacing**

### ✅ **Adaptive Padding & Margins**
```typescript
<Box sx={{ 
  p: { xs: 2, sm: 3 },
  mt: { xs: 2.5, sm: 2 }
}}>

<CardContent sx={{ 
  px: { xs: 2, sm: 2 }, 
  py: { xs: 2, sm: 2 } 
}}>
```

**Why:** More padding on mobile creates breathing room for touch interaction.

---

## 9. **List Density**

### ✅ **Non-Dense Lists on Mobile**
```typescript
<List dense={!isPhone}>
  <ListItem sx={{
    minHeight: isPhone ? 56 : undefined,
    px: isPhone ? 2 : 1,
    py: isPhone ? 1.5 : undefined
  }}>
```

**Why:** Dense lists are too cramped on mobile. Non-dense provides better spacing.

---

## 10. **Active States for Touch**

### ✅ **Background Color on Tap**
```typescript
<ListItem sx={{
  '&:active': isPhone ? {
    backgroundColor: 'rgba(40, 121, 182, 0.08)'
  } : undefined
}}>
```

**Why:** Shows the user which item they're tapping, like native apps.

---

## 🎨 Complete Button Pattern

```typescript
<Button
  variant="contained"
  onClick={handleSave}
  fullWidth={isMobile}
  size={isPhone ? 'large' : 'medium'}
  sx={{
    textTransform: 'none',
    borderRadius: '12px',
    py: { xs: 1.75, sm: 1.5 },
    fontWeight: 600,
    minHeight: isPhone ? 48 : undefined,
    fontSize: { xs: '1rem', sm: '0.875rem' },
    boxShadow: isPhone ? 2 : 1,
    '&:active': isPhone ? {
      transform: 'scale(0.98)',
      boxShadow: 1
    } : undefined
  }}
>
  Save Changes
</Button>
```

---

## 🎨 Complete Card Pattern

```typescript
<Card sx={{
  mb: 3,
  borderRadius: { xs: '16px', md: '4px' },
  overflow: 'hidden',
  boxShadow: isPhone ? 2 : 1,
  '&:active': isPhone ? {
    boxShadow: 1
  } : undefined
}}>
  <CardHeader
    title="Card Title"
    subheader="Card subtitle"
    sx={{
      '& .MuiCardHeader-title': {
        fontSize: { xs: '1.125rem', sm: '1.25rem' },
        fontWeight: 600
      },
      '& .MuiCardHeader-subheader': {
        fontSize: { xs: '0.875rem', sm: '0.875rem' }
      },
      py: { xs: 2, sm: 2 },
      px: { xs: 2, sm: 2 }
    }}
  />
  <CardContent sx={{ px: { xs: 2, sm: 2 }, py: { xs: 2, sm: 2 } }}>
    {/* Content */}
  </CardContent>
</Card>
```

---

## 🎨 Complete TextField Pattern

```typescript
<TextField
  label="Field Label"
  fullWidth
  value={value}
  onChange={handleChange}
  sx={{
    mb: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      fontSize: { xs: '1rem', sm: '1rem' }
    },
    '& .MuiInputLabel-root': {
      fontSize: { xs: '1rem', sm: '1rem' }
    },
    '& .MuiOutlinedInput-input': {
      padding: { xs: '16px 14px', sm: '16.5px 14px' }
    }
  }}
/>
```

---

## 🎨 Complete List Pattern

```typescript
<Paper sx={{
  maxHeight: { xs: '50vh', sm: '60vh', md: 400 },
  overflow: 'auto',
  borderRadius: { xs: '12px', md: '4px' },
  '&::-webkit-scrollbar': { width: { xs: 6, md: 8 } },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(40, 121, 182, 0.3)',
    borderRadius: 4,
    '&:hover': { backgroundColor: 'rgba(40, 121, 182, 0.5)' }
  }
}}>
  <List dense={!isPhone}>
    {items.map(item => (
      <ListItem
        key={item.id}
        button
        onClick={() => handleClick(item)}
        sx={{
          minHeight: isPhone ? 56 : undefined,
          px: isPhone ? 2 : 1,
          py: isPhone ? 1.5 : undefined,
          '&:active': isPhone ? {
            backgroundColor: 'rgba(40, 121, 182, 0.08)'
          } : undefined
        }}
      >
        <ListItemIcon>
          <Checkbox
            checked={isChecked(item)}
            size={isPhone ? 'medium' : 'small'}
            sx={{
              color: '#2879b6',
              '&.Mui-checked': { color: '#2879b6' }
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={item.name}
          secondary={item.description}
          primaryTypographyProps={{
            sx: { fontSize: isPhone ? '1rem' : '0.875rem', fontWeight: 500 }
          }}
          secondaryTypographyProps={{
            sx: { fontSize: isPhone ? '0.875rem' : '0.75rem' }
          }}
        />
      </ListItem>
    ))}
  </List>
</Paper>
```

---

## 📏 Breakpoint Reference

```typescript
// Define breakpoints
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md')); // ≤960px
const isPhone = useMediaQuery('(max-width:768px)'); // ≤768px

// Usage
isMobile  → Tablets & Phones (≤960px)
isPhone   → Phones only (≤768px)
!isMobile → Desktop (>960px)
```

---

## 🎯 When to Use Each Breakpoint

| Use Case | Breakpoint | Reason |
|----------|-----------|--------|
| Full-width buttons | `isMobile` | Tablets benefit too |
| Large button size | `isPhone` | Only phones need larger |
| Rounded corners | `isPhone` | Mobile-specific aesthetic |
| Touch targets (48px) | `isPhone` | Phones have smallest screens |
| Custom scrollbars | Always | Better UX on all devices |
| Tap animations | `isPhone` | Desktop has hover instead |

---

## ⚠️ Common Mistakes to Avoid

### ❌ **Don't Mix Breakpoints Inconsistently**
```typescript
// BAD - Inconsistent
fullWidth={isPhone}  // Uses isPhone
size={isMobile ? 'large' : 'medium'}  // Uses isMobile
```

### ✅ **Be Consistent**
```typescript
// GOOD - Consistent
fullWidth={isMobile}
size={isPhone ? 'large' : 'medium'}
```

---

### ❌ **Don't Forget Desktop Preservation**
```typescript
// BAD - Changes desktop too
borderRadius: '16px'  // All devices get rounded corners
```

### ✅ **Use Responsive Values**
```typescript
// GOOD - Only mobile gets rounded corners
borderRadius: { xs: '16px', md: '4px' }
```

---

### ❌ **Don't Use Fixed Pixel Heights**
```typescript
// BAD - Doesn't adapt
height: 400
```

### ✅ **Use Responsive Heights**
```typescript
// GOOD - Adapts to screen
maxHeight: { xs: '50vh', sm: '60vh', md: 400 }
```

---

## 🚀 Quick Checklist

When making a page mobile-responsive:

- [ ] Replace fixed heights with `maxHeight` + viewport units
- [ ] Add `fullWidth={isMobile}` to all buttons
- [ ] Set `size={isPhone ? 'large' : 'medium'}` on buttons
- [ ] Add `minHeight: isPhone ? 48 : undefined` to buttons
- [ ] Add `minHeight: isPhone ? 56 : undefined` to list items
- [ ] Set `size={isPhone ? 'medium' : 'small'}` on checkboxes
- [ ] Add rounded corners: `borderRadius: { xs: '16px', md: '4px' }`
- [ ] Add tap animations: `'&:active': isPhone ? { transform: 'scale(0.98)' } : undefined`
- [ ] Increase font sizes: `fontSize: { xs: '1rem', sm: '0.875rem' }`
- [ ] Add custom scrollbars with theme colors
- [ ] Test on real devices (iPhone, Android, iPad)

---

## 📚 Resources

- **WCAG 2.1 Touch Targets**: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- **Material-UI Breakpoints**: https://mui.com/material-ui/customization/breakpoints/
- **iOS Design Guidelines**: https://developer.apple.com/design/human-interface-guidelines/
- **Android Material Design**: https://material.io/design

---

**Use these patterns to maintain consistency across all mobile-responsive pages!** 🎨
