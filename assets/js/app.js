const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const countryFilter = document.getElementById("countryFilter");
const statusFilter = document.getElementById("statusFilter");
const productModal = document.getElementById("productModal");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");

const baseCountryTabs = ["India", "UK", "USA", "EU", "Australia"];
let lastFocusedElement = null;

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function displayCopy(value) {
  return String(value ?? "")
    .replace(/\bsource-backed\b/gi, "evidence-backed")
    .replace(/\bsourced\b/gi, "verified")
    .replace(/\bsource rows\b/gi, "evidence rows")
    .replace(/\bsource row\b/gi, "evidence row")
    .replace(/\bsource data\b/gi, "verified data")
    .replace(/\bsource coverage\b/gi, "proof coverage")
    .replace(/\bsource-missing\b/gi, "evidence missing")
    .replace(/\bsource\b/gi, "evidence");
}

function formatStatus(status) {
  return displayCopy(String(status)
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase()));
}

// Parenthetical-aware comma-separated list splitter
function splitIngredients(raw) {
  if (!raw) return [];
  const results = [];
  let depth = 0;
  let current = "";
  for (let i = 0; i < raw.length; i++) {
    const char = raw[i];
    if (char === "(" || char === "[" || char === "{") depth++;
    if (char === ")" || char === "]" || char === "}") depth--;
    if (char === "," && depth === 0) {
      results.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  if (current.trim()) {
    results.push(current.trim());
  }
  return results.map(item => item.replace(/\.$/, "").trim()).filter(Boolean);
}

// Normalizer for fuzzy ingredient matching
function normalizeIngredient(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\b(refined|fractionated|hydrogenated|edible|vegetable|oil|powder|solids|extract|mix|active|concentrate|concentrated|contains|nature\s*identical|artificial|flavouring|substances|flavoring|flavours|flavors|lecithins|lecithin|soya|sunflower|rapeseed|palm|palmolein|ins|e[0-9]+|color|colour|preservative|preservatives|stabiliser|stabilizer|emulsifier|emulsifiers|raising\s*agent|raising\s*agents|leavening\s*agent|leavening\s*agents|g|ml|float|kg|mg|%)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findMatch(normalizedItem, normalizedList) {
  if (!normalizedItem) return true;
  return normalizedList.some(otherItem => {
    if (!otherItem) return false;
    return otherItem.includes(normalizedItem) || normalizedItem.includes(otherItem);
  });
}

function getHighlightedIngredientsHTML(rawA, rawB) {
  if (!rawA || !rawB) {
    return {
      htmlA: escapeHtml(rawA || "Evidence missing"),
      htmlB: escapeHtml(rawB || "Evidence missing")
    };
  }

  const listA = splitIngredients(rawA);
  const listB = splitIngredients(rawB);

  const normA = listA.map(normalizeIngredient);
  const normB = listB.map(normalizeIngredient);

  const processedA = listA.map((item, idx) => {
    const norm = normA[idx];
    if (!norm) return escapeHtml(item);
    const hasMatch = findMatch(norm, normB);
    if (!hasMatch && norm.length > 2) {
      return `<span class="diff-highlight india-only" title="Not found in other country label">${escapeHtml(item)}</span>`;
    }
    return escapeHtml(item);
  });

  const processedB = listB.map((item, idx) => {
    const norm = normB[idx];
    if (!norm) return escapeHtml(item);
    const hasMatch = findMatch(norm, normA);
    if (!hasMatch && norm.length > 2) {
      return `<span class="diff-highlight other-only" title="Not found in India label">${escapeHtml(item)}</span>`;
    }
    return escapeHtml(item);
  });

  return {
    htmlA: processedA.join(", ") + ".",
    htmlB: processedB.join(", ") + "."
  };
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function variantList(product) {
  return [product.variants.india, product.variants.other].filter(Boolean);
}

function hasSource(variant) {
  return Boolean(variant?.source?.url);
}

function sourceCount(product) {
  return variantList(product).filter(hasSource).length;
}

function sourceCoverageLabel(product) {
  const count = sourceCount(product);
  if (count === 2) return "2 proofs";
  if (count === 1) return "1 proof";
  return "Needs proof";
}

function getVariantByCountry(product, country) {
  return variantList(product).find(variant => variant.country === country);
}

function renderFilterOptions() {
  const categories = uniqueSorted(products.map(product => product.category));
  const countries = uniqueSorted(products.flatMap(product => product.compareCountries));

  categoryFilter.insertAdjacentHTML(
    "beforeend",
    categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")
  );

  countryFilter.insertAdjacentHTML(
    "beforeend",
    countries.map(country => `<option value="${escapeHtml(country)}">${escapeHtml(country)}</option>`).join("")
  );
}

function getFilteredProducts() {
  const search = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const country = countryFilter.value;
  const status = statusFilter.value;

  return products.filter(product => {
    const variantText = variantList(product)
      .map(variant => [variant.displayName, variant.ingredientsRaw, variant.note, variant.source?.name].join(" "))
      .join(" ");

    const haystack = [
      product.name,
      product.brand,
      product.category,
      product.status,
      product.matchQuality,
      product.sourceNote,
      product.compareCountries.join(" "),
      variantText
    ]
      .join(" ")
      .toLowerCase();

    return (
      (!search || haystack.includes(search)) &&
      (!category || product.category === category) &&
      (!country || product.compareCountries.includes(country)) &&
      (!status || product.status === status)
    );
  });
}

function countryPills(product) {
  return product.compareCountries
    .map(country => `<span class="country-pill">${escapeHtml(country)}</span>`)
    .join("");
}

function renderProducts() {
  const filtered = getFilteredProducts();

  if (!filtered.length) {
    productGrid.innerHTML = `
      <div class="empty-state">
        <h3>No products found</h3>
        <p>Try a different search, country, category, or status filter.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filtered
    .map(
      product => `
        <article class="product-card" style="--accent: ${escapeHtml(product.accent)}">
          <div class="product-image-frame">
            <img
              src="${escapeHtml(product.image)}"
              alt="${escapeHtml(product.imageAlt)}"
              loading="lazy"
              onerror="this.src='assets/images/placeholder-product.svg'"
            />
          </div>

          <div class="card-body">
            <div class="card-badges">
              <span class="status-badge ${escapeHtml(product.status)}">${formatStatus(product.status)}</span>
              <span class="source-badge">${sourceCoverageLabel(product)}</span>
            </div>
            <h3>${escapeHtml(product.name)}</h3>
            <div class="card-topline">${escapeHtml(product.brand)} / ${escapeHtml(product.category)}</div>
            <div class="country-line" aria-label="Countries compared">${countryPills(product)}</div>
          </div>

          <p class="product-summary">${escapeHtml(displayCopy(product.shortSummary))}</p>

          <a class="compare-button" href="#${escapeHtml(product.id)}" data-product-id="${escapeHtml(product.id)}">
            View Comparison
          </a>
        </article>
      `
    )
    .join("");
}

function getCountryTabs(product) {
  return product.compareCountries;
}

function countryTabMarkup(product) {
  const primaryCountry = product.compareCountries[0];
  return getCountryTabs(product)
    .map(country => {
      const active = country === primaryCountry ? "active" : "";
      return `
        <button class="country-tab ${active}" type="button" data-country="${escapeHtml(country)}">
          ${escapeHtml(country)}
        </button>
      `;
    })
    .join("");
}

function renderCountryPanel(product, country) {
  const variant = getVariantByCountry(product, country);

  if (!variant) {
    return `<div class="pending-alert">${escapeHtml(country)} is not part of this comparison target.</div>`;
  }

  const sourceMarkup = hasSource(variant) ? escapeHtml(variant.source.name) : "Evidence missing";

  return `
    <div class="country-panel">
      <div>
        <span>Variant</span>
        <strong>${escapeHtml(variant.displayName || "Not verified yet")}</strong>
      </div>
      <div>
        <span>Barcode</span>
        <strong>${escapeHtml(variant.barcode || "Not available")}</strong>
      </div>
      <div>
        <span>Evidence</span>
        <strong>${sourceMarkup}</strong>
      </div>
      <div>
        <span>Confidence</span>
        <strong>${formatStatus(variant.confidence)}</strong>
      </div>
      ${variant.note ? `<p>${escapeHtml(displayCopy(variant.note))}</p>` : ""}
      ${variant.unitNote ? `<p>${escapeHtml(displayCopy(variant.unitNote))}</p>` : ""}
    </div>
  `;
}

function proofChecklist(product) {
  return `
    <ul class="proof-checklist">
      ${variantList(product)
        .map(variant => {
          const status = hasSource(variant) ? "Evidence attached" : "Needs exact label proof";
          return `<li>${escapeHtml(variant.country)}: ${escapeHtml(status)}</li>`;
        })
        .join("")}
      <li>Best next proof: clear front pack, ingredients label, nutrition label, barcode, country, and capture date.</li>
      <li>Use the same flavour, pack type, and current market version before publishing final claims.</li>
    </ul>
  `;
}

function renderIngredientSection(product) {
  const [india, other] = variantList(product);
  const diff = getHighlightedIngredientsHTML(india.ingredientsRaw, other.ingredientsRaw);

  return `
    <table class="data-table ingredient-table">
      <thead>
        <tr>
          <th>Field</th>
          <th>${escapeHtml(india.country)}</th>
          <th>${escapeHtml(other.country)}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Variant</td>
          <td>${escapeHtml(india.displayName || "Not verified")}</td>
          <td>${escapeHtml(other.displayName || "Not verified")}</td>
        </tr>
        <tr>
          <td>Ingredients</td>
          <td>
            <div class="ingredient-copy">
              ${diff.htmlA}
            </div>
          </td>
          <td>
            <div class="ingredient-copy">
              ${diff.htmlB}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="diff-legend">
      <div class="legend-item">
        <span class="legend-color india"></span>
        <span>Unique to ${escapeHtml(india.country)} formulation</span>
      </div>
      <div class="legend-item">
        <span class="legend-color other"></span>
        <span>Unique to ${escapeHtml(other.country)} formulation</span>
      </div>
    </div>
  `;
}

function formatNumber(value, suffix = "") {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "Not available";
  const rounded = Math.round(Number(value) * 10) / 10;
  return `${rounded}${suffix}`;
}

function nutritionValue(variant, key, suffix) {
  return formatNumber(variant.nutritionPer100?.[key], suffix);
}

function renderNutritionSection(product) {
  const [india, other] = variantList(product);
  const rows = [
    ["Energy", "energyKcal", " kcal"],
    ["Sugar", "sugarG", " g"],
    ["Sodium", "sodiumMg", " mg"],
    ["Salt", "saltG", " g"],
    ["Saturated fat", "saturatedFatG", " g"],
    ["Total fat", "totalFatG", " g"],
    ["Carbohydrate", "carbsG", " g"],
    ["Protein", "proteinG", " g"],
    ["Fibre", "fibreG", " g"]
  ];

  const unitNotes = variantList(product)
    .filter(variant => variant.unitNote)
    .map(variant => `<p class="table-note"><strong>${escapeHtml(variant.country)}:</strong> ${escapeHtml(variant.unitNote)}</p>`)
    .join("");

  return `
    <table class="data-table">
      <thead>
        <tr>
          <th>Per 100 g / 100 ml</th>
          <th>${escapeHtml(india.country)}</th>
          <th>${escapeHtml(other.country)}</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            ([label, key, suffix]) => `
              <tr>
                <td>${escapeHtml(label)}</td>
                <td>${nutritionValue(india, key, suffix)}</td>
                <td>${nutritionValue(other, key, suffix)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
    ${unitNotes}
  `;
}

function comparisonHighlights(product) {
  const [india, other] = variantList(product);
  const highlights = [];
  const checks = [
    ["Sugar", "sugarG", "g"],
    ["Sodium", "sodiumMg", "mg"],
    ["Saturated fat", "saturatedFatG", "g"],
    ["Energy", "energyKcal", "kcal"]
  ];

  checks.forEach(([label, key, unit]) => {
    const left = india.nutritionPer100?.[key];
    const right = other.nutritionPer100?.[key];
    if (Number.isFinite(left) && Number.isFinite(right)) {
      highlights.push(`${label}: ${india.country} ${formatNumber(left, ` ${unit}`)}; ${other.country} ${formatNumber(right, ` ${unit}`)}.`);
    }
  });

  if (!highlights.length) {
    highlights.push("A complete numeric comparison needs evidence rows for both countries.");
  }

  highlights.push(displayCopy(product.matchQuality));
  return highlights;
}

function calculateNutritionDelta(valIndia, valOther, key) {
  if (valIndia === null || valOther === null || valIndia === undefined || valOther === undefined) {
    return null;
  }
  const diff = valIndia - valOther;
  if (valOther === 0) return { pct: 0, text: "0%" };
  const pct = Math.round((diff / valOther) * 100);
  let sign = pct > 0 ? "+" : "";
  
  const lowerIsBetter = ["sugarG", "sodiumMg", "saturatedFatG", "energyKcal"].includes(key);
  let status = "neutral";
  if (pct !== 0 && lowerIsBetter) {
    status = pct > 0 ? "warning" : "better";
  }
  
  return {
    pct: pct,
    text: `${sign}${pct}%`,
    status: status
  };
}

function renderNutritionGauges(product) {
  const [india, other] = variantList(product);
  const keyNutrients = [
    { label: "Sugar", key: "sugarG", ceiling: 50, unit: " g" },
    { label: "Sodium", key: "sodiumMg", ceiling: 1000, unit: " mg" },
    { label: "Saturated Fat", key: "saturatedFatG", ceiling: 20, unit: " g" },
    { label: "Energy", key: "energyKcal", ceiling: 600, unit: " kcal" }
  ];

  let html = `<div class="nutrition-gauges-grid">`;
  let activeGauges = 0;

  keyNutrients.forEach(({ label, key, ceiling, unit }) => {
    const valIndia = india.nutritionPer100?.[key];
    const valOther = other.nutritionPer100?.[key];

    if (valIndia !== null || valOther !== null) {
      activeGauges++;
      const delta = calculateNutritionDelta(valIndia, valOther, key);
      
      let deltaBadge = "";
      if (delta) {
        let badgeClass = delta.status;
        let prefix = delta.pct > 0 ? "Higher in India" : delta.pct < 0 ? "Lower in India" : "Equal";
        deltaBadge = `<span class="gauge-delta-badge ${badgeClass}">${prefix} (${delta.text})</span>`;
      }

      const pctIndia = valIndia ? Math.min(100, Math.max(0, (valIndia / ceiling) * 100)) : 0;
      const pctOther = valOther ? Math.min(100, Math.max(0, (valOther / ceiling) * 100)) : 0;

      const formattedIndia = valIndia !== null ? `${Math.round(valIndia * 10) / 10}${unit}` : "N/A";
      const formattedOther = valOther !== null ? `${Math.round(valOther * 10) / 10}${unit}` : "N/A";

      html += `
        <div class="gauge-card" style="--accent: ${escapeHtml(product.accent)}">
          <div class="gauge-header">
            <span class="gauge-title">${escapeHtml(label)}</span>
            ${deltaBadge}
          </div>
          <div class="gauge-bars">
            <div class="gauge-bar-row">
              <span class="gauge-bar-country">${escapeHtml(india.country)}</span>
              <div class="gauge-bar-track">
                <div class="gauge-bar-fill india" style="width: ${pctIndia}%"></div>
              </div>
              <span class="gauge-bar-val">${escapeHtml(formattedIndia)}</span>
            </div>
            <div class="gauge-bar-row">
              <span class="gauge-bar-country">${escapeHtml(other.country)}</span>
              <div class="gauge-bar-track">
                <div class="gauge-bar-fill other" style="width: ${pctOther}%"></div>
              </div>
              <span class="gauge-bar-val">${escapeHtml(formattedOther)}</span>
            </div>
          </div>
        </div>
      `;
    }
  });

  html += `</div>`;
  return activeGauges > 0 ? html : `<p class="missing-value">No numeric nutrition comparisons are available for these variants.</p>`;
}

function renderShareSection(product) {
  const shareUrl = `${window.location.origin}${window.location.pathname}#${product.id}`;

  return `
    <div class="share-section">
      <button class="share-btn share-copy" data-share-url="${escapeHtml(shareUrl)}" type="button">
        Copy Link
      </button>
      <span id="shareSuccess" style="display:none;" class="share-success-msg">Link copied!</span>
    </div>
  `;
}

function renderComparisonSummary(product) {
  return `
    <div class="comparison-summary">
      ${comparisonHighlights(product).map(item => `<span>${escapeHtml(item)}</span>`).join("")}
    </div>
  `;
}

function evidenceSummary(product) {
  return `
    <p>${escapeHtml(displayCopy(product.sourceNote))}</p>
    <div class="evidence-list">
      ${variantList(product)
        .map(
          variant => `
            <div>
              <span>${escapeHtml(variant.country)}</span>
              <strong>${hasSource(variant) ? escapeHtml(variant.source.name) : "Evidence missing"}</strong>
              ${
                variant.lastModified
                  ? `<small>Modified ${escapeHtml(variant.lastModified)}</small>`
                  : `<small>Reviewed ${escapeHtml(DATA_ACCESSED_DATE)}</small>`
              }
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function renderVerificationTable(product) {
  return `
    <table class="data-table">
      <tbody>
        <tr>
          <th>Status</th>
          <td>${formatStatus(product.status)}</td>
        </tr>
        <tr>
          <th>Evidence coverage</th>
          <td>${sourceCount(product)} of ${variantList(product).length} target countries</td>
        </tr>
        <tr>
          <th>Match quality</th>
          <td>${escapeHtml(displayCopy(product.matchQuality))}</td>
        </tr>
        <tr>
          <th>Reviewed date</th>
          <td>${escapeHtml(product.verifiedDate || DATA_ACCESSED_DATE)}</td>
        </tr>
      </tbody>
    </table>
  `;
}

function generateHealthObservations(product) {
  const [india, other] = variantList(product);
  const observations = [];

  const checkHighLow = (variant, isDrink) => {
    const alerts = [];
    const sugar = variant.nutritionPer100?.sugarG;
    const satFat = variant.nutritionPer100?.saturatedFatG;
    const sodium = variant.nutritionPer100?.sodiumMg;

    if (sugar !== null && sugar !== undefined) {
      const sugarLimit = isDrink ? 11.25 : 22.5;
      if (sugar > sugarLimit) {
        alerts.push(`High Sugar (${sugar}g/100${isDrink ? "ml" : "g"} exceeds WHO high-sugar benchmark of ${sugarLimit}g)`);
      }
    }
    if (satFat !== null && satFat !== undefined) {
      const satFatLimit = isDrink ? 2.5 : 5.0;
      if (satFat > satFatLimit) {
        alerts.push(`High Saturated Fat (${satFat}g/100${isDrink ? "ml" : "g"} exceeds high-fat benchmark of ${satFatLimit}g)`);
      }
    }
    if (sodium !== null && sodium !== undefined) {
      if (sodium > 600) {
        alerts.push(`High Sodium (${sodium}mg/100${isDrink ? "ml" : "g"} exceeds WHO caution limit of 600mg)`);
      }
    }
    return alerts;
  };

  const isDrink = product.category === "Soft Drink" || product.category === "Health Drink";

  const alertsIndia = checkHighLow(india, isDrink);
  const alertsOther = checkHighLow(other, isDrink);

  if (alertsIndia.length) {
    observations.push(`<strong>${escapeHtml(india.country)} Variant Warnings:</strong><ul>${alertsIndia.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`);
  }
  if (alertsOther.length) {
    observations.push(`<strong>${escapeHtml(other.country)} Variant Warnings:</strong><ul>${alertsOther.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`);
  }

  const rawA = india.ingredientsRaw?.toLowerCase() || "";
  const rawB = other.ingredientsRaw?.toLowerCase() || "";
  if (rawA.includes("palm") || rawA.includes("palmolein")) {
    if (!rawB.includes("palm") && !rawB.includes("palmolein") && (rawB.includes("sunflower") || rawB.includes("rapeseed") || rawB.includes("canola") || rawB.includes("soybean"))) {
      observations.push(`<strong>Oil Base Discrepancy:</strong> The ${escapeHtml(india.country)} formulation utilizes palm/palmolein oil, whereas the ${escapeHtml(other.country)} formulation utilizes unsaturated vegetable oils (sunflower, rapeseed, soybean, or canola). Palm oil has a higher saturated fat density (~50%) compared to liquid vegetable oils (~10-15%).`);
    }
  }

  if (!observations.length) {
    return `<p>Both variants fall within standard baseline nutritional thresholds without major warning flags.</p>`;
  }

  return observations.map(obs => `<div class="observation-block">${obs}</div>`).join("");
}

function generateModalContent(product) {
  const primaryCountry = product.compareCountries[0];

  return `
    <div class="modal-content" style="--accent: ${escapeHtml(product.accent)}">
      <div class="inspection-hero" style="--accent: ${escapeHtml(product.accent)}">
        <div class="modal-media-panel">
          <div class="magnifier-shell">
            <div class="magnifier-box" id="magnifierBox" aria-label="Product image magnifier">
              <img
                src="${escapeHtml(product.image)}"
                alt="${escapeHtml(product.imageAlt)}"
                id="magnifierImage"
                onerror="this.src='assets/images/placeholder-product.svg'"
              />
            </div>
            <button class="zoom-button" id="zoomButton" type="button" aria-pressed="false">Zoom</button>
          </div>
          <p class="source-note">Hover or tap the image to inspect the front-pack reference.</p>
        </div>

        <div class="modal-title-block">
          <div class="modal-kicker">
            <span class="status-badge ${escapeHtml(product.status)}">${formatStatus(product.status)}</span>
            <span class="source-badge">${sourceCoverageLabel(product)}</span>
            <span class="country-pill">${escapeHtml(product.compareCountries.join(" vs "))}</span>
          </div>
          <h2 id="modalTitle">${escapeHtml(product.name)}</h2>
          <p class="modal-intro">${escapeHtml(displayCopy(product.shortSummary))}</p>
          <div class="modal-meta">
            <span>${escapeHtml(product.brand)}</span>
            <span>${escapeHtml(product.category)}</span>
          </div>

          <div class="country-tabs" aria-label="Country tabs">
            ${countryTabMarkup(product)}
          </div>

          <div id="countryPanel">${renderCountryPanel(product, primaryCountry)}</div>
          ${renderShareSection(product)}
        </div>
      </div>

      <div class="inspection-grid">
        <section class="detail-panel wide-panel">
          <h3>Visual Nutrient Comparison</h3>
          ${renderNutritionGauges(product)}
        </section>

        <section class="detail-panel wide-panel">
          <h3>Comparison Snapshot</h3>
          ${renderComparisonSummary(product)}
        </section>

        <section class="detail-panel wide-panel">
          <h3>Ingredients</h3>
          ${renderIngredientSection(product)}
        </section>

        <section class="detail-panel wide-panel">
          <h3>Nutrition</h3>
          ${renderNutritionSection(product)}
        </section>

        <section class="detail-panel">
          <h3>Health Flags & Observations</h3>
          ${generateHealthObservations(product)}
        </section>

        <section class="detail-panel">
          <h3>Required Proof</h3>
          ${proofChecklist(product)}
        </section>

        <section class="detail-panel">
          <h3>Evidence</h3>
          ${evidenceSummary(product)}
        </section>

        <section class="detail-panel">
          <h3>Verification Status</h3>
          ${renderVerificationTable(product)}
        </section>

        <section class="detail-panel wide-panel disclaimer-panel">
          <h3>Disclaimer</h3>
          <p>
            Formulas and labels can change. These records are evidence-backed research notes, not medical advice or a
            final judgment about product.
          </p>
        </section>
      </div>
    </div>
  `;
}

function initCountryTabs(product) {
  const countryPanel = document.getElementById("countryPanel");
  const buttons = modalContent.querySelectorAll(".country-tab");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.disabled) return;

      buttons.forEach(item => item.classList.remove("active"));
      button.classList.add("active");
      countryPanel.innerHTML = renderCountryPanel(product, button.dataset.country);
    });
  });
}

function initMagnifier() {
  const box = document.getElementById("magnifierBox");
  const zoomButton = document.getElementById("zoomButton");
  let locked = false;

  if (!box || !zoomButton) return;

  function setZoomPosition(event) {
    const rect = box.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    box.style.setProperty("--zoom-x", `${Math.max(0, Math.min(100, x))}%`);
    box.style.setProperty("--zoom-y", `${Math.max(0, Math.min(100, y))}%`);
  }

  function setLocked(value) {
    locked = value;
    box.classList.toggle("is-zooming", locked);
    zoomButton.setAttribute("aria-pressed", String(locked));
    zoomButton.textContent = locked ? "Reset" : "Zoom";
  }

  box.addEventListener("mousemove", event => {
    setZoomPosition(event);
    box.classList.add("is-zooming");
  });

  box.addEventListener("mouseleave", () => {
    if (!locked) box.classList.remove("is-zooming");
  });

  box.addEventListener("click", event => {
    setZoomPosition(event);
    setLocked(!locked);
  });

  zoomButton.addEventListener("click", () => {
    setLocked(!locked);
  });
}

function openProductModal(productId) {
  const product = products.find(item => item.id === productId);

  if (!product) return;

  lastFocusedElement = document.activeElement;
  modalContent.innerHTML = generateModalContent(product);
  productModal.classList.add("open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalClose.focus();

  // Set URL hash route dynamically without page reload jumps
  if (window.location.hash !== `#${productId}`) {
    window.location.hash = productId;
  }

  initCountryTabs(product);
  initMagnifier();
}

function closeProductModal() {
  productModal.classList.remove("open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalContent.innerHTML = "";

  // Reset URL hash route without scroll jumps
  if (window.location.hash) {
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

productGrid.addEventListener("click", event => {
  const trigger = event.target.closest("[data-product-id]");
  if (!trigger) return;
  openProductModal(trigger.dataset.productId);
});

[searchInput, categoryFilter, countryFilter, statusFilter].forEach(control => {
  control.addEventListener("input", renderProducts);
  control.addEventListener("change", renderProducts);
});

modalClose.addEventListener("click", closeProductModal);

productModal.addEventListener("click", event => {
  if (event.target === productModal) {
    closeProductModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && productModal.classList.contains("open")) {
    closeProductModal();
  }
});

menuButton.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", event => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

// Clipboard share copy handler
productModal.addEventListener("click", event => {
  const copyBtn = event.target.closest(".share-copy");
  if (copyBtn) {
    const url = copyBtn.dataset.shareUrl;
    navigator.clipboard.writeText(url).then(() => {
      const successSpan = document.getElementById("shareSuccess");
      if (successSpan) {
        successSpan.style.display = "inline";
        setTimeout(() => {
          successSpan.style.display = "none";
        }, 2000);
      }
    }).catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
  }
});

// URL Hash routing state recovery
function handleHashRoute() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) {
    if (productModal.classList.contains("open")) {
      closeProductModal();
    }
    return;
  }
  const product = products.find(item => item.id === hash);
  if (product && !productModal.classList.contains("open")) {
    openProductModal(product.id);
  }
}

window.addEventListener("hashchange", handleHashRoute);
window.addEventListener("DOMContentLoaded", handleHashRoute);

renderFilterOptions();
renderProducts();
