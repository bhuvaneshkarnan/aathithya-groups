/* ==========================================================================
   AADITHIYA GROUP - Projects Carousel & Lightbox (js/slider.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('projectsTrack');
  const prevBtn = document.getElementById('projectPrevBtn');
  const nextBtn = document.getElementById('projectNextBtn');
  const activeCounter = document.getElementById('activeSlideNum');
  const projectCards = document.querySelectorAll('.project-card');
  const projectModal = document.getElementById('projectModal');
  const modalImg = document.getElementById('modalProjectImg');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalValue = document.getElementById('modalProjectValue');
  const modalClient = document.getElementById('modalProjectClient');
  const modalDesc = document.getElementById('modalProjectDesc');

  if (!track) return;

  const totalCards = projectCards.length;
  let currentIndex = 0;

  const updateSlider = (index) => {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > totalCards - 1) currentIndex = totalCards - 1;

    // Calculate translation percentage based on screen width
    const isMobile = window.innerWidth <= 640;
    const isTablet = window.innerWidth > 640 && window.innerWidth <= 1100;

    let itemsVisible = 4;
    if (isMobile) itemsVisible = 1;
    else if (isTablet) itemsVisible = 2;

    const maxShift = Math.max(0, totalCards - itemsVisible);
    const shiftIndex = Math.min(currentIndex, maxShift);

    const cardWidth = 100 / itemsVisible;
    track.style.transform = `translateX(-${shiftIndex * cardWidth}%)`;

    if (activeCounter) {
      activeCounter.innerText = String(currentIndex + 1).padStart(2, '0');
    }

    // Enable/disable buttons
    if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.35' : '1';
    if (nextBtn) nextBtn.style.opacity = currentIndex >= maxShift ? '0.35' : '1';
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        updateSlider(currentIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < totalCards - 1) {
        updateSlider(currentIndex + 1);
      }
    });
  }

  // Lightbox Modal Data Mapping
  const projectData = [
    {
      title: "Re-establishment of Sevugampatti Toll Plaza with ETC Equipment",
      category: "NHAI / Toll Infrastructure",
      client: "NH-183, Dindigul – Theni Section",
      value: "₹ 79 Lakhs",
      img: "assets/images/project-1-interchange.jpg",
      desc: "Full architectural layout and execution of multi-lane ETC FASTag toll infrastructure, civil foundations, structural canopy, toll booth installation, and high-speed tolling equipment commissioning."
    },
    {
      title: "EHT Line Utility Shifting Along NH-83 ROW",
      category: "Power Transmission / High Voltage",
      client: "NHAI PIU, Dindigul",
      value: "₹ 2,587 Lakhs",
      img: "assets/images/project-2-viaduct.jpg",
      desc: "Comprehensive engineering, route survey, land clearance, foundation pile works, tower erection, and conductor re-stringing for extra high tension electrical corridors along the highway right of way."
    },
    {
      title: "Embankment Bed & Earthworks, NH-716B Phase IV",
      category: "Highway Earthworks & Pavements",
      client: "South Tamil Nadu Corridor",
      value: "₹ 1,983 Lakhs",
      img: "assets/images/project-3-skyscraper.jpg",
      desc: "Mass earthwork excavation, subgrade stabilisation, Granular Sub-Base (GSB), Wet Mix Macadam (WMM), and Dense Bituminous Macadam (DBM) laying utilizing company-owned sensor paver finishers."
    },
    {
      title: "Crash Barriers, Signage & Blackspot Rectification",
      category: "Road Safety & Furniture",
      client: "NH-44, NH-209 & NH-38",
      value: "₹ 412 Lakhs",
      img: "assets/images/project-4-railway.jpg",
      desc: "Deployment of W-beam metal crash barriers, high-intensity prismatic cautionary and informative signage, thermoplastic reflective road marking, and structural hazard alleviation across key accident blackspots."
    }
  ];

  projectCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const data = projectData[idx];
      if (!data || !projectModal) return;

      if (modalImg) modalImg.src = data.img;
      if (modalTitle) modalTitle.innerText = data.title;
      if (modalCategory) modalCategory.innerText = data.category;
      if (modalValue) modalValue.innerText = data.value;
      if (modalClient) modalClient.innerText = data.client;
      if (modalDesc) modalDesc.innerText = data.desc;

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Window resize handler
  window.addEventListener('resize', () => {
    updateSlider(currentIndex);
  });

  updateSlider(0);
});
