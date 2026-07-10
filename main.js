/* ========================================================================
   MAIN.JS — Nyaboke Smartwear
   ------------------------------------------------------------------------
   Everything the site's JavaScript does, in one file, in this order:

     1. PRODUCTS   — loads the product list from content/products.json
                     (the file Decap CMS edits — see /admin)
     2. CART        — add/remove/quantity logic + Local Storage
     3. WHATSAPP    — builds and sends the order message
     4. APP         — renders the page and wires up all the buttons

   Look for the big banner comments below to jump to a section.
   ======================================================================== */

/* ========================================================================
   1. PRODUCTS
   ------------------------------------------------------------------------
   Products live in content/products.json, and you edit that file
   through a proper form UI at yoursite.com/admin — powered by Decap
   CMS. You shouldn't normally need to touch this section at all.

   See PRODUCT-ADMIN-SETUP.md in the project root for the one-time
   setup steps (GitHub + Netlify + Decap CMS).

   FALLBACK
   -------------------------------------------------------------------
   If content/products.json can't be loaded for any reason (a typo
   in the file, the site running somewhere that file doesn't exist),
   the site falls back to the small sample catalogue below so it
   never shows up empty. Leave this here as a safety net.
   ======================================================================== */

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "Maeve Pleated Midi Dress",
    price: 3200,
    image: "https://picsum.photos/seed/nyaboke-dress1/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-dress1/700/900",
      "https://picsum.photos/seed/nyaboke-dress1b/700/900",
      "https://picsum.photos/seed/nyaboke-dress1c/700/900",
    ],
    category: "Women",
    badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Teal", hex: "#3f6f64" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Sand", hex: "#c9b48c" },
    ],
  },
  {
    id: 2,
    name: "Amara Corset Sundress",
    price: 3450,
    image: "https://picsum.photos/seed/nyaboke-dress2/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-dress2/700/900",
      "https://picsum.photos/seed/nyaboke-dress2b/700/900",
      "https://picsum.photos/seed/nyaboke-dress2c/700/900",
    ],
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sky Blue", hex: "#7fa8c9" },
      { name: "White", hex: "#f5f3ee" },
    ],
  },
  {
    id: 3,
    name: "Eli Relaxed Stripe Shirt",
    price: 2100,
    image: "https://picsum.photos/seed/nyaboke-mens1/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-mens1/700/900",
      "https://picsum.photos/seed/nyaboke-mens1b/700/900",
      "https://picsum.photos/seed/nyaboke-mens1c/700/900",
    ],
    category: "Men",
    badge: "New",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black & White", hex: "#1a1a1a" },
      { name: "Navy", hex: "#2b3550" },
    ],
  },
  {
    id: 4,
    name: "Tailored Twill Trousers",
    price: 2800,
    image: "https://picsum.photos/seed/nyaboke-mens2/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-mens2/700/900",
      "https://picsum.photos/seed/nyaboke-mens2b/700/900",
      "https://picsum.photos/seed/nyaboke-mens2c/700/900",
    ],
    category: "Men",
    sizes: ["30", "32", "34", "36", "38"],
    colors: [
      { name: "Stone", hex: "#c9bfa8" },
      { name: "Charcoal", hex: "#3a3a3a" },
    ],
  },
  {
    id: 5,
    name: "Zawadi Linen Blazer",
    price: 5400,
    image: "https://picsum.photos/seed/nyaboke-blazer/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-blazer/700/900",
      "https://picsum.photos/seed/nyaboke-blazerb/700/900",
      "https://picsum.photos/seed/nyaboke-blazerc/700/900",
    ],
    category: "Women",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#d8c7a8" },
      { name: "Black", hex: "#1a1a1a" },
    ],
  },
  {
    id: 6,
    name: "Classic Black Hoodie",
    price: 2500,
    image: "https://picsum.photos/seed/nyaboke-hoodie/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-hoodie/700/900",
      "https://picsum.photos/seed/nyaboke-hoodieb/700/900",
      "https://picsum.photos/seed/nyaboke-hoodiec/700/900",
    ],
    category: "Unisex",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Grey", hex: "#8a8a8a" },
      { name: "Olive", hex: "#5b5f45" },
    ],
  },
  {
    id: 7,
    name: "Kito Denim Jacket",
    price: 3900,
    image: "https://picsum.photos/seed/nyaboke-denim/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-denim/700/900",
      "https://picsum.photos/seed/nyaboke-denimb/700/900",
      "https://picsum.photos/seed/nyaboke-denimc/700/900",
    ],
    category: "Unisex",
    badge: "Best Seller",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Denim Blue", hex: "#3f5a7a" },
      { name: "Black", hex: "#1a1a1a" },
    ],
  },
  {
    id: 8,
    name: "Nia Wrap Blouse",
    price: 2350,
    image: "https://picsum.photos/seed/nyaboke-blouse/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-blouse/700/900",
      "https://picsum.photos/seed/nyaboke-blouseb/700/900",
      "https://picsum.photos/seed/nyaboke-blousec/700/900",
    ],
    category: "Women",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Cream", hex: "#efe6d3" },
      { name: "Terracotta", hex: "#b3653f" },
    ],
  },
  {
    id: 9,
    name: "Oren Slim Fit Chinos",
    price: 2600,
    image: "https://picsum.photos/seed/nyaboke-chinos/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-chinos/700/900",
      "https://picsum.photos/seed/nyaboke-chinosb/700/900",
      "https://picsum.photos/seed/nyaboke-chinosc/700/900",
    ],
    category: "Men",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Khaki", hex: "#b8a97c" },
      { name: "Navy", hex: "#2b3550" },
      { name: "Black", hex: "#1a1a1a" },
    ],
  },
  {
    id: 10,
    name: "Amani Knit Sweater",
    price: 3100,
    image: "https://picsum.photos/seed/nyaboke-sweater/700/900",
    images: [
      "https://picsum.photos/seed/nyaboke-sweater/700/900",
      "https://picsum.photos/seed/nyaboke-sweaterb/700/900",
      "https://picsum.photos/seed/nyaboke-sweaterc/700/900",
    ],
    category: "Unisex",
    badge: "New",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Brass", hex: "#b3874c" },
      { name: "Cream", hex: "#efe6d3" },
    ],
  },
];

/**
 * The list the rest of the site actually reads from. Starts out as
 * the fallback list above, then gets replaced with whatever's in
 * content/products.json once loadProductsFromCMS() finishes below.
 */
let products = FALLBACK_PRODUCTS;

/**
 * Converts one entry from content/products.json (the shape Decap CMS
 * saves) into the flat product shape the rest of the site expects.
 * Returns null for entries missing the essentials (name or price),
 * so a half-filled draft in the CMS can't break the whole catalogue.
 */
function cmsEntryToProduct(entry, fallbackId) {
  if (!entry || !entry.name || !entry.price) return null;

  const images = Array.isArray(entry.images)
    ? entry.images.map((item) => item && item.image).filter(Boolean)
    : [];
  const image = images[0] || "https://picsum.photos/seed/nyaboke-placeholder/700/900";

  return {
    id: Number.isFinite(Number(entry.id)) ? Number(entry.id) : fallbackId,
    name: entry.name,
    price: Number(entry.price),
    image,
    images: images.length ? images : [image],
    category: entry.category || "Unisex",
    badge: entry.badge || undefined,
    description: entry.description || undefined,
    sizes: Array.isArray(entry.sizes) && entry.sizes.length ? entry.sizes : undefined,
    colors: Array.isArray(entry.colors) && entry.colors.length ? entry.colors : undefined,
  };
}

/**
 * Fetches content/products.json (the file Decap CMS edits) and
 * replaces the `products` list. Falls back to FALLBACK_PRODUCTS if
 * the file is missing or malformed — the site should never end up
 * with an empty catalogue just because of a bad save.
 */
async function loadProductsFromCMS() {
  try {
    // Cache-busting param so shoppers see edits immediately rather
    // than a stale cached copy of the file.
    const response = await fetch(`content/products.json?cachebust=${Date.now()}`);
    if (!response.ok) throw new Error(`products.json responded with ${response.status}`);

    const data = await response.json();
    const entries = Array.isArray(data.products) ? data.products : [];
    const parsed = entries
      .map((entry, i) => cmsEntryToProduct(entry, i + 1))
      .filter(Boolean);

    products = parsed.length ? parsed : FALLBACK_PRODUCTS;
  } catch (err) {
    console.warn("Nyaboke: couldn't load content/products.json, using the sample list instead.", err);
    products = FALLBACK_PRODUCTS;
  }
}
/* ========================================================================
   2. CART
   ======================================================================== */

/* ========================================================================
   CART.JS
   ------------------------------------------------------------------------
   Handles everything about the shopping cart: adding items, changing
   quantities, removing items, totals, and saving to Local Storage so
   the cart survives a page refresh. No server involved — it all lives
   in the customer's own browser.
   ======================================================================== */

const CART_STORAGE_KEY = "nyaboke_cart";

/**
 * Reads the cart from Local Storage. Returns [] if nothing is saved,
 * the data is corrupted, or it's not a valid array.
 *
 * Also sanitizes every item on the way out — this guards against
 * stale/legacy cart entries (e.g. saved by an older version of this
 * site, or corrupted by a browser extension) that might be missing a
 * field like "quantity", which would otherwise show up as the word
 * "undefined" in the cart and break the total. Any broken entry gets
 * repaired here and the cleaned-up cart is written straight back to
 * storage, so this is a one-time, automatic fix.
 */
function getCart() {
  const raw = localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return [];

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const sanitized = parsed
    .filter((item) => item && item.id !== undefined && item.id !== null)
    .map((item) => {
      const quantity = Number(item.quantity);
      return {
        cartKey:
          item.cartKey || `${item.id}__${item.size || "default"}__${item.color || "default"}`,
        id: item.id,
        name: item.name || "Item",
        price: Number(item.price) || 0,
        image: item.image || "",
        size: item.size || null,
        color: item.color || null,
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
      };
    });

  // Persist the cleaned-up version so this only has to run once
  const needsRewrite = JSON.stringify(sanitized) !== raw;
  if (needsRewrite) saveCart(sanitized);

  return sanitized;
}

/** Saves the cart array to Local Storage. */
function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Adds a product to the cart. If the exact same product + size + colour
 * combination is already in there, it just increases that line's
 * quantity — otherwise a new cart line is added.
 * @param {number} productId
 * @param {Object} options - { size, color, quantity }
 */
function addToCart(productId, options = {}) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const size = options.size || (product.sizes && product.sizes[0]) || null;
  const color = options.color || (product.colors && product.colors[0].name) || null;
  const qtyToAdd = options.quantity || 1;

  // A cart line is uniquely identified by product + size + colour,
  // so "Midi Dress, size M, Teal" and "Midi Dress, size L, Black"
  // sit as two separate rows instead of merging into one.
  const cartKey = `${productId}__${size}__${color}`;

  const cart = getCart();
  const existingItem = cart.find((item) => item.cartKey === cartKey);

  if (existingItem) {
    existingItem.quantity += qtyToAdd;
  } else {
    cart.push({
      cartKey,
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity: qtyToAdd,
    });
  }

  saveCart(cart);
  renderCart();
  showToast(`${product.name} added to cart`);
}

/** Increases or decreases a cart line's quantity. Removes it if it hits 0. */
function changeQuantity(cartKey, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.cartKey === cartKey);
  if (!item) return;

  item.quantity += delta;

  const updatedCart =
    item.quantity <= 0 ? cart.filter((i) => i.cartKey !== cartKey) : cart;

  saveCart(updatedCart);
  renderCart();
}

/** Removes a cart line entirely, regardless of quantity. */
function removeFromCart(cartKey) {
  const cart = getCart().filter((item) => item.cartKey !== cartKey);
  saveCart(cart);
  renderCart();
}

/** Total number of items in the cart (used for the header badge). */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

/** Grand total price of everything in the cart, in KSh. */
function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Rebuilds the cart drawer's HTML from the current cart state.
 * Called after every change so the UI always matches Local Storage.
 */
function renderCart() {
  const cart = getCart();
  const cartItemsEl = document.getElementById("cartItems");
  const cartEmptyEl = document.getElementById("cartEmpty");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEls = document.querySelectorAll(".cart-count");
  const checkoutBtn = document.getElementById("checkoutBtn");

  // Update the little badge on the cart icon
  const count = getCartCount();
  cartCountEls.forEach((el) => {
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });

  // Empty state
  if (cart.length === 0) {
    cartItemsEl.innerHTML = "";
    cartEmptyEl.style.display = "flex";
    checkoutBtn.disabled = true;
    cartTotalEl.textContent = "KSh 0";
    return;
  }

  cartEmptyEl.style.display = "none";
  checkoutBtn.disabled = false;

  // Build one row per cart item
  cartItemsEl.innerHTML = cart
    .map((item) => {
      const variantBits = [
        item.size ? `Size ${item.size}` : "",
        item.color ? item.color : "",
      ].filter(Boolean);
      const variantLine = variantBits.length
        ? `<p class="cart-item__variant">${variantBits.join(" · ")}</p>`
        : "";

      return `
      <li class="cart-item" data-key="${item.cartKey}">
        <img src="${item.image}" alt="${item.name}" class="cart-item__img" />
        <div class="cart-item__details">
          <p class="cart-item__name">${item.name}</p>
          ${variantLine}
          <p class="cart-item__price">KSh ${item.price.toLocaleString()}</p>
          <div class="cart-item__qty">
            <button class="qty-btn" data-action="decrease" data-key="${item.cartKey}" aria-label="Decrease quantity">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-key="${item.cartKey}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <button class="cart-item__remove" data-action="remove" data-key="${item.cartKey}" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6L18 18M6 18L18 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </li>`;
    })
    .join("");

  cartTotalEl.textContent = `KSh ${getCartTotal().toLocaleString()}`;
}
/* ========================================================================
   3. WHATSAPP
   ======================================================================== */

/* ========================================================================
   WHATSAPP.JS
   ------------------------------------------------------------------------
   Everything related to sending the order to WhatsApp lives here.

   TO CHANGE THE BUSINESS WHATSAPP NUMBER, EDIT ONLY THE LINE BELOW.
   Use the full international format with no "+", no spaces, no dashes.
   Example for Kenya: 2547XXXXXXXX
   ======================================================================== */
const WHATSAPP_NUMBER = "254700000000"; // <-- put the real store number here

/**
 * Builds the plain-text order message that gets sent to WhatsApp.
 * @param {Array} cartItems - items currently in the cart (with quantities)
 * @param {number} total - the cart's grand total in KSh
 * @param {Object} customer - { name, phone, location }
 * @returns {string} formatted message
 */
function buildWhatsAppMessage(cartItems, total, customer) {
  const lines = cartItems.map((item) => {
    const lineTotal = item.price * item.quantity;
    const variantBits = [
      item.size ? `Size ${item.size}` : "",
      item.color ? item.color : "",
    ].filter(Boolean);
    const variantText = variantBits.length ? ` (${variantBits.join(", ")})` : "";
    return `• ${item.name}${variantText} × ${item.quantity} — KSh ${lineTotal.toLocaleString()}`;
  });

  const message = [
    "Hello Nyaboke Smartwear!",
    "",
    "I would like to order:",
    "",
    ...lines,
    "",
    `Total: KSh ${total.toLocaleString()}`,
    "",
    `Customer Name: ${customer.name}`,
    `Phone Number: ${customer.phone}`,
    `Delivery Location: ${customer.location}`,
    "",
    "Please confirm my order. Thank you!",
  ].join("\n");

  return message;
}

/**
 * Opens WhatsApp (app on mobile, web on desktop) with the order
 * message pre-filled, ready for the customer to hit send.
 * @param {Array} cartItems
 * @param {number} total
 * @param {Object} customer
 */
function sendOrderToWhatsApp(cartItems, total, customer) {
  const message = buildWhatsAppMessage(cartItems, total, customer);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
/* ========================================================================
   4. APP
   ======================================================================== */

/* ========================================================================
   APP.JS
   ------------------------------------------------------------------------
   The glue that ties everything together: renders product cards from
   the PRODUCTS list above, wires up the filter tabs, nav, cart drawer,
   checkout form, toast messages, and scroll animations.

   This section relies on the PRODUCTS, CART and WHATSAPP sections
   above it in this same file, so it's kept last.
   ======================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
  await loadProductsFromCMS();
  initFeaturedGrid();
  initProductGrid();
  initFilters();
  initProductCardInteractions();
  initQuickView();
  initCart();
  initMobileNav();
  initScrollReveal();
  initCheckoutForm();
  renderCart();
});

/* ---------------------------------------------------------------------
   PRODUCT GRID
--------------------------------------------------------------------- */

/** Builds the HTML for a single product card. */
function createProductCard(product) {
  const badge = product.badge
    ? `<span class="product-card__badge">${product.badge}</span>`
    : "";

  return `
    <article class="product-card" data-category="${product.category}" data-id="${product.id}">
      <div class="product-card__frame">
        ${badge}
        <img src="${product.image}" alt="${product.name}" loading="lazy" class="product-card__img" />
        <button class="product-card__add" data-id="${product.id}" aria-label="Choose size and colour for ${product.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M9 12L11 14L15.5 9.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Select Options</span>
        </button>
        <!-- Signature "swing tag" price detail, echoing a real clothing tag -->
        <div class="product-card__tag">
          <span>KSh</span>
          <strong>${product.price.toLocaleString()}</strong>
        </div>
      </div>
      <div class="product-card__info">
        <h3 class="product-card__name">${product.name}</h3>
        <p class="product-card__category">${product.category}</p>
      </div>
    </article>`;
}

function initProductGrid() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  grid.innerHTML = products.map(createProductCard).join("");
}

/** Featured Collection: shows only products flagged with a "badge". */
function initFeaturedGrid() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;

  const featured = products.filter((p) => p.badge);
  grid.innerHTML = featured.map(createProductCard).join("");
}

/**
 * One delegated click listener on <body> opens Quick View whenever
 * someone taps a product photo or its "Select Options" button —
 * covers the Featured grid and the full Catalogue grid, and keeps
 * working after either grid re-renders.
 */
function initProductCardInteractions() {
  document.body.addEventListener("click", (e) => {
    const optionsBtn = e.target.closest(".product-card__add");
    if (optionsBtn) {
      openQuickView(Number(optionsBtn.dataset.id));
      return;
    }
    const frame = e.target.closest(".product-card__frame");
    if (frame) {
      const card = frame.closest(".product-card");
      if (card) openQuickView(Number(card.dataset.id));
    }
  });
}

/* ---------------------------------------------------------------------
   CATEGORY FILTERS
--------------------------------------------------------------------- */
function initFilters() {
  const filterBar = document.getElementById("filterBar");
  const grid = document.getElementById("productGrid");
  if (!filterBar || !grid) return;

  // Build filter tabs automatically from whatever categories exist
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  filterBar.innerHTML = categories
    .map(
      (cat, i) =>
        `<button class="filter-tab ${i === 0 ? "is-active" : ""}" data-filter="${cat}">${cat}</button>`
    )
    .join("");

  filterBar.addEventListener("click", (e) => {
    const tab = e.target.closest(".filter-tab");
    if (!tab) return;

    filterBar
      .querySelectorAll(".filter-tab")
      .forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");

    const filter = tab.dataset.filter;
    grid.querySelectorAll(".product-card").forEach((card) => {
      const show = filter === "All" || card.dataset.category === filter;
      card.style.display = show ? "" : "none";
    });
  });
}

/* ---------------------------------------------------------------------
   CART DRAWER (open/close + quantity buttons inside it)
--------------------------------------------------------------------- */
function initCart() {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  const openBtns = document.querySelectorAll(".js-open-cart");
  const closeBtn = document.getElementById("closeCart");
  const cartItemsEl = document.getElementById("cartItems");

  const open = () => {
    drawer.classList.add("is-open");
    overlay.classList.add("is-open");
    document.body.classList.add("no-scroll");
  };
  const close = () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  };

  openBtns.forEach((btn) => btn.addEventListener("click", open));
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", close);

  // Quantity +/- and remove buttons (event delegation, since rows
  // are re-rendered every time the cart changes)
  cartItemsEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]");
    if (!btn) return;
    const cartKey = btn.dataset.key;
    const action = btn.dataset.action;

    if (action === "increase") changeQuantity(cartKey, 1);
    if (action === "decrease") changeQuantity(cartKey, -1);
    if (action === "remove") removeFromCart(cartKey);
  });
}

/** Small bounce animation on the cart icon when an item is added. */
function pulseCartIcon() {
  document.querySelectorAll(".cart-icon-btn").forEach((btn) => {
    btn.classList.remove("pulse");
    // Force reflow so the animation can restart if triggered rapidly
    void btn.offsetWidth;
    btn.classList.add("pulse");
  });
}

/* ---------------------------------------------------------------------
   QUICK VIEW MODAL
   Opens when a shopper taps a product photo or its "Select Options"
   button. Lets them swipe through extra photos and pick a size and
   colour before the item goes into the cart.
--------------------------------------------------------------------- */
let qvState = {
  product: null,
  imageIndex: 0,
  size: null,
  color: null,
  quantity: 1,
};

function openQuickView(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  qvState = {
    product,
    imageIndex: 0,
    size: product.sizes ? product.sizes[0] : null,
    color: product.colors ? product.colors[0].name : null,
    quantity: 1,
  };

  renderQuickView();

  document.getElementById("qvOverlay").classList.add("is-open");
  document.getElementById("qvModal").classList.add("is-open");
  document.body.classList.add("no-scroll");
}

function closeQuickView() {
  document.getElementById("qvOverlay").classList.remove("is-open");
  document.getElementById("qvModal").classList.remove("is-open");
  document.body.classList.remove("no-scroll");
}

/** Redraws the whole Quick View panel from the current qvState. */
function renderQuickView() {
  const { product, size, color, quantity } = qvState;
  const images = product.images && product.images.length ? product.images : [product.image];

  // Gallery track + dots
  const track = document.getElementById("qvTrack");
  track.innerHTML = images
    .map((src) => `<img src="${src}" alt="${product.name}" class="qv-gallery__img" />`)
    .join("");

  const dots = document.getElementById("qvDots");
  dots.innerHTML = images
    .map((_, i) => `<button class="qv-dot ${i === 0 ? "is-active" : ""}" data-index="${i}" aria-label="Photo ${i + 1}"></button>`)
    .join("");

  // Reset scroll position to the first photo every time the modal opens
  track.scrollLeft = 0;

  // Text + price
  document.getElementById("qvName").textContent = product.name;
  document.getElementById("qvPrice").textContent = `KSh ${product.price.toLocaleString()}`;

  const descriptionEl = document.getElementById("qvDescription");
  if (product.description) {
    descriptionEl.textContent = product.description;
    descriptionEl.style.display = "";
  } else {
    descriptionEl.style.display = "none";
  }

  // Sizes
  const sizesEl = document.getElementById("qvSizes");
  if (product.sizes && product.sizes.length) {
    sizesEl.style.display = "";
    sizesEl.innerHTML = product.sizes
      .map(
        (s) =>
          `<button class="qv-chip ${s === size ? "is-active" : ""}" data-size="${s}">${s}</button>`
      )
      .join("");
  } else {
    sizesEl.style.display = "none";
  }

  // Colours
  const colorsEl = document.getElementById("qvColors");
  if (product.colors && product.colors.length) {
    colorsEl.style.display = "";
    colorsEl.innerHTML = product.colors
      .map(
        (c) =>
          `<button class="qv-swatch ${c.name === color ? "is-active" : ""}" data-color="${c.name}" style="background:${c.hex}" aria-label="${c.name}" title="${c.name}"></button>`
      )
      .join("");
  } else {
    colorsEl.style.display = "none";
  }

  document.getElementById("qvQty").textContent = quantity;
}

function initQuickView() {
  const overlay = document.getElementById("qvOverlay");
  const modal = document.getElementById("qvModal");
  const track = document.getElementById("qvTrack");
  if (!overlay || !modal || !track) return;

  document.getElementById("qvClose").addEventListener("click", closeQuickView);
  overlay.addEventListener("click", closeQuickView);

  // Size, colour, dot, and quantity clicks (all inside the modal, so
  // one delegated listener covers everything that gets re-rendered)
  modal.addEventListener("click", (e) => {
    const sizeBtn = e.target.closest(".qv-chip");
    if (sizeBtn) {
      qvState.size = sizeBtn.dataset.size;
      renderQuickView();
      return;
    }

    const swatchBtn = e.target.closest(".qv-swatch");
    if (swatchBtn) {
      qvState.color = swatchBtn.dataset.color;
      renderQuickView();
      return;
    }

    const dotBtn = e.target.closest(".qv-dot");
    if (dotBtn) {
      const index = Number(dotBtn.dataset.index);
      track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
      return;
    }

    const qtyBtn = e.target.closest("[data-qv-qty]");
    if (qtyBtn) {
      const delta = Number(qtyBtn.dataset.qvQty);
      qvState.quantity = Math.max(1, qvState.quantity + delta);
      document.getElementById("qvQty").textContent = qvState.quantity;
      return;
    }

    const prevBtn = e.target.closest(".qv-gallery__nav--prev");
    if (prevBtn) {
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
      return;
    }
    const nextBtn = e.target.closest(".qv-gallery__nav--next");
    if (nextBtn) {
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
      return;
    }
  });

  // Keep the dots in sync while the shopper swipes the gallery by hand
  let scrollTimer = null;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const activeIndex = Math.round(track.scrollLeft / track.clientWidth);
      document.querySelectorAll(".qv-dot").forEach((dot, i) => {
        dot.classList.toggle("is-active", i === activeIndex);
      });
    }, 80);
  });

  document.getElementById("qvAddBtn").addEventListener("click", () => {
    addToCart(qvState.product.id, {
      size: qvState.size,
      color: qvState.color,
      quantity: qvState.quantity,
    });
    pulseCartIcon();
    closeQuickView();
  });
}

/* ---------------------------------------------------------------------
   CHECKOUT FORM -> WHATSAPP
--------------------------------------------------------------------- */
function initCheckoutForm() {
  const form = document.getElementById("checkoutForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cart = getCart();
    if (cart.length === 0) return;

    const customer = {
      name: form.customerName.value.trim(),
      phone: form.customerPhone.value.trim(),
      location: form.customerLocation.value.trim(),
    };

    sendOrderToWhatsApp(cart, getCartTotal(), customer);
  });
}

/* ---------------------------------------------------------------------
   MOBILE NAV
--------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    menu.classList.toggle("is-open");
    toggle.classList.toggle("is-active");
  });

  // Close the menu after tapping a link (nice on mobile)
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
    })
  );
}

/* ---------------------------------------------------------------------
   SCROLL REVEAL
   Adds a class to elements as they enter the viewport. Lightweight —
   just IntersectionObserver, no animation library needed.
--------------------------------------------------------------------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------------
   TOAST NOTIFICATIONS
--------------------------------------------------------------------- */
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}
