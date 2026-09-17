# 1. App Proposal

Fill this in for your own idea. Write in full sentences
where it asks - a proposal only you can decode next month does not help
future-you either.

---

## App name

TindahanTrack

## What the app is for, in one sentence

An inventory dashboard that helps a neighborhood sari-sari store owner track retail prices, update stock levels, and automatically generate a reorder list when items fall below a certain threshold.

## Who is it for

- A small family-run retail store owner who wants to move away from messy paper notebooks.
- When they open the app, they are trying to either quickly update the remaining stock count after a busy shift, or check the "low-stock" alert list right before making a supplier run.

## Sections or routes this app needs

List every top-level screen. A single-page app (like the portfolio) has
**sections** on one route; a multi-screen app uses **routes**
([React Router](../m2-react/README.md)). Aim for **3 to 5** either way. For each,
one sentence on what it is for. If you go over 5, cut one.

| # | Section / route | What it is for |
| - | --- | --- |
| 1 | `/` (Dashboard) | The main hub showing an immediate "Low Stock Alert" list so the owner knows exactly what to buy today. |
| 2 | `/inventory` | A complete list of all store items with quick "+" and "-" buttons to adjust stock counts on the fly. |
| 3 | `/add-item` | A simple form to input a new product, its selling price, and its minimum stock threshold. |

> Test each one: if you removed it, could the user still do the main thing
> above? If yes, it may not be core - park it for later.

## State: what data does the app hold?

React apps are mostly about **state**. For your **most important screen**, name
the pieces of data it manages and where they live. (A deck is an array of
`{ id, question, answer }` objects; a filter is a string; a "selected card" is an
index.) You do not need final shapes yet - just name them.

| Data | Shape (rough) | Who owns it (which component) | Changes when... |
| --- | --- | --- | --- |
| `items` | `[{ id, name, category, price, current_stock, min_threshold }]` | `App` | User fetches the database, adds a new item, or clicks +/- to update stock. |
| `searchQuery` | `string` | `InventoryList` | User types in the search bar to find a specific product. |
| `isLoading` | `boolean` | `App` | The app is waiting for the Express API to return data. |
| `formError` | `string` | `AddItemForm` | The user tries to submit an incomplete product form. |

> This is your first pass at [state ownership](../react-theory/06-state-management.md):
> state lives in the lowest component that needs it, and is passed down as props.

## What each screen contains

For your **most important screen**, list the blocks of content it needs (a
heading, an input row, a list of cards, a footer...). These become the
**components** you break it into on the next worksheet.

- Screen: Dashboard (`/`)
  - Block 1: Header Navigation (App title, links to Inventory and Add Item)
  - Block 2: Summary Cards (Total items tracked, total items low on stock)
  - Block 3: Low-Stock Alert Panel (A highly visible list of items that have dropped below their minimum threshold)
  - Block 4: Quick-Action Footer (A button linking to the full Inventory list)

## Content you need to gather

What real text, data, and images do you need before you can build? (Sample deck
data, project descriptions, photos, a logo, an API if you use one.) List them now
so you are not stuck hunting for them mid-build.

- A realistic seed list of at least 15-20 common sari-sari store items (e.g., Piattos, canned sardines, 1.5L Coke, rice, shampoo sachets) with realistic prices to populate the database.
- A simple logo or icon for the TindahanTrack header.

## One risk

What is the one part of this app you are least sure how to build? (A specific
piece of state, a layout, a library you have not used.) Naming it now means you
can ask for help on it early, instead of the night before it is due.

Handling rapid stock updates. If the owner quickly clicks the "+" or "-" buttons multiple times in a row on the inventory screen, I need to make sure the React state and the PostgreSQL database stay perfectly in sync without the API requests overlapping or slowing down the UI.
