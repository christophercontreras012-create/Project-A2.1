const professionals = [
  {
    id: 1, initials: "CC", name: "Chris Custom Installations",
    service: "Drapery Installation", city: "Atlanta", rating: 5.0,
    price: 150, availability: "Available this week",
    badges: ["4+ Years", "Bilingual", "Luxury Work"],
    services: ["Drapery Installation", "Curtain Rod Installation", "Motorized Shades", "Blinds & Shutters"],
    about: "Sample profile for a professional installer serving Metro Atlanta.",
    reviews: [
      {stars: 5, text: "Professional, careful and excellent attention to detail.", name: "Sample review"},
      {stars: 5, text: "Our curtains looked great after the installation.", name: "Sample review"}
    ]
  },
  {id:2, initials:"PC", name:"Prestige Cleaning", service:"Cleaning", city:"Chamblee", rating:4.9, price:180, availability:"Available today", badges:["Estate Cleaning","Fast Response"], services:["Standard Cleaning","Deep Cleaning","Estate Cleaning"], about:"Sample luxury home and estate cleaning profile.", reviews:[{stars:5,text:"Very detailed and professional.",name:"Sample review"}]},
  {id:3, initials:"AP", name:"Atlanta Pro Wash", service:"Pressure Washing", city:"Atlanta", rating:4.8, price:125, availability:"Available this week", badges:["Residential","Commercial"], services:["Driveways","Homes","Patios"], about:"Sample exterior cleaning and pressure washing profile.", reviews:[{stars:5,text:"The driveway looked brand new.",name:"Sample review"}]},
  {id:4, initials:"MH", name:"Metro Handyman Co.", service:"Handyman", city:"Sandy Springs", rating:4.7, price:95, availability:"Available today", badges:["Same-Day","Insured"], services:["TV Mounting","Furniture Assembly","Minor Repairs"], about:"Sample handyman profile for small household projects.", reviews:[{stars:5,text:"Quick and dependable.",name:"Sample review"}]},
  {id:5, initials:"GL", name:"GreenLine Lawn Care", service:"Lawn Care", city:"Marietta", rating:4.8, price:65, availability:"Available this week", badges:["Recurring Service"], services:["Mowing","Edging","Yard Cleanup"], about:"Sample lawn care profile.", reviews:[{stars:5,text:"Reliable weekly service.",name:"Sample review"}]},
  {id:6, initials:"MD", name:"Midtown Mobile Detail", service:"Mobile Detailing", city:"Atlanta", rating:4.9, price:120, availability:"Available today", badges:["Mobile","Weekend Service"], services:["Interior Detail","Exterior Detail","Full Detail"], about:"Sample mobile detailing profile.", reviews:[{stars:5,text:"The car looked amazing.",name:"Sample review"}]},
  {id:7, initials:"LP", name:"Lens & Light Photography", service:"Photography", city:"Decatur", rating:5.0, price:250, availability:"Available this week", badges:["Events","Portraits"], services:["Portraits","Events","Business Photos"], about:"Sample photography profile.", reviews:[{stars:5,text:"Beautiful photos and great communication.",name:"Sample review"}]},
  {id:8, initials:"AM", name:"Atlanta Moving Help", service:"Moving Help", city:"Atlanta", rating:4.6, price:110, availability:"Available this week", badges:["Labor Only","Same-Day"], services:["Loading","Unloading","Furniture Moving"], about:"Sample moving labor profile.", reviews:[{stars:5,text:"Hardworking and careful.",name:"Sample review"}]},
  {id:9, initials:"JR", name:"Junk Rescue ATL", service:"Junk Removal", city:"Norcross", rating:4.8, price:140, availability:"Available today", badges:["Eco-Friendly"], services:["Furniture Removal","Garage Cleanup","Haul Away"], about:"Sample junk removal profile.", reviews:[{stars:5,text:"Fast and easy pickup.",name:"Sample review"}]},
  {id:10, initials:"PT", name:"Peachtree Pet Care", service:"Pet Sitting", city:"Brookhaven", rating:4.9, price:45, availability:"Available this week", badges:["Pet CPR","Daily Updates"], services:["Pet Sitting","Dog Walking","Drop-In Visits"], about:"Sample pet care profile.", reviews:[{stars:5,text:"Sent updates and took great care of our dog.",name:"Sample review"}]},
  {id:11, initials:"BT", name:"BlueTop Bartending", service:"Bartending", city:"Atlanta", rating:4.8, price:300, availability:"Available this week", badges:["Private Events"], services:["Weddings","Private Parties","Corporate Events"], about:"Sample event bartending profile.", reviews:[{stars:5,text:"Guests loved the service.",name:"Sample review"}]},
  {id:12, initials:"FA", name:"FixIt Appliance ATL", service:"Appliance Repair", city:"Roswell", rating:4.7, price:89, availability:"Available today", badges:["Diagnostics"], services:["Washer Repair","Dryer Repair","Dishwasher Repair"], about:"Sample appliance repair profile.", reviews:[{stars:5,text:"Diagnosed the issue quickly.",name:"Sample review"}]}
];

const serviceSuggestions = [...new Set(professionals.flatMap(p => [p.service, ...p.services]))].sort();
let selectedProfessional = null;
let showOnlyFavorites = false;

function getFavorites() {
  try { return JSON.parse(localStorage.getItem("projectAFavorites") || "[]"); }
  catch { return []; }
}
function saveFavorites(ids) {
  localStorage.setItem("projectAFavorites", JSON.stringify(ids));
}
function isFavorite(id) {
  return getFavorites().includes(id);
}
function toggleFavorite(id) {
  const favorites = getFavorites();
  const next = favorites.includes(id) ? favorites.filter(x => x !== id) : [...favorites, id];
  saveFavorites(next);
  renderAll();
}

function proCard(p) {
  return `
    <article class="pro-card">
      <button class="favorite-button ${isFavorite(p.id) ? "active" : ""}" onclick="toggleFavorite(${p.id})" aria-label="Save favorite">♥</button>
      <div class="avatar">${p.initials}</div>
      <h3>${p.name}</h3>
      <p class="pro-service">${p.service}</p>
      <p class="rating">★★★★★ <span>${p.rating.toFixed(1)}</span></p>
      <p class="pro-location">📍 ${p.city}, Georgia</p>
      <span class="availability-badge">${p.availability}</span>
      <div class="trust-badges">${p.badges.map(x => `<span>✓ ${x}</span>`).join("")}</div>
      <div class="price-row"><span>Starting at</span><strong>$${p.price}</strong></div>
      <div class="card-actions">
        <button class="button ghost" onclick="openProfile(${p.id})">View profile</button>
        <button class="button primary" onclick="openQuote(${p.id})">Request quote</button>
      </div>
    </article>`;
}

function renderFeatured() {
  const el = document.getElementById("featuredProfessionals");
  if (el) el.innerHTML = professionals.slice(0, 3).map(proCard).join("");
}

function populateFilters() {
  const serviceFilter = document.getElementById("serviceFilter");
  const cityFilter = document.getElementById("cityFilter");
  if (!serviceFilter || !cityFilter) return;

  [...new Set(professionals.map(p => p.service))].sort().forEach(service => {
    serviceFilter.insertAdjacentHTML("beforeend", `<option>${service}</option>`);
  });
  [...new Set(professionals.map(p => p.city))].sort().forEach(city => {
    cityFilter.insertAdjacentHTML("beforeend", `<option>${city}</option>`);
  });
}

function filteredProfessionals() {
  const search = (document.getElementById("directorySearch")?.value || "").toLowerCase();
  const service = document.getElementById("serviceFilter")?.value || "";
  const city = document.getElementById("cityFilter")?.value || "";
  const rating = Number(document.getElementById("ratingFilter")?.value || 0);
  const availability = document.getElementById("availabilityFilter")?.value || "";
  const favorites = getFavorites();

  return professionals.filter(p => {
    const haystack = [p.name, p.service, p.city, ...p.services].join(" ").toLowerCase();
    return (!search || haystack.includes(search))
      && (!service || p.service === service)
      && (!city || p.city === city)
      && p.rating >= rating
      && (!availability || p.availability === availability)
      && (!showOnlyFavorites || favorites.includes(p.id));
  });
}

function renderDirectory() {
  const grid = document.getElementById("directoryGrid");
  if (!grid) return;
  const list = filteredProfessionals();
  grid.innerHTML = list.length ? list.map(proCard).join("") : `<div class="empty-state">No professionals match those filters.</div>`;
  const count = document.getElementById("resultsCount");
  if (count) count.textContent = `${list.length} sample professional${list.length === 1 ? "" : "s"}`;
}

function renderAll() {
  renderFeatured();
  renderDirectory();
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}
function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
function openJoinModal(){ openModal("joinModal"); }

function openProfile(id) {
  if (id === 1 && !window.location.pathname.endsWith("chris-profile.html")) { window.location.href = "chris-profile.html"; return; }
  const p = professionals.find(x => x.id === id);
  if (!p) return;
  selectedProfessional = p;
  const content = document.getElementById("profileModalContent");
  content.innerHTML = `
    <div class="profile-detail-header">
      <div class="avatar">${p.initials}</div>
      <div>
        <h2>${p.name}</h2>
        <p class="muted">${p.service}</p>
        <p class="rating">★★★★★ <span>${p.rating.toFixed(1)} · Sample profile</span></p>
        <p>📍 ${p.city}, Georgia</p>
      </div>
    </div>
    <div class="profile-detail-grid">
      <div>
        <section class="detail-card">
          <h3>About</h3><p>${p.about}</p>
        </section>
        <section class="detail-card" style="margin-top:16px">
          <h3>Services</h3>
          <div class="trust-badges">${p.services.map(s => `<span>${s}</span>`).join("")}</div>
        </section>
        <section class="detail-card" style="margin-top:16px">
          <h3>Sample reviews</h3>
          ${p.reviews.map(r => `<div class="review"><div class="rating">${"★".repeat(r.stars)}</div><p>${r.text}</p><small class="muted">— ${r.name}</small></div>`).join("")}
        </section>
      </div>
      <div>
        <section class="detail-card">
          <h3>Quick facts</h3>
          <p>Starting price: <strong>$${p.price}</strong></p>
          <p>Availability: <strong>${p.availability}</strong></p>
          <div class="trust-badges">${p.badges.map(b => `<span>✓ ${b}</span>`).join("")}</div>
        </section>
        <section class="detail-card" style="margin-top:16px">
          <h3>Service area</h3>
          <div class="map-box">📍 ${p.city}, Georgia<br><small>Map integration comes later</small></div>
        </section>
        <div class="card-actions">
          <button class="button primary" onclick="openQuote(${p.id})">Request quote</button>
          <button class="button secondary" onclick="openMessage(${p.id})">Message</button>
        </div>
      </div>
    </div>`;
  openModal("profileModal");
}

function openQuote(id) {
  const p = professionals.find(x => x.id === id);
  if (!p) return;
  selectedProfessional = p;
  const name = document.getElementById("quoteProfessionalName");
  const select = document.getElementById("quoteService");
  const form = document.getElementById("quoteForm");
  const success = document.getElementById("quoteSuccess");
  if (name) name.textContent = `For ${p.name}`;
  if (select) select.innerHTML = `<option value="">Choose a service</option>${p.services.map(s => `<option>${s}</option>`).join("")}`;
  if (form) form.style.display = "grid";
  if (success) success.classList.remove("show");
  openModal("quoteModal");
}

function openMessage(id) {
  const p = professionals.find(x => x.id === id);
  if (!p) return;
  const name = document.getElementById("messageProfessionalName");
  if (name) name.textContent = `To ${p.name}`;
  openModal("messageModal");
}

function setupForms() {
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) quoteForm.addEventListener("submit", e => {
    e.preventDefault();
    quoteForm.style.display = "none";
    document.getElementById("quoteSuccess")?.classList.add("show");
    quoteForm.reset();
  });

  const messageForm = document.getElementById("messageForm");
  if (messageForm) messageForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Demo message created. A backend is required to deliver it.");
    messageForm.reset();
    closeModal("messageModal");
  });

  const joinForm = document.getElementById("joinForm");
  if (joinForm) joinForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Sample signup preview created. Real accounts require a backend.");
    joinForm.reset();
    closeModal("joinModal");
  });
}

function setupHomeSearch() {
  const form = document.getElementById("homeSearch");
  const input = document.getElementById("homeSearchInput");
  const suggestions = document.getElementById("homeSuggestions");
  if (!form || !input || !suggestions) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const matches = q ? serviceSuggestions.filter(s => s.toLowerCase().includes(q)).slice(0, 6) : [];
    suggestions.innerHTML = matches.map(s => `<button type="button" data-value="${s}">${s}</button>`).join("");
    suggestions.classList.toggle("show", matches.length > 0);
  });

  suggestions.addEventListener("click", e => {
    const button = e.target.closest("button");
    if (!button) return;
    input.value = button.dataset.value;
    suggestions.classList.remove("show");
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const service = input.value.trim();
    const zip = document.getElementById("homeZipInput").value.trim();
    const params = new URLSearchParams();
    if (service) params.set("search", service);
    if (zip) params.set("zip", zip);
    window.location.href = `professionals.html?${params.toString()}`;
  });

  document.querySelectorAll("[data-service]").forEach(button => {
    button.addEventListener("click", () => {
      window.location.href = `professionals.html?search=${encodeURIComponent(button.dataset.service)}`;
    });
  });
}

function applyUrlSearch() {
  const search = document.getElementById("directorySearch");
  if (!search) return;
  const params = new URLSearchParams(window.location.search);
  search.value = params.get("search") || "";
}

function setupDirectoryControls() {
  const ids = ["directorySearch","serviceFilter","cityFilter","ratingFilter","availabilityFilter"];
  ids.forEach(id => document.getElementById(id)?.addEventListener("input", renderDirectory));
  document.getElementById("showFavorites")?.addEventListener("click", e => {
    showOnlyFavorites = !showOnlyFavorites;
    e.currentTarget.textContent = showOnlyFavorites ? "Showing favorites" : "Show favorites";
    renderDirectory();
  });
  document.getElementById("clearFilters")?.addEventListener("click", () => {
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = id === "ratingFilter" ? "0" : "";
    });
    showOnlyFavorites = false;
    const favoriteButton = document.getElementById("showFavorites");
    if (favoriteButton) favoriteButton.textContent = "Show favorites";
    renderDirectory();
  });
}

window.addEventListener("click", e => {
  if (e.target.classList.contains("modal")) closeModal(e.target.id);
});
window.addEventListener("keydown", e => {
  if (e.key === "Escape") document.querySelectorAll(".modal.open").forEach(m => closeModal(m.id));
});

document.addEventListener("DOMContentLoaded", () => {
  populateFilters();
  applyUrlSearch();
  setupHomeSearch();
  setupDirectoryControls();
  setupForms();
  renderAll();
});

function demoSaved(item){
  alert(item + " saved in the demo. A backend is required to save it permanently.");
}
function openDashboardItem(title){
  const heading = document.getElementById("dashboardItemTitle");
  if(heading) heading.textContent = title;
  openModal("dashboardModal");
}
function updateBuilderPreview(){
  const name = document.getElementById("builderName")?.value || "Your Business";
  const service = document.getElementById("builderService")?.value || "Local Service";
  const city = document.getElementById("builderCity")?.value || "Atlanta";
  const about = document.getElementById("builderAbout")?.value || "";
  const price = document.getElementById("builderPrice")?.value || "0";
  const services = (document.getElementById("builderServices")?.value || "").split(",").map(x=>x.trim()).filter(Boolean);
  const preview = document.getElementById("builderPreview");
  if(!preview) return;
  const initials = name.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
  preview.innerHTML = `
    <div class="preview-profile">
      <div class="avatar">${initials}</div>
      <h2>${name}</h2>
      <p class="muted">${service}</p>
      <p class="rating">★★★★★ <span>New profile</span></p>
      <p>📍 ${city}, Georgia</p>
      <div class="trust-badges">${services.map(s=>`<span>${s}</span>`).join("")}</div>
      <p style="margin:16px 0;color:#cbd5e1">${about}</p>
      <div class="price-row"><span>Starting at</span><strong>$${price}</strong></div>
      <button class="button primary">Request quote</button>
    </div>`;
}
document.addEventListener("DOMContentLoaded", updateBuilderPreview);
function updateProfileFavorite(){const button=document.querySelector('.favorite-wide');if(button)button.textContent=isFavorite(1)?'♥ Saved Profile':'♡ Save Profile'}
function setupRevealAnimations(){const items=document.querySelectorAll('.reveal');if(!items.length)return;const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});items.forEach(item=>observer.observe(item))}
document.addEventListener('DOMContentLoaded',()=>{updateProfileFavorite();setupRevealAnimations()});
